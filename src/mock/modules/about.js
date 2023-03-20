import Mock from 'mockjs'
// import qs from 'qs'
Mock.setup({
  timeout: '500-600'
})
Mock.mock('random/image', 'get', () => {
  return Mock.mock({
    msg: '请求图片成功',
    code: 200,
    'item|10': [
      {
        id: '@id',
        src: '@dataImage'
      }
    ]
  })
})
