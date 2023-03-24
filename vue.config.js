const { defineConfig } = require('@vue/cli-service')
let externals = {}
let cdn = { css: [], js: [] }
const isProduction = process.env.NODE_ENV === 'production' // 判断是否是生产环境
if (isProduction) {
  externals = { // 打包排除项
    /**
      * externals 对象属性解析：
      * '包名' : '在项目中引入的名字'
    */
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    echarts: 'echarts',
    'element-plus': 'ElementPlus',
    mockjs: 'Mock',
    '@element-plus/icons-vue': 'ElementPlusIconsVue',
    xlsx: 'XLSX'//,
    // 'vue-cropper': 'VueCropper'
  }
  cdn = {
    css: [
      'https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.0/index.css'//, // element-ui css 样式表
      // 'https://cdn.jsdelivr.net/npm/vue-cropper@1.0.2/dist/index.css'
    ],
    js: [
      // vue must at first!
      'https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.global.prod.js', // vuejs
      'https://cdn.bootcdn.net/ajax/libs/vue-router/4.1.6/vue-router.global.prod.js',
      'https://cdn.bootcdn.net/ajax/libs/vuex/4.1.0/vuex.global.prod.js',
      'https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.js',
      'https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.0/index.full.js',
      'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.1/echarts.common.js',
      'https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock.js',
      'https://cdn.bootcdn.net/ajax/libs/element-plus-icons-vue/2.1.0/global.iife.js',
      'https://cdn.bootcdn.net/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'//,
      // 'https://cdn.jsdelivr.net/npm/vue-cropper@1.0.2/dist/vue-cropper.umd.js'
    ]
  }
}
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
  configureWebpack: { // webpack配置的东西写在里面 element按需导入
    plugins: [
    ],
    externals: externals// 打包排除的包
  },
  chainWebpack: config => {
    if (isProduction) {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
  }

})
