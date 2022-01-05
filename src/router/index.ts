import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

export default function () {
  const routerHistory = import.meta.env.SSR === false ? createWebHistory() : createMemoryHistory()
  return createRouter({
    history: routerHistory,
    routes: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/pages/views-tsx/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/pages/main/user/index.vue')
      },
      {
        path: '/market',
        name: 'market',
        component: () => import('@/pages/views-tsx/market')
      }
    ]
  })
}
