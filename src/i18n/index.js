// src/i18n/index.js
import Vue from "vue";
import VueI18n from "vue-i18n";

// 引入翻译文件
import en from "./messages/en.json";
import cn from "./messages/cn.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en", // 默认语言
  fallbackLocale: "en",
  messages: {
    en,
    cn,
  },
});

export default i18n;