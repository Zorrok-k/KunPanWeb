import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/main/Home.vue'), // 布局组件
        redirect: { name: 'all' },
        children: [
          {
            path: '', // 默认内容
            name: 'all',
            component: () => import('@/views/main/home/All.vue')
          },
          {
            path: 'picture',
            name: 'picture',
            component: () => import('@/views/main/home/Picture.vue')
          },
          {
            path: 'video',
            name: 'video',
            component: () => import('@/views/main/home/Video.vue')
          },
          {
            path: 'document',
            name: 'document',
            component: () => import('@/views/main/home/Document.vue')
          },
          {
            path: 'audio',
            name: 'audio',
            component: () => import('@/views/main/home/Audio.vue')
          },
          {
            path: 'other',
            name: 'other',
            component: () => import('@/views/main/home/Other.vue')
          },
          {
            path: 'recycle',
            name: 'recycle',
            component: () => import('@/views/main/home/RecycleBin.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
