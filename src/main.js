/*
 * @Author: archiecheng archiechengice@outlook.com
 * @Date: 2024-10-04 14:14:58
 * @LastEditors: archiecheng archiechengice@outlook.com
 * @LastEditTime: 2024-10-13 21:54:45
 * @FilePath: \sympifyfuture\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入elemetn-ui组件库
import ElementUI from 'element-ui';
// 引入element-ui全部css
import 'element-ui/lib/theme-chalk/index.css';
// 引入通用样式
import './assets/css/common.css'
// 引入 vant 组件库
import Vant from 'vant';
import 'vant/lib/index.css'; // 引入 Vant 的样式
import $ from 'jquery'; // 引入 jQuery

window.$ = $; // 直接将 jQuery 挂载到 window 对象上
Vue.config.productionTip = false
// 使用element
Vue.use(ElementUI)
// 使用 vant
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
