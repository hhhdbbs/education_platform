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
      path: '/login',//ok
      name: 'login',
      component: () => import('../views/login')
    },
    {
      path: '/register',//ok
      name: 'register',
      component: () => import('../views/register')
    },
    {
      path: "/allClass",//ok
      name: "allClass",
      component: () => import("../views/allClass.vue")
    },
    {
      path: "/course_info/:courseId",//ok
      name: "course_info",
      component: course_info,
      meta: {
        title: "课程介绍"
      }
    },
    {
      path: "/video/:courseId/:classId",//ok
      name: "classView",
      component: () => import("../views/classView.vue")
    },
    {
      path: "/courseExe",//ok
      name: "CourseExe",
      component: () => import("../views/exercise.vue")
    },
    {
      path: "/manage",//ok
      name: "manage",
      component: () => import("../components/manage.vue"),
      children: [
        {
          path: "classList",//ok
          name: "ClassList",
          component: () => import("../views/manages/classList")
        },
        {
          path: "manageVideo",//ok
          name: "manageVideo",
          component: () => import("../views/manages/manageVideo")
        },
        {
          path: "exercise",//ok
          name: "ViewExe",
          component: () => import("../views/manages/viewExe")
        },
        {
          path: "uploadExercise",//ok
          name: "UploadExe",
          component: () => import("../views/manages/uploadExe")
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