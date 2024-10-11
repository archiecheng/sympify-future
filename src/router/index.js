import Vue from "vue";
import VueRouter from "vue-router";
import PcPage from "@/views/PcPage.vue";
import MobilePage from "@/views/MobilePage.vue";
import Disease from "@/views/Disease.vue";
import Report from "@/views/Report.vue";
import TestFireBase from "@/views/TestFireBase.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/test",
    name: "TestFireBase",
    component: TestFireBase,
  },
  {
    path: "/pc",
    name: "PcPage",
    component: PcPage,
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
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
// router.beforeEach((to, from, next) => {
//   const userAgent = navigator.userAgent;

//   // 检测是否为移动设备
//   const isMobile = /Mobile|Android|iPhone/.test(userAgent);

//   // 移动设备访问PC页面时，跳转到移动端页面，但不干涉 /mobile/disease 路由
//   if (isMobile && !to.path.startsWith("/mobile") && to.path !== "/report") {
//     next("/mobile");
//   } 
  
//   // PC设备访问移动端页面时，跳转到PC端页面
//   else if (!isMobile && to.path !== "/pc" && to.path !== "/report") {
//     next("/pc");
//   } 
//   // 如果是正确的页面，则直接放行
//   else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const userAgent = navigator.userAgent;

  // 检测是否为移动设备
  const isMobile = /Mobile|Android|iPhone/.test(userAgent);

  // 如果当前路径已经是正确的页面，则不再进行重定向
  if (isMobile && !to.path.startsWith("/mobile") && to.path !== "/report") {
    if (to.path !== "/mobile") {
      next("/mobile");  // 仅当目标路径不是 "/mobile" 时才重定向
    } else {
      next();  // 否则直接放行
    }
  } else if (!isMobile && to.path.startsWith("/mobile")) {
    if (to.path !== "/pc") {
      next("/pc");  // 仅当目标路径不是 "/pc" 时才重定向
    } else {
      next();  // 否则直接放行
    }
  } else {
    next();  // 如果路径正确，则放行
  }
});
export default router;
