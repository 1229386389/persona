import Mock from 'mockjs'
import store from '@/store'
Mock.setup({
  timeout: '500-600'
})
Mock.mock('/login', 'post', (options) => {
  // 获取查询参数 get使用正则截取 post使用body(json格式)
  const queryObject = JSON.parse(options.body)
  const result = store.state.userData.user.find((item) => { // 使用store代替数据库实现简单登陆界面
    return item.account === queryObject.account && item.password === queryObject.password
  })
  if (result) {
    return Mock.mock({
      msg: '登陆成功',
      code: 200,
      profile: { ...result, token: '@word' }
    })
  } else {
    return Mock.mock({
      msg: '密码错误',
      code: 400
    })
  }
})
