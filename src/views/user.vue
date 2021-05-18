<template>
  <div>
    <el-row
      style="position:relative;height:200px;background-color: rgba(192,200,190, 0.5)"
    >
      <el-col :span="17">
        <div id="info">
          <div style="width: 25% ;height:80%;">
            <div
              style="position:absolute;left:10%;top:70px;width: 100px;height:100px;border-radius:100px;-webkit-border-radius:100px; -moz-border-radius:100px;overflow: hidden"
            >
              <img
                :src="jpg"
                alt="头像"
                style="width:100px;height: 100px; display: block; border-radius:100px;"
              />
            </div>
          </div>
          <div style="position:absolute;left:40%;top:50px;">
            <h4 class="lead">{{ name }}</h4>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
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
        <el-row :gutter="20">
          <el-col
            :span="4"
            v-for="(item, index) in myClass"
            :key="index"
            :offset="index > 0 ? 0 : 0"
          >
            <el-card
              :body-style="{ padding: '10px' }"
              style="margin-top: 10px;"
              shadow="hover"
            >
              <el-button
                @click="toClass(item)"
                style="padding: 0; line-height: 0;"
                ><el-image
                  :src="item.class_img"
                  :fit="'scale-down'"
                  @click="toClass(item)"
                ></el-image
              ></el-button>
              <div style="padding: 14px;">
                <el-link style="color:black; font-size: larger">{{
                  item.name
                }}</el-link
                ><!--最好改成router跳转，传参-->
              </div>
            </el-card>
          </el-col>
        </el-row>
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
          jpg:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "课程名称",
          courseId: 1
        },
      ],
      jpg:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      name: "Gua"
    };
  },
  mounted(){
    var that=this;
    this.$axios({
      url:"course/user_list",
      method:"post",
      data:{
        id:0
        },
      headers: {'X-CSRFToken': that.getCookie('csrftoken')}
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            this.myClass=res.data.courses
            }
      })
     this.$axios({
      url:"user/user_info",
      method:"get",
      params:{
        id:0
        },
      headers: {'X-CSRFToken': that.getCookie('csrftoken')}
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            that.info.sex=res.data.sex
            that.info.school=res.data.school
            that.info.major=res.data.major
            that.info.grade=res.data.grade
            that.info.email=res.data.email
            that.jpg=res.data.img
            that.name=res.data.name
            }
            })
    }
    ,
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
