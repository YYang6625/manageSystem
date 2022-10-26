import { createRouter, createWebHashHistory } from "vue-router";
import Cookie from "js-cookie";

// 路由引用
const routes = [
  {
    path: "/",
    // 主页面
    component: () => import("../views/Main.vue"),
    // 进入之后就重定向进入home页面
    redirect: "/home",
    // 子页面
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home/Home.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/userManage/userManage.vue"),
      },
      {
        path: "/mall",
        name: "mall",
        component: () => import("../views/goodsManage/goodsManage.vue"),
      },
      {
        path: "/page1",
        name: "page1",
        component: () => import("../views/Page/page1.vue"),
      },
      {
        path: "/page2",
        name: "page2",
        component: () => import("../views/Page/page2.vue"),
      },
    ],
  },
  // 登录页面并不是子路由，所以也是直接创建一个路由
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
  },
];

//路由创建
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 登录前的全局守卫监听
router.beforeEach((to, from, next) => {
  const token = Cookie.get("token");
  // 如果未登录也就是没有token并且不是去登陆页面(因为没有token，如果有去login，防止无限循环)，跳转至登录页面
  if (!token && to.name !== "login") {
    next('/login');
    // 有token,说明用户登录，又要回去登录页面，但是已经登录了，就让用户回home主页防止重复登陆导致重复发送请求
  } else if (token && to.name === "login") {
    next("/home");
  } else {
    next();
  }
});

export default router;
