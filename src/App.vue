<template>
  <v-app>
    <el-header>
      <NavBar></NavBar>
    </el-header>
    <v-main>
      <router-view style="min-height:87vh;"/>
    </v-main>
    <el-footer>
      <el-divider>
        <span style="font-size: 17px;">皓磊教育，致力于成就每一个人</span>
      </el-divider>
    </el-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
.el-footer {
  margin: 0;
  padding: 0;
  min-width: 1000px;
  height: 50px;
  width: 100%;
}

.el-header {
  color: #333;
  line-height: 60px;
  padding: 0 !important;
  overflow: hidden;
  width: 100vw;
  z-index: 2000;
}

body {
  background-color: #f6f6f6;
  width: 100vw !important;
  overflow-x: hidden;
}
/* .el-divider__text.is-center {
  background-color: whitesmoke;
} */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
