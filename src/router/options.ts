import { createWebHistory, type RouterOptions } from 'vue-router'
import LIndex from '@/layouts/LIndex.vue'
import { routes as markdown_routes } from './RouteMarkdown'

// 搜索md文件

export const options: RouterOptions = {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: LIndex,
    },
    ...markdown_routes,
  ],
}
