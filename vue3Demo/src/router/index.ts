import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import BasicLayout from '@/components/layout/BasicLayout.vue'
import ProjectList from '@/views/project/List.vue'

import { BookOutline, BriefcaseOutline } from '@vicons/ionicons5'

export const routes = [
  {
    path: '/',
    redirect: { name: 'worktable' }
  },
  {
    name: 'worktable',
    path: '/worktable',
    component: BasicLayout,
    children: [
      {
        name: 'worktableIndex',
        path: '',
        component:() => HomeView,
        meta: {
          title: '工作台',
          icon: BookOutline
        }
      }
    ],
  },
  {
    path: '/project',
    component: BasicLayout,
    children: [
      {
        name: 'projectList',
        path: '/list',
        component:() => ProjectList,
        meta: {
          title: '项目列表',
          icon: BriefcaseOutline
        }
      }
    ],
    meta: {
      title: '项目',
      icon: BriefcaseOutline
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '关于',
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
