import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import VueVideoPlayer from "vue-video-player";
import axios from "axios";

import NavBar from "./components/header.vue";
import cib from "./components/course_intro_block.vue";
import manage from "./components/manage.vue";
import classCarousel from "./components/classCarousel";
import classCardSp from "./components/classCardSp";
import lb from "./components/list_block";

const Axios = axios.create({
  //请求接口
  baseURL:"http://127.0.0.1:8000",
  //超时设置
  timeout:5000,
  //请求头设置
  withCredentials : true,
})
Axios.interceptors.request.use(config => {
    // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
    // if(config.method  === 'post'){
    //     // JSON 转换为 FormData
    //     const formData = new FormData()
    //     Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
    //     config.data = formData
    // }
  config.headers.contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token
    }
    return config
},error =>{
    this.$message({message:'参数错误',type:'error'})
    return Promise.reject(error.response.data)
})

Vue.prototype.$axios = Axios

Vue.use(Element);
Vue.use(mavonEditor);
Vue.use(VueVideoPlayer);
Vue.component("NavBar", NavBar);
Vue.component("cib", cib);
Vue.component("classCardSp", classCardSp);
Vue.component("classCarousel", classCarousel);
Vue.component("manage", manage);
Vue.component("lb", lb);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  component: {
    NavBar,
    cib,
    classCardSp,
    classCarousel,
    manage,
    lb
  }
}).$mount("#app");
