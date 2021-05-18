<template>
  <div class="Manage">
    <el-col :span="4">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        router
        background-color="#c0c8be"
        text-color="#494747"
        active-text-color="#917148"
      >
        <el-menu-item-group v-if="isTeacher || isAdmin">
          <template slot="title"
            ><span style="margin-right: 15px; font-size: larger; font-weight: bold"
              >教师</span
            ></template
          >
          <el-menu-item index="/manage/uploadPrepare">
            <span slot="title">提交备课申请</span>
          </el-menu-item>
          <el-menu-item index="/manage/uploadVideo">
            <span slot="title">上传课程视频</span>
          </el-menu-item>
          <el-menu-item index="/manage/uploadExe">
            <span slot="title">上传作业习题</span>
          </el-menu-item>
          <el-menu-item index="/manage/manageVideo">
            <span slot="title">管理我的视频</span>
          </el-menu-item>
          <el-menu-item index="/manage/manageExe">
            <span slot="title">管理我的习题</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group v-if="isAdmin">
          <template slot="title"
            ><span style="margin-right: 15px; font-size: larger; font-weight: bold"
              >管理员</span
            ></template
          >
          <el-menu-item index="/manage/adminPrepare">
            <span slot="title">审核备课文件</span>
          </el-menu-item>
          <el-menu-item index="/manage/adminVideo">
            <span slot="title">审核课程视频</span>
          </el-menu-item>
          <el-menu-item index="/manage/adminExe">
            <span slot="title">审核作业习题</span>
          </el-menu-item>
          <el-menu-item index="/manage/adminManageVideo">
            <span slot="title">管理全部视频</span>
          </el-menu-item>
          <el-menu-item index="/manage/adminManageExe">
            <span slot="title">管理全部习题</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-col>
    <el-col :span="20" style="min-height: 87vh;">
      <router-view></router-view>
    </el-col>
  </div>
</template>

<script>
/* eslint-disable */
  export default {
    name: "manage",
    data(){
      return{
        activeIndex: this.$route.path,
        isTeacher: true,
        isAdmin: true
      }
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){

      },
      handleSelect(key, keyPath) {
        console.log(this.$route.path)
        console.log(key, keyPath);
      },
      getUserIdentity(){
        this.$axios.get('/user/identity', {params:{id: 0}}).then(res=>{
          if(res.status == 200){
            this.isTeacher = true
            this.isAdmin = true
            if(res.data.identity == 2){
              this.isAdmin = false
            }
            else if(res.data.identity == 1){
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
  }
</script>

<style scoped>
  .el-menu-item-group>>>.el-menu-item-group__title{
    padding: 5px 45px !important;
  }
  .el-menu{
    width: 150px;
  }
  .el-menu-item, .el-submenu__title {
    text-align: center;
  }
</style>