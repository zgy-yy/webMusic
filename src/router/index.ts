import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        transName: 'home'//过度动画名
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../views/MyView.vue')
    },
    {
      path: '/playlist/:type/:id',
      props: true, //将参数设置成组件属性
      name: 'playlist',
      component: () => import('../views/ListView.vue'),
      meta: {
        hiddenTabBar: true,
        transName:'playlist'
      }
    }
  ]
})

export default router
