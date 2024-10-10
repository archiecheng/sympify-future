import Vue from 'vue'
import VueRouter from 'vue-router'
import PcPage from '@/views/PcPage.vue'
import MobilePage from '@/views/MobilePage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/pc',
    name: 'PcPage',
    component: PcPage
  },
  {
    path: '/mobile',
    name: 'Mobile',
    component: MobilePage
  },
  {
    path: '/',
    redirect: '/pc' // 默认跳转PC页面
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加 beforeEach 路由守卫
router.beforeEach((to, from, next) => {
  const userAgent = navigator.userAgent;

  // 检测是否为移动设备
  const isMobile = /Mobile|Android|iPhone/.test(userAgent);

  // 移动设备访问PC页面时，跳转到移动端页面
  if (isMobile && to.path !== '/mobile') {
    next('/mobile');
  } 
  // PC设备访问移动端页面时，跳转到PC端页面
  else if (!isMobile && to.path !== '/pc') {
    next('/pc');
  } 
  // 如果是正确的页面，则直接放行
  else {
    next();
  }
});

export default router
