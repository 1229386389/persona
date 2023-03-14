import axios from 'axios'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  timeout: 5000
})
// 请求拦截器
instance.interceptors.request.use((config) => {
  // 获取用户信息，判断是否含有token
  const { profile } = store.state.user
  if (profile.token) {
    // 设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截器
instance.interceptors.response.use((res) => {
  return res.data
}, err => {
  if (err.response && err.response.status === 401) {
    // 401状态 清空无效的用户信息
    store.commit('setUser', {}
    )
    // 当前路由地址
    // 组件里头：url为`/user?a=10` $route.path 只能获取到/user  $route.fullPath 才能获取到 /user?a=10
    // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // encodeURIComponent 转换uri编码，防止解析地址出问题
    // 跳转回登陆界面并携带参数
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})
// 请求工具函数
export default (url, method, submit) => {
  return instance({
    url,
    method,
    // 如果请求方式为get则params 否则data
    // []里面解析为一个js表达式 [get]:submit 等于 get:submit
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submit
  })
}
