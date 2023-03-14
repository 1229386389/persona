import request from '@/utils/request'
export const randomImage = () => {
  return request('random/image', 'get')
}
