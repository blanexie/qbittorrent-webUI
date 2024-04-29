import { createRouter, createWebHistory } from 'vue-router'
import TorrentList from '@/views/TorrentList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/all',
      name: 'all',
      component: TorrentList
    },
    {
      path: '/quene',
      name: 'quene',
      component: TorrentList
    },
    {
      path: '/error',
      name: 'error',
      component: TorrentList
    },
    {
      path: '/finish',
      name: 'finish',
      component: TorrentList
    },
    {
      path: '/downloading',
      name: 'downloading',
      component: TorrentList
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
