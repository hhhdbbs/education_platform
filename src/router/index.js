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
      path: '/register',
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
      path: "/allExercise",
      name: "allExercise",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/allExer.vue")
    },
    {
      path: "/allExercise/:courseId/:exerciseId/:level", //'/exercise/:classId/:zhang/:jie/:level',
      name: "exercise",
      component: () => import("../views/allExercise.vue")
    },
    {
      path: "/manage",
      name: "manage",
      component: () => import("../components/manage.vue"),
      children: [
        {
          path: "uploadVideo",
          name: "uploadVideo",
          component: () => import("../views/manages/uploadVideo")
        },
        {
          path: "uploadExe",
          name: "uploadExe",
          component: () => import("../views/manages/uploadExe")
        },
        {
          path: "manageVideo",
          name: "manageVideo",
          component: () => import("../views/manages/manageVideo")
        },
        {
          path: "manageExe",
          name: "manageExe",
          component: () => import("../views/manages/manageExe")
        },
        {
          path: "uploadPrepare",
          name: "uploadPrepare",
          component: () => import("../views/manages/uploadPrepare")
        },
        {
          path: "adminPrepare",
          name: "adminPrepare",
          component: () => import("../views/admin/adminPrepare")
        },
        {
          path: "adminVideo",
          name: "adminVideo",
          component: () => import("../views/admin/adminVideo")
        },
        {
          path: "adminExe",
          name: "adminExe",
          component: () => import("../views/admin/adminExe")
        },
        {
          path: "adminManageVideo",
          name: "adminManageVideo",
          component: () => import("../views/admin/adminManageVideo")
        },
        {
          path: "adminManageExe",
          name: "adminManageExe",
          component: () => import("../views/admin/adminManageExe")
        }
      ]
    },
    {
      path: "/user",
      name: "User",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/user.vue")
    },
    {
      path: "/user/wrongExercise",
      name: "WrongExercise",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/myWrongExercise.vue")
    },
    {
      path: "/user/edit",
      name: "Edit",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/edit.vue")
    },
    {
      path: "/user/editAccount",
      name: "EditAccount",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/editZhanghao.vue")
    },
    {
      path: "/user/editTeacher",
      name: "EditTeacher",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/editTeacher.vue")
    },
    {
      path: "/note_edit/:courseId",
      name: "note_edit",
      component: note_edit,
      meta: {
        title: "撰写笔记"
      }
    }
  ]
});

export default router;
//http://127.0.0.1:8000/