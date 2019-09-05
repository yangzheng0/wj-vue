import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
  handleUserName: (state, username) => {
    state.username = username
    // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
    localStorage.setItem('username', username)
  }
}
const state = {
  username: '' || localStorage.getItem('username')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  userName: (state) => state.username
}

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export { store }
export default store
