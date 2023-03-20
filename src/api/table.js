import request from '@/utils/request'
// 和风天气key
const key = 'b4edd42d3e7e4387b86d2c508b8f6c80'
// 查询天气
export const findWeather = ({ location = '101010100', lang = 'zh' }) => {
  return request('https://devapi.qweather.com/v7/weather/7d', 'get', { location, key })
}
// 地址查询
export const findCity = ({ location }) => {
  return request('https://geoapi.qweather.com/v2/city/lookup', 'get', { location, key })
}
