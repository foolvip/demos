import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import BasicLayout from '@/components/layout/BasicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'worktable' }
    },
    {
      path: '/worktable',
      component: BasicLayout,
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
