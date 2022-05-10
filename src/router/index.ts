import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // 子应用使用Hash模式
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'microApp',
      component: () => import('@/App.vue')
    }
  ]
})

export default router