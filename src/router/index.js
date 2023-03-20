import { createRouter, createWebHistory } from 'vue-router'
import MyLayout from '@/views/Layout'
import MyHome from '@/views/home'
import MyAbout from '@/views/about'
import MyDefault from '@/views/Layout/components/default.vue'
import MyTable from '@/views/table'
import MyLogin from '@/views/login'
import MyInfo from '@/views/Info'
import store from '@/store'
import { ElMessage } from 'element-plus'
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
        children: [
          {
            path: '/',
            component: MyDefault,
            name: 'homePage',
            meta: {
              // isMenu: true,
              name: '主页',
              icon: 'House'
            }
          },
          {
            path: 'about',
            name: 'Myabout',
            component: MyAbout,
            meta: {
              isMenu: true,
              name: '关于',
              icon: 'Document'
            }
          },
          {
            path: 'table',
            name: 'MyTable',
            component: MyTable,
            meta: {
              isMenu: true,
              name: '表格展示',
              icon: 'Setting'
            }
          },
          {
            path: 'login',
            name: 'MyLogin',
            component: MyLogin,
            meta: {
              isMenu: true,
              name: '登陆界面',
              icon: 'HomeFilled'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/Info',
    name: 'MyInfo',
    component: MyInfo,
    meta: {
      isMenu: false,
      name: '个人信息中心'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 白名单
const white = ['homePage', 'MyLogin', 'Myabout']
router.beforeEach((to, form, next) => {
  if (white.indexOf(to.name) !== -1) { // 如果是跳转到白名单中
    next()
  } else {
    if (store.state.user.profile.token) { // 登陆了则跳转否则跳转登陆界面
      next()
    } else {
      ElMessage({ message: '请先登陆', type: 'error' })
      next('/login')
    }
  }
})
export default router
