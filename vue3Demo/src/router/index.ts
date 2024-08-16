import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import { BaseLayout } from '@/components/layout/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'index' }
  },
    {
      path: '/worktable',
      name: 'worktable',
      component: BaseLayout,
      children: [
        {
          path: '',
          name: 'worktable',
          component:() => HomeView,
          meta: {
            title: '工作台',
          }
        }
      ],
      meta: {
        title: 'home',
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
