<template>
  <div class="header">
    <el-menu
      :default-active="active_index"
      mode="horizontal"
      router
      @select="handleSelect"
      background-color="#c0c8be"
      text-color="#494747"
      active-text-color="#917148"
    >
      <el-menu-item style="width: auto;">
        <el-button
          type="text"
          @click="toMainPage"
          style="font-size: xx-large; color:#494747;"
          >皓磊教育</el-button
        ></el-menu-item
      >
      <el-menu-item index="/index" style="font-size: large;">主页</el-menu-item>
      <el-menu-item index="allClass" style="font-size: large;"
        >课程</el-menu-item
      >
      <el-menu-item index="/allExercise" style="font-size: large;"
        >作业</el-menu-item
      >
      <el-menu-item index="/manage/uploadVideo" style="font-size: large;" v-if="isTeacher || isAdmin"
        >视频管理</el-menu-item
      >
      <div class="user">
        <el-dropdown
          @click.native="dialogVisible = true"
          @command="handleCommand"
        >
          <span class="el-dropdown-link">
            <el-avatar :src="user_img"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="User">个人主页</el-dropdown-item>
            <!--                  <el-dropdown-item>管理</el-dropdown-item>-->
            <el-dropdown-item command="WrongExercise">错题集</el-dropdown-item>
            <el-dropdown-item command="Edit">设置</el-dropdown-item>
            <el-dropdown-item command="LogOut" v-if="isLog">登出</el-dropdown-item>
            <el-dropdown-item command="login" v-else>登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="write"></div>
      <div class="search">
        <div>
          <el-input v-model="search" placeholder="请输入搜索内容" clearable @keyup.enter.native="toAllClass"></el-input>
        </div>
        <el-button type="primary" @click="toAllClass">搜索</el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      search: "",//最后写
      active_index: this.$route.path,
      user_img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      isLog: false,
      isTeacher: true,
      isAdmin:true
    };
  },
  mounted(){
    this.init()
  },
  watch:{
    isLog(newValue){
      console.log(newValue)
    }
  },
  methods: {
    getCookie (name) {
        var value = '; ' + document.cookie
        var parts = value.split('; ' + name + '=')
        if (parts.length === 2) return parts.pop().split(';').shift()
    },
    toAllClass(){
      if(this.search !== '')
        this.$router.push({name: 'allClass', query: {keywords: this.search}})
      else
        this.$router.push({name: 'allClass'})
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      //this.$message('click on item ' + command)
      if(command === 'LogOut'){
        this.$axios.get('/user/login').then(res => {
          if(res.data.status === 0){
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
            this.isLog = localStorage.token?true:false
            this.$message({message:'登出成功！', type:'success'})
          } else{
            this.$message({message: '登出失败，稍后再试', type:'error'})
          }
        }).catch(e=>{
          console.log(e)
        })
      }else{
        console.log(command)
      this.$router.push({ name: command });
      }
    },
    toMainPage() {
      this.$router.push({ name: "index" });
    },
    init(){
      this.isLog = localStorage.token?true:false
      this.isTeacher = this.isAdmin = false
      this.getUserInfo()
      this.getUserIdentity()
    },
    getUserInfo(){
      const that = this;
      this.$axios.get("/user/user_info", {
        params: {
          id: 0
        },
      }, {headers: {'X-CSRFToken': that.getCookie('csrftoken')}}).then(res => {
        if(res.status === 200){
          this.user_img = res.data.img
          this.isLog = localStorage.token?true:false
          localStorage.setItem('userId', res.data.id)
        }
        else{
          this.$message({
            message: '获取个人头像失败',
            type: 'error'
          })
        }
      }).catch(e =>{
        this.$message({
          message: e,
          type: 'error'
        })
      })
    },
    getUserIdentity(){
      if(!this.isLog) return;
      this.$axios.get('/user/identity', {params:{id: 0}}).then(res=>{
        if(res.status == 200){
          this.isTeacher = true
          this.isAdmin = true
          if(res.data.identity == 2){
            this.isAdmin = false
          }
          if(res.data.identity == 1){
            this.isAdmin = false
            this.isTeacher = false
          }
          else if(res.data.identity == 0){
            this.isTeacher = this.isAdmin = false
            this.$message({message:'获取身份失败，请稍后再试', type:'error'})
          }
        }
      }).catch(e =>{
        this.$message({
          message: e,
          type: 'error'
        })
      })
    }
  }
};
</script>

<style scoped>
.hearer {
  z-index: 1000;
}

.el-menu-item {
  width: 100px;
}

h1 {
  float: left;
  height: 61px;
  margin: 0;
  width: 150px;
  cursor: pointer;
}

.search {
  width: 350px;
  float: right;
}

.search > div {
  width: calc(80% - 40px);
  float: left;
}

.write {
  float: right;
}

.user {
  float: right;
  margin: 10px 35px 10px 20px;
  height: 40px;
  overflow: hidden;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  display: inline-block;
  width: 50px;
}

.el-dropdown-menu {
  text-align: center;
  width: 100px;
}

.header >>> .el-dialog {
  max-width: 600px;
  min-width: 450px;
  z-index: 9999;
}
</style>
