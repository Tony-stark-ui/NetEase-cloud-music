import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        redirect: '/recmmend'
      },
      {
        path: '/recmmend',
        component: () => import('@/views/artlist-recommend')
      },
      {
        path: '/songList',
        component: () => import('@/views/artlist-songList')
      },
      {
        path: '/rankList',
        component: () => import('@/views/artlist-rankList')
      },
      {
        path: '/singer',
        component: () => import('@/views/artlist-singer')
      },
      {
        path: '/mv',
        component: () => import('@/views/artlist-mv')
      },
      {
        path: '/newMusic',
        component: () => import('@/views/artlist-newMusic')
      },
      {
        path: '/mv-detail/:id/',
        component: () => import('@/components/content/MvDetail'),
        props: true
      },
      {
        path: '/artlist/:id',
        props: true,
        component: () => import('@/views/artlist-singerDetail')
      },
      {
        path: '/allmvs',
        component: () => import('@/views/artlist-mv/childComps/AllMvs')
      },
      {
        path: '/searchDetail/:value',
        props: true,
        component: () => import('@/views/search/childComps/searchDetail')
      },
      {
        path: '/musiclistdetail/:id/',
        component: () => import('@/views/music-list-detail/MusicListDetail'),
        children: [
          {
            path: '/',
            redirect: 'songlist',
            props: true
          },
          {
            path: 'songlist',
            component: () => import('@/views/music-list-detail/childComps/SongList'),
            props: true
          },
          {
            path: 'comment',
            component: () => import('@/views/music-list-detail/childComps/Comment'),
            props: true
          },
          {
            path: 'collector',
            component: () => import('@/views/music-list-detail/childComps/Collector'),
            props: true
          },
        ],
        props: true
      },
    ]
  },

]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
