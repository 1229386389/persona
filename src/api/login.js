import request from '@/utils/request'
// 登陆接口
export const login = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
