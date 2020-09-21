import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
    meta: {
      anonymus: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views//login/Register.vue"),
    meta: {
      anonymus: true,
    },
  },
  {
    path: "/expences",
    name: "Expences",
    component: () =>
      import(/* webpackChunkName: "expences" */ "../views//app/Expences.vue"),
    meta: {
      autorisation: true,
    },
  },
  {
    path: "/income",
    name: "Income",
    component: () =>
      import(/* webpackChunkName: "income" */ "../views//app/Income.vue"),
    meta: {
      autorisation: true,
    },
  },
  {
    path: "/log",
    name: "Log",
    component: () =>
      import(/* webpackChunkName: "log" */ "../views//app/Log.vue"),
    meta: {
      autorisation: true,
    },
  },
  {
    path: "/summary",
    name: "Summary",
    component: () =>
      import(/* webpackChunkName: "summary" */ "../views//app/Summary.vue"),
    meta: {
      autorisation: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// function for autorisation/anonimity check and  view access  
router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user && to.matched.some((route) => route.meta.autorisation)) {
      next({ path: "/login" });
    } else if (user && to.matched.some((route) => route.meta.anonymus)) {
      next({ path: "/expences" });
    } else {
      next();
    }
  });
});

export default router;
