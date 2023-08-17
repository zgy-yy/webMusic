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
            path: '/songPlaylist/:id',//歌单详情页
            props: true, //将参数设置成组件属性
            name: 'songPlaylist',
            component: () => import('../views/list/SongListView.vue'),
            meta: {
                hiddenTabBar: true
            }
        },
        {
            path: '/singerDetails/:id',//歌单详情页
            props: true, //将参数设置成组件属性
            name: 'singerDetailList',
            component: () => import('../views/list/SingerListView.vue'),
            meta: {
                hiddenTabBar: true
            }
        },
        {
            path: '/lib',
            name: 'lib',
            component: () => import('../views/library/LibView.vue'),
            children: [
                {path: '', name: 'singer', component: () => import('../views/library/lib-components/SingerPage.vue')},
                {path: 'musicList', name: 'musicList', component: () => import('../views/library/lib-components/MusicListPage.vue')},
                {path: 'album', name: 'album', component: () => import('../views/library/lib-components/AlbumPage.vue')}
            ]
        },
        {
            path: '/my',
            name: 'my',
            component: () => import('../views/my/MyView.vue')
        },
    ]
})

export default router
