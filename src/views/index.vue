<template>
  <div>
    <el-container>
      <el-aside width="250px" style="margin-left: 100px;">
        <lb :title="'学科分类'" type="subject" :list="subject_list"></lb>
      </el-aside>
      <el-main>
        <class-carousel></class-carousel>
      </el-main>
      <el-aside width="250px" style="margin-right: 100px;">
        <lb :title="'我的课程'" type="course" :list="my_course_list"></lb>
      </el-aside>
    </el-container>
    <el-container type="flex" justify="space-around">
      <el-col :span="8"
        ><div style="width: 250px; margin: 0 auto;">
          <lb
            :title="'最新更新排行榜'"
            type="course"
            :list="new_course_list"
          ></lb></div
      ></el-col>
      <el-col :span="8"
        ><div style="width: 250px; margin: 0 auto;">
          <lb
            :title="'最多同学排行榜'"
            type="course"
            :list="join_course_list"
          ></lb></div
      ></el-col>
      <el-col :span="8"
        ><div style="width: 250px; margin: 0 auto;">
          <lb
            :title="'最多点赞排行榜'"
            type="course"
            :list="like_course_list"
          ></lb></div
      ></el-col>
    </el-container>
  </div>
</template>

<script>
//轮播走马灯的获取
export default {
  name: "index",
  data() {
    return {
      course_list: [
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
      subject_list: [
        {
          id: 1,
          name: "语文"
        }
      ],
      my_course_list: [],
      new_course_list: [],
      join_course_list: [],
      like_course_list: []
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //this.getUserInfo()
      this.getSubjects();
      this.getMyCourses();
      this.getNewest();
      this.getJoin();
      this.getLike();
    },
    getCookie (name) {
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    getSubjects() {
      this.$axios.post("/subject/list", {},
          {headers: {'X-CSRFToken': this.getCookie('csrftoken')}},
      ).then(res => {
        if (res.status === 200) {
          this.subject_list = res.data.subject;
        }
      });
    },
    getMyCourses() {
      this.$axios.post("/course/user_list",{
          id: 0
      }).then(res => {
        if (res.status === 200) {
          //this.course_list = res.data.courses;
          let j = 0;
          for (let i in res.data.courses) {
            this.my_course_list[j].id = i.id;
            this.my_course_list[j].name = i.name;
            j++;
          }
        }
      });
    },
    getNewest() {
      this.$axios.post("/course/list",{
          new: 1
      }).then(res => {
        if (res.status === 200) {
          console.log(res.data);
          let j = 0;
          for (let i in res.data.courses) {
            this.new_course_list[j].id = i.id;
            this.new_course_list[j].name = i.name;
            j++;
          }
        }
      });
    },
    getJoin() {
      this.$axios.post("/course/list",{
          join: 1
      }).then(res => {
        if (res.status === 200) {
          console.log(res.data);
          let j = 0;
          for (let i in res.data.courses) {
            this.join_course_list[j].id = i.id;
            this.join_course_list[j].name = i.name;
            j++;
          }
        }
      });
    },
    getLike() {
      this.$axios.post("/course/list",{
          like: 0
      }).then(res => {
        if (res.status === 200) {
          console.log(res.data);
          let j = 0;
          for (let i in res.data.courses) {
            this.like_course_list[j].id = i.id;
            this.like_course_list[j].name = i.name;
            j++;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.el-aside {
  color: #333;
  padding-top: 40px;
  padding-bottom: 30px;
}

.el-main {
  color: #333;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
}

.mid {
  margin-bottom: 40px;
  width: 1100px;
  margin: 0 auto;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
