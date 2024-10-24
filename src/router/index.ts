import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Layout from '../components/Layout/index.vue'
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        icon: '<PieChartOutlined />'
      }
      // component: Layout
    },
    {
      path: '/demo-1',
      name: 'Demo 1',
      component: () => import('../views/demo-1/index.vue'),
      meta: {
        icon: 'desktop-outlined'
      }
    },
    {
      path: '/demo-2',
      name: 'Demo 2',
      component: () => import('../views/demo-2/index.vue'),
      meta: {
        icon: 'user-outlined'
      }
    },
    {
      path: '/demo-3',
      name: 'Demo 3',
      component: () => import('../views/demo-3/index.vue'),
      meta: {
        icon: 'team-outlined'
      }
    },
    {
      path: '/demo-4',
      name: 'Demo 4',
      component: () => import('../views/demo-4/index.vue'),
      meta: {
        icon: 'team-outlined'
      }
    },
  ]
})

export default router
