import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/register",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views//login/Register.vue"),
    meta: {
      requiresAnon: true,
    },
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: () =>
      import(/* webpackChunkName: "expenses" */ "../views//app/Expenses.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/income",
    name: "Income",
    component: () =>
      import(/* webpackChunkName: "income" */ "../views//app/Income.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/log",
    name: "Log",
    component: () =>
      import(/* webpackChunkName: "log" */ "../views//app/Log.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/editlog/:id",
    name: "Edit",
    component: () =>
      import(/* webpackChunkName: "log" */ "../views//app/editLog.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/infopage/:id",
    name: "Info",
    component: () =>
      import(/* webpackChunkName: "log" */ "../views//app/InfoPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/summary",
    name: "Summary",
    component: () =>
      import(/* webpackChunkName: "summary" */ "../views//app/Summary.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// function for requiresAuth/anonimity check and access to pages
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.requiresAuth)) {
      next({ path: "/register" });
    } else if (user && to.matched.some((route) => route.meta.requiresAnon)) {
      next({ path: "/expenses" });
    } else {
      next();
    }
  });
});

export default router;
