import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
