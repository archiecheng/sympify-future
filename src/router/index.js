import Vue from "vue";
import VueRouter from "vue-router";
import PcPage from "@/views/PcPage.vue";
import MobilePage from "@/views/MobilePage.vue";
import Disease from "@/views/Disease.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/pc",
    name: "PcPage",
    component: PcPage,
  },
  {
    path: "/mobile/disease",
    name: "disease",
    component: Disease,
  },
  {
    path: "/mobile",
    name: "Mobile",
    component: MobilePage,
  },
  {
    path: "/",
    redirect: "/pc", // 默认跳转PC页面
  },
];

const router = new VueRouter({
  mode: "hash", // 使用 hash 模式
  base: process.env.BASE_URL,
  routes,
});

// 添加 beforeEach 路由守卫
router.beforeEach((to, from, next) => {
  const userAgent = navigator.userAgent;

  // 检测是否为移动设备
  const isMobile = /Mobile|Android|iPhone/.test(userAgent);

  // 移动设备访问PC页面时，跳转到移动端页面，但不干涉 /mobile/disease 路由
  if (isMobile && !to.path.startsWith("/mobile")) {
    next("/mobile");
  } 
  
  // PC设备访问移动端页面时，跳转到PC端页面
  else if (!isMobile && to.path !== "/pc") {
    next("/pc");
  } 
  // 如果是正确的页面，则直接放行
  else {
    next();
  }
});

export default router;
