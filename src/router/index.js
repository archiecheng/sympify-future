/*
 * @Author: archiecheng archiechengice@outlook.com
 * @Date: 2024-10-04 14:14:58
 * @LastEditors: archiecheng archiechengice@outlook.com
 * @LastEditTime: 2025-01-07 12:13:21
 * @FilePath: \sympifyfuture\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";
import PcPage from "@/views/PcPage.vue";
import MobilePage from "@/views/MobilePage.vue";
import Disease from "@/views/Disease.vue";
import Report from "@/views/Report.vue";
import TestFireBase from "@/views/TestFireBase.vue";
import HowToUse from "@/views/HowToUse.vue";

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
    path: "/howtouse",
    name: "HowToUse",
    component: HowToUse,
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
  base: process.env.BASE_URL || "",
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

// router.beforeEach((to, from, next) => {
//   const userAgent = navigator.userAgent;

//   // 检测是否为移动设备
//   const isMobile = /Mobile|Android|iPhone/.test(userAgent);

//   // 如果当前路径已经是正确的页面，则不再进行重定向
//   if (isMobile && !to.path.startsWith("/mobile") && to.path !== "/report") {
//     if (to.path !== "/mobile") {
//       next("/mobile");  // 仅当目标路径不是 "/mobile" 时才重定向
//     } else {
//       next();  // 否则直接放行
//     }
//   } else if (!isMobile && to.path.startsWith("/mobile")) {
//     if (to.path !== "/pc") {
//       next("/pc");  // 仅当目标路径不是 "/pc" 时才重定向
//     } else {
//       next();  // 否则直接放行
//     }
//   } else {
//     next();  // 如果路径正确，则放行
//   }
// });
router.beforeEach((to, from, next) => {
  const userAgent = navigator.userAgent;

  // 判断是否为移动设备
  const isMobile = /Mobile|Android|iPhone/.test(userAgent);

  // 定义需要排除的路径
  const excludedPaths = ["/report", "/howtouse"];

  // 移动端设备访问非 /mobile 或例外页面时跳转到 /mobile
  if (isMobile && !to.path.startsWith("/mobile") && !excludedPaths.includes(to.path)) {
    next("/mobile");
  } 
  // PC端设备访问 /mobile 页面时跳转到 /pc，排除例外页面
  else if (!isMobile && to.path.startsWith("/mobile") && !excludedPaths.includes(to.path)) {
    next("/pc");
  } 
  // 如果路径是例外页面或符合要求，直接放行
  else {
    next();
  }
});

export default router;
