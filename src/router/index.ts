import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

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
            path: '/songPlaylist/:id',//歌单详情页
            props: true, //将参数设置成组件属性
            name: 'songPlaylist',
            component: () => import('../views/list/SongListView.vue'),
            meta: {
                hiddenTabBar: true,
                transName: 'playlist'
            }
        }
    ]
})

export default router
