<template>
  <div style="margin:30px">
    <el-card class="box-card" shadow="hover">
      <div class="text item">
        <el-button type="primary" plain @click="toEdit">修改个人信息</el-button>
        <p>{{info.sex}}</p>
        <p>就读学校：{{info.school}}</p>
        <p>就读专业：{{info.major}}</p>
        <p>就读学校：{{info.school}}</p>
        <p>绑定邮箱：{{info.email}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "userInfo",
    props: {
    info: {
      default: {
          sex:0,
          school:"",
          major:"sad",
          grade:"543",
          email:"241"
    }
    }
  },
  data() {
    return {
      activeIndex: this.$route.path
    };
  },
  methods: {
    toEdit() {
      this.$router.push({ path: "/user/edit" });
    }
  }
};
</script>

<style scoped></style>
