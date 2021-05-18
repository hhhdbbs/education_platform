<template>
  <div class="allClass">
    <div style="padding-right: 200px; padding-left: 200px; padding-top: 40px;">
      <class-carousel :list="list"></class-carousel>
    </div>
    <el-container direction="horizontal">
      <el-main>
        <h3>{{ subject }}课程</h3>
        <div
          v-for="(item, index) in course_list"
          :key="index"
          style="margin-bottom: 10px;"
        >
          <class-card-sp :class-card="item"></class-card-sp>
        </div>
      </el-main>
      <el-aside>
        <h3>所有学科</h3>
        <div
          v-for="(item, index) in classCategory"
          :key="index"
          @click="getSearchResult(keywords, item)"
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
      this.getSearchResult(this.keywords);
    },
    getCookie (name) {
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    getSearchResult(keywords, item) {
      this.$axios.post("/course/list",{subject_id: item, key_words: keywords
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            //this.course_list = res.data
            this.course_list = []
            let j = 0;
            for (let i in res.data.courses) {
              this.course_list[j].courseId = i.id;
              this.course_list[j].className = i.name;
              this.course_list[j].classIntro = i.intro;
              this.course_list[j].class_img = i.class_img;
              this.course_list[j].teacherName = i.author_id;
              this.course_list[j].like_num = i.who_like_ids.length;
              this.course_list[j].stuNum = i.who_join_ids.length;
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
        url: "/subject/list",
        method: 'POST',
        headers: {'X-CSRFToken': that.getCookie('csrftoken')},
        }).then(res => {
        if (res.status === 200) {
          this.classCategory = res.data.subject;
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
  padding: 0;
}
</style>
