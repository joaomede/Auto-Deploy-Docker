import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/home"
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
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
  },
  {
    path: "/containers/:id",
    props: true,
    name: "Containers",
    component: () => import("../views/Containers.vue"),
    meta: { requerAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  let autorizacao = to.matched.some(record => record.meta.requerAuth);
  let user = window.$cookies.get("user");
  let url = localStorage.getItem("ApiUrl");

  if (autorizacao) {
    if (user) {
      axios
        .get(url + "/api/auth/checkin", { headers: user.headers })
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
