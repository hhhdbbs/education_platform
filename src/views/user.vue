<template>
  <div>
    <el-row style="display:flex;height:200px;background-color: rgba(192,200,190, 0.5);padding:0 6%;align-items:center">
      <img
        :src="jpg"
        alt="头像"
        style="width:100px;height: 100px; display: block; border-radius:100px;margin-right:2%"
      />
      <h1>{{ name }}</h1>
    </el-row>
    <el-row style="padding:0 4%">
      <el-col :span="17">
        <el-menu
          default-active="/user"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/user">我的课程</el-menu-item>
          <el-menu-item index="/user/wrongExercise">我的错题本</el-menu-item>
        </el-menu>
        <el-row :gutter="20" v-if="myClass.length>0">
          <el-col
            :span="4"
            v-for="(item, index) in myClass"
            :key="index"
            :offset="index > 0 ? 0 : 0"
          >
            <el-card
              :body-style="{ padding: '10px' }"
              style="margin-top: 10px;width:100%;height:250px"
              shadow="hover"
            >
              <el-image
                :src="item.class_img"
                fit='cover'
                @click="toClass(item)"
                style="height:160px"
              ></el-image>
              <div style="padding: 14px;">
                <el-link style="color:black; font-size: larger">{{
                  item.name
                }}</el-link
                ><!--最好改成router跳转，传参-->
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div v-else style="width:100%;height:50px;text-align:center;padding-top:10%">
          <div>暂时没有加入的课程</div>
        </div>
      </el-col>
      <el-col :span="6">
        <user-info :info="info"></user-info>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import userInfo from "../components/userInfo.vue";
export default {
  name: "User",
  components: {
    userInfo
  },
  data() {
    return {
      info: {
        sex:0,
        school:"",
        major:"sad",
        grade:"543",
        email:"241"
      },
      myClass: [
        {
          class_img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          name: "课程名称",
          courseId: 1
        },
        {
          class_img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          name: "课程名称",
          courseId: 1
        },
        {
          class_img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          name: "课程名称",
          courseId: 1
        },
        {
          class_img:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          name: "课程名称",
          courseId: 1
        },
      ],
      jpg:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      name: ""
    };
  },
  mounted(){
    var that=this;
    this.$axios.post("/course/getUserCourseList",{
        id:0
      },
      {headers: {'Authorization':localStorage.token}}
    ).then(res=>{
      if(res.data.code==200){
        console.log(res);
        this.myClass=res.data.data
      }
    })
    this.$axios.post("/user/my_info", 
      {headers: {'Authorization':localStorage.token}}
    ).then(res=>{
      if(res.data.code==200){
        let data=res.data.data
        that.info.sex=data.sex
        that.info.school=data.school
        that.info.major=data.major
        that.info.grade=data.grade
        that.info.email=data.email
        // that.jpg=data.profile
        that.name=data.name
      }
    })
  },
  methods: {
    getCookie (name) {
        var value = '; ' + document.cookie
        var parts = value.split('; ' + name + '=')
        if (parts.length === 2) return parts.pop().split(';').shift()
    },
    toClass(item) {
      this.$router.push({
        name: "classView",
        params: { courseId: item.id }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.active = key;
    },
    toEdit() {
      this.$router.push({ name: "Edit" });
    }
  }
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-col {
  border-radius: 4px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
