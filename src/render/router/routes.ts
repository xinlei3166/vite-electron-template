import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: () => import('../components/HelloWorld.vue')
  }
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: { name: '404' }
  // }
]

export default routes
