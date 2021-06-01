import Vue from "vue";
import Router from "vue-router";
import index from "../views/index.vue";
import course_info from "../views/course_info.vue";
import note_edit from "../views/note_edit.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: index,
      meta: {
        title: "主页"
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login')
    },
    {
      path: '/register',//ok
      name: 'register',
      component: () => import('../views/register')
    },
    {
      path: "/allClass",
      name: "allClass",
      component: () => import("../views/allClass.vue")
    },
    {
      path: "/course_info/:courseId",
      name: "course_info",
      component: course_info,
      meta: {
        title: "课程介绍"
      }
    },
    {
      path: "/video/:courseId", //以课程的主键为参数。？
      name: "classView",
      component: () => import("../views/classView.vue")
    },
    {
      path: "/manage",
      name: "manage",
      component: () => import("../components/manage.vue"),
      children: [
        {
          path: "classList",
          name: "ClassList",
          component: () => import("../views/manages/classList")
        },
        {
          path: "manageVideo",
          name: "manageVideo",
          component: () => import("../views/manages/manageVideo")
        }
      ]
    },
    {
      path: "/user",//ok
      name: "User",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/user.vue")
    },
    {
      path: "/user/wrongExercise",//ok
      name: "WrongExercise",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/myWrongExercise.vue")
    },
    {
      path: "/user/edit",//ok
      name: "Edit",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/edit.vue")
    },
    {
      path: "/user/editAccount",//ok
      name: "EditAccount",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/editZhanghao.vue")
    },
    {
      path: "/user/editTeacher",//ok
      name: "EditTeacher",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/editTeacher.vue")
    }
  ]
});

export default router;
//http://127.0.0.1:8000/