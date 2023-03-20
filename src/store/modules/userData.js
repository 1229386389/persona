// 存储登陆用户手机密码
export default {
  namespaced: true,
  state () {
    return {
      // 用户列表
      user: [{
        password: '123456',
        id: '1',
        account: '15279194146',
        nickname: '斯大林的猫',
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        city: {
          name: '南昌',
          id: '101240101',
          lat: '28.67649',
          lon: '115.89215',
          adm2: '南昌',
          adm1: '江西省',
          country: '中国',
          tz: 'Asia/Shanghai',
          utcOffset: '+08:00',
          isDst: '0',
          type: 'city',
          rank: '11',
          fxLink: 'https://www.qweather.com/weather/nanchang-101240101.html'
        },
        sex: '男',
        info: '力摧敌阵,如视天光破云'
      }]
    }
  },
  mutations: {
  }
}
