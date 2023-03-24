import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus' // 导入elment包
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import '@/mock'
import '@/assets/styles/variables.less'
// 自己写的组件和指令
import Myui from '@/assets/library'
import print from 'vue3-print-nb'
// 引入自己的图标库
import '@/assets/iconfont/iconfont.css'
import * as echarts from 'echarts'
import 'vue-cropper/dist/index.css'
import * as XLSX from 'xlsx' // Vue3 版本 页面引入

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 挂载echars全局变量
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$XLSX = XLSX
app.use(router).use(store).use(ElementPlus).use(Myui).use(print).mount('#app')
