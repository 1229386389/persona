import Mock from 'mockjs'
import store from '@/store'
// import qs from 'qs'
Mock.setup({
  timeout: '500-600'
})
Mock.mock('/getAllUser', 'get', () => {
  return Mock.mock({
    msg: '请求成功',
    code: 200,
    users: store.state.userData.user
  })
})
// 更新
Mock.mock('/updateUser', 'post', (config) => {
  const queryObject = JSON.parse(config.body)
  if (!queryObject.id || !queryObject.account || !queryObject.nickname) {
    return Mock.mock({
      msg: '请填好必选项',
      code: 400
    })
  }
  store.state.userData.user.forEach(element => { // 更新用户数据
    if (element.profile.id === queryObject.id) {
      for (const key in element.profile) {
        element.profile[key] = queryObject[key]
      }
    }
  })
  return Mock.mock({
    msg: '请求成功',
    code: 200,
    users: store.state.userData.user
  })
})
// 注册新用户
Mock.mock('/pushUser', 'post', (config) => {
  const queryObject = JSON.parse(config.body)
  store.state.userData.user.push(queryObject)
  return Mock.mock({
    msg: '请求成功',
    code: 200
    // users: store.state.userData.user
  })
})
