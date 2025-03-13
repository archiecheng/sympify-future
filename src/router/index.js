import Vue from "vue";
import VueRouter from "vue-router";
import PcPage from "@/views/PcPage.vue";
import MobilePage from "@/views/MobilePage.vue";
import Disease from "@/views/Disease.vue";
import Report from "@/views/Report.vue";
import TestFireBase from "@/views/TestFireBase.vue";
import HowToUse from "@/views/HowToUse.vue";
import i18n from "../i18n"; // 导入 i18n 实例

Vue.use(VueRouter);

// 路由定义
const routes = [
  {
    path: "/test",
    children: [
      {
        path: ":lang(en|cn)?",
        name: "TestFireBase",
        component: TestFireBase,
      },
    ],
  },
  {
    path: "/pc",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: ":lang(en|cn)?",
        name: "PcPage",
        component: PcPage,
      },
    ],
  },
  {
    path: "/report",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: ":lang(en|cn)?",
        name: "Report",
        component: Report,
      },
    ],
  },
  {
    path: "/howtouse",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: ":lang(en|cn)?",
        name: "HowToUse",
        component: HowToUse,
      },
    ],
  },
  {
    path: "/mobile",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: "disease/:lang(en|cn)?",
        name: "Disease",
        component: Disease,
      },
      {
        path: ":lang(en|cn)?",
        name: "Mobile",
        component: MobilePage,
      },
    ],
  },
  {
    path: "/",
    redirect: "/pc/en",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/pc/en",
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL || "",
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const userAgent = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone/.test(userAgent);
  const excludedPaths = ["/report", "/howtouse"];

  // 获取语言和基础路径
  const lang = to.params.lang || "en";
  const pathParts = to.path.split("/").filter(Boolean);
  const basePath = "/" + pathParts.slice(0, pathParts.length - (to.params.lang ? 1 : 0)).join("/");

  // 同步 vue-i18n 的语言
  if (to.params.lang && to.params.lang !== i18n.locale) {
    i18n.locale = to.params.lang; // 直接使用导入的 i18n 实例
  }

  // 处理不完整的路径
  if (!to.params.lang) {
    if (to.path === "/pc" || to.path === "/pc/") {
      next("/pc/en");
      return;
    }
    if (to.path === "/mobile" || to.path === "/mobile/") {
      next("/mobile/en");
      return;
    }
    if (to.path === "/test" || to.path === "/test/") {
      next("/test/en");
      return;
    }
    if (to.path === "/report" || to.path === "/report/") {
      next("/report/en");
      return;
    }
    if (to.path === "/howtouse" || to.path === "/howtouse/") {
      next("/howtouse/en");
      return;
    }
    if (to.path === "/mobile/disease" || to.path === "/mobile/disease/") {
      next("/mobile/disease/en");
      return;
    }
  }

  // 移动端逻辑
  if (isMobile && !basePath.startsWith("/mobile") && !excludedPaths.includes(basePath)) {
    next(`/mobile/${lang}`);
    return;
  }

  // PC 端逻辑
  if (!isMobile && basePath.startsWith("/mobile") && !excludedPaths.includes(basePath)) {
    next(`/pc/${lang}`);
    return;
  }

  next();
});

export default router;