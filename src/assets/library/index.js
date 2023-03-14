import defaultImg from '@/assets/menu.png'
import { useIntersectionObserver } from '@vueuse/core'
const lazy = { // 图片懒加载指令
  mounted (el, binding) {
    const { stop } = useIntersectionObserver(
    // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
      el,
      // isIntersecting 是否进入可视区域，true是进入 false是移出
      // observerElement 被观察的dom
      ([{ isIntersecting }], observerElement) => {
      // 在此处可根据isIntersecting来判断，然后做业务
        if (isIntersecting) {
          // 指令的值
          el.src = binding.value
          // 如果出错
          el.onerror = () => {
            el.src = defaultImg
          }
          stop()
        }
      },
      { threshold: [0] }
    )
  }
}
// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
// console.dir(importFn.keys()) // 文件名称数组
export default {
  // install 这种写法以后是提供给 app.use() 安装组件库用的
  install (app) {
  //   // Vue3 全局注册组件
  //   app.component(XtxSkeleton.name, XtxSkeleton)
  //   app.component(XtxCarousel.name, XtxCarousel)
  //   app.component(XtxMore.name, XtxMore)
  //   app.component(XtxBread.name, XtxBread)
  //   app.component(XtxBreadItem.name, XtxBreadItem)
    importFn.keys().forEach(element => {
      // 组件实例
      const component = importFn(element).default
      // 截取路径作为组件名
      const reqComName = component.name || element.replace(/\.\/(.*)\.vue/, '$1') // 默认使用组件名
      // 组件挂载
      app.component(reqComName, component)
    })
    // 注册指令
    app.directive('lazy', lazy)
    // vue3.0使用app.config.globalProperties挂载原型方法
  }
}
