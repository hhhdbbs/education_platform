<template>
  <div class="allClass">
    <el-container direction="horizontal">
      <el-main>
        <h3>{{ subject }}课程</h3>
        <div
          v-for="(item, index) in course_list"
          :key="index"
          style="margin-bottom: 30px;"
        >
          <class-card-sp :class-card="item" style="margin:50px 0;height:200px"></class-card-sp>
        </div>

      </el-main>
      <el-aside>
        <h3>所有学科</h3>
        <div
          v-for="(item, index) in classCategory"
          :key="index"
          @click="getSearchResult('', item.id)"
          style="line-height: 30px;"
        >
          <el-button type="text" style="font-size: large; color: black;">{{
            item.name
          }}</el-button>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "allClass",
  data() {
    return {
      course_list: [
        {
          classDate: "2019-07-03",
          className: "语文",
          teacherName: "李廷",
          class_img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          classIntro: "名师开设语文课！",
          stuNum: 20,
          courseId: "1",
          like_num: 60
        },
        {
          classDate: "2019-07-02",
          className: "数学",
          teacherName: "李廷",
          class_img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          classIntro: "名师开设数学课！",
          stuNum: 50,
          courseId: "1",
          like_num: 6
        }
      ],
      classCategory: [
        {
          name: "语文",
          id: 1
        },
        { name: "数学", id: 2 },
        {
          name: "英语",
          id: 3
        },
        {
          name: "美术",
          id: 4
        }
      ],
      subject: "所有",
      list: [
        {
          courseId: 1,
          class_img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },
        {
          courseId: 2,
          class_img: ""
        },
        {
          courseId: 3,
          class_img: ""
        },
        {
          courseId: 4,
          class_img: ""
        }
      ],
      keywords: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getSubjects();
      this.keywords = this.$route.query.keywords;
      this.getSearchResult(this.keywords,0);
    },
    getSearchResult(keywords, sub) {
      if(item==null)
      this.$axios.post("/course/searchCourseList",{subject_id: sub, key_words: keywords,user_id:0
      },
      {headers: {'Authorization':localStorage.token}}
      )
        .then(res => {
          console.log(res);
          if (res.data.code === 200) {
            //this.course_list = res.data
            this.course_list = []
            let j = 0;
            for (let i in res.data.data.courses) {
              var data=res.data.data.courses[i]
              this.course_list[j].courseId = data.id;
              this.course_list[j].className = data.name;
              this.course_list[j].classIntro = data.intro;
              this.course_list[j].class_img = data.class_img;
              this.course_list[j].teacherName = data.author_id;
              this.course_list[j].like_num = data.who_like_ids.length;
              this.course_list[j].stuNum = data.who_join_ids.length;
              j++;
            }
          } else {
            this.$message({
              message: "网络错误，请稍后刷新页面",
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({ message: e, type: "error" });
        });
    },
    getSubjects() {
      var that = this;
      this.$axios({
        url: "/subject/getAllSubjectList",
        method: 'POST',
        headers: {'Authorization':localStorage.token},
        }).then(res => {
        if (res.data.code === 200) {
          this.classCategory = res.data.data.subject;
        }
      });
    }
  },
  watch: {
    // 用来每次重新输入关键词都可以重新查询
    $route: {
      handler(route) {
        const that = this;
        if (route.name === "allClass") {
          console.log(that.$route.query.keywords);
          this.init();
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.el-aside {
  background-color: white;
  color: #333333;
  border: 1px solid #c0c8be;
  border-radius: 14px;
  text-align: center;
  line-height: 50px;
  margin-right: 100px;
  margin-left: 40px;
  margin-top: 40px;
  padding: 0;
}

.el-main {
  background-color: white;
  color: #333;
  border: 1px solid #c0c8be;
  border-radius: 14px;
  text-align: center;
  line-height: 50px;
  margin-left: 100px;
  margin-top: 40px;
  padding: 16px;
}
</style>
