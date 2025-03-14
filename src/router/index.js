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
    path: "/test/:device(pc|mobile)/:lang(en|cn)?",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: "",
        name: "TestFireBase",
        component: TestFireBase,
      },
    ],
  },
  {
    path: "/pc/:lang(en|cn)?",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: "",
        name: "PcPage",
        component: PcPage,
      },
      {
        path: "disease",
        name: "PcDisease",
        component: Disease,
      },
    ],
  },
  {
    path: "/mobile/:lang(en|cn)?",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: "",
        name: "Mobile",
        component: MobilePage,
      },
      {
        path: "disease",
        name: "MobileDisease",
        component: Disease,
      },
    ],
  },
  {
    path: "/howtouse/:lang(en|cn)",
    name: "HowToUse",
    component: HowToUse,
    props: true,
  },
  {
    path: "/report/:lang(en|cn)",
    name: "Report",
    component: Report,
    props: true,
  },
  {
    path: "/",
    redirect: (to) => {
      const userAgent = navigator.userAgent;
      const isMobile = /Mobile|Android|iPhone/.test(userAgent);
      const lang = to.query.lang || "en";
      return isMobile ? `/mobile/${lang}` : `/pc/${lang}`;
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: (to) => {
      const userAgent = navigator.userAgent;
      const isMobile = /Mobile|Android|iPhone/.test(userAgent);
      const lang = to.params.lang || "en";
      return isMobile ? `/mobile/${lang}` : `/pc/${lang}`;
    },
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
  const lang = to.params.lang || "en";
  const device = to.path.startsWith("/mobile") ? "mobile" : to.path.startsWith("/pc") ? "pc" : null;

  // 同步 vue-i18n 的语言
  if (to.params.lang && to.params.lang !== i18n.locale) {
    i18n.locale = to.params.lang;
  }

  // 确保有语言参数
  if (!to.params.lang) {
    next({ path: to.path + (to.path.endsWith("/") ? "" : "/") + lang });
    return;
  }

  // 刷新页面时清空 diseaseName 参数
  if (!from.path && to.query.diseaseName) {
    const targetPath = to.path.replace(/\/disease$/, ""); // 如果路径以 /disease 结束，移除它
    next({
      path: targetPath || `/${device}/${lang}`,
      params: { lang },
      query: {},
    });
    return;
  }

  // 处理设备类型匹配
  if (device) {
    if (isMobile && device === "pc") {
      next(`/mobile/${lang}`);
      return;
    }
    if (!isMobile && device === "mobile") {
      next(`/pc/${lang}`);
      return;
    }
  }

  // 允许 /howtouse 和 /report 跨设备访问
  if (to.path.startsWith("/howtouse") || to.path.startsWith("/report")) {
    next();
    return;
  }

  next();
});

export default router;