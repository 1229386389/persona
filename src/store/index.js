import { createStore } from 'vuex'
import user from './modules/user'
import userData from './modules/userData'
import createPersistedstate from 'vuex-persistedstate'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    userData
  },
  // 使用持久化插件使得数据刷新后不会丢失
  plugins: [createPersistedstate()]
})
