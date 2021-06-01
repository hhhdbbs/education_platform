<template>
  <div class="Manage">
    <el-col :span="24" style="min-height: 87vh;">
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
        isTeacher: false,
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
        this.$axios.get('/user/queryIdentity', {params:{id: 0}},
        {headers: {'Authorization':localStorage.token}}
        ).then(res=>{
          if(res.data.code == 200){
            if(res.data.data.identity==2)
            this.isTeacher = true
          alert("您是学生，没有权限")   
        }else alert(res.data.message)
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