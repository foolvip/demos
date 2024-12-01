import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '@/components/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: { name: 'dashboard' },
      meta: {
        title: '首页',
      },
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('@/views/dashbaord/index.vue'),
          meta: {
            title: '首页',
            cached: false, // 页面是否要缓存
            hidden: true, // 不在侧边菜单显示
          },
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
