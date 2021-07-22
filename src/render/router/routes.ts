import { RouteRecordRaw } from 'vue-router'

const layout = () => import('@/components/HelloWorld.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/hello',
        name: 'hello',
        meta: {
          title: 'hello'
        },
        component: () => import('@/views/hello/index.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

export default routes
