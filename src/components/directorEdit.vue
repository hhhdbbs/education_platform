<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
  <el-menu-item index="1">资料设置</el-menu-item>
   <el-menu-item index="2">账号设置</el-menu-item>
    <el-menu-item index="3">申请成为老师</el-menu-item>
</el-menu>
</template>
<script>
  export default {
     name: "DirectorEdit",
    data() {
      return {
          activeIndex:"1"
      }
    }
  };
</script>