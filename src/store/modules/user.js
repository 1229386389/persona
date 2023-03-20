import { ElMessage } from 'element-plus'
// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        password: '',
        id: '',
        account: '',
        nickname: '',
        avatar: '',
        city: {
        },
        sex: '',
        info: '',
        token: ''
      },
      redirectUrl: '/' // 回跳地址
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    },
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    },
    loginout (state) {
      // 清空信息
      state.profile = { }
      ElMessage('已退出登陆')
    }
  }
}
