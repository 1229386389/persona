import { createRouter, createWebHistory } from 'vue-router'
import MyLayout from '@/views/Layout'
import MyHome from '@/views/home'
import MyAbout from '@/views/about'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MyHome,
    children: [
      {
        path: '/',
        name: 'Layout',
        component: MyLayout,
        children: [{
          path: 'about',
          name: 'Myabout',
          component: MyAbout,
          meta: {
            isMenu: true,
            name: '关于',
            icon: 'Document'
          }
        }, {
          path: 'table',
          name: 'MyTable',
          component: MyAbout,
          meta: {
            isMenu: true,
            name: '表格展示',
            icon: 'Setting'
          }
        }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
