import request from '@/utils/request'
// 获取用户信息
export const getAllUser = () => {
  return request('/getAllUser', 'get')
}
// 更新信息
export const updateUser = (profile) => {
  return request('/updateUser', 'post', profile)
}
// 注册新用户
export const pushUser = (profile) => {
  return request('/pushUser', 'post', profile)
}
