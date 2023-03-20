import request from '@/utils/request'
// 随机图片
export const randomImage = () => {
  return request('random/image', 'get')
}
