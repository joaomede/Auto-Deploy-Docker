import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { http } from "../plugins/axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "home",
    redirect: "/"
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requerAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  let autorizacao = to.matched.some(record => record.meta.requerAuth);
  let user = window.$cookies.get("user");
  if (autorizacao) {
    if (user) {
      http
        .get("/api/auth/checkin", { headers: user.headers })
        .then(() => {
          next();
        })
        .catch(() => {
          next({ path: "/login" });
        });
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
