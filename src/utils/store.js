import Vue from 'vue'
import Vuex from 'vuex'
import { findIndex } from './utils'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    navTags: [],
    isNavMenuOpen: true,
    username: '' || localStorage.getItem('username')
  },
  getters: {
    userName: (state) => state.username,
    activeTag (state) {
      let tag = state.navTags.find((item) => {
        return item.active === true
      })
      return tag ? tag.index : ''
    },
    navTagIndexs (state) {
      return state.navTags.map((item) => {
        return item.index
      })
    }
  },
  mutations: {
    handleUserName: (state, username) => {
      state.username = username
      // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      localStorage.setItem('username', username)
    },
    toggleMenuOpen (state, payload) {
      state.isNavMenuOpen = !state.isNavMenuOpen
    },
    addNavTags (state, view) {
      let index = findIndex(state.navTags, 'index', view.meta.index)

      state.navTags.forEach((item) => {
        item.active = false
      })

      if (index === -1) {
        state.navTags.push({
          index: view.meta.index,
          title: view.meta.title,
          active: true
        })
      } else {
        state.navTags[index].active = true
      }
    },
    removeOneNavTag (state, payload) {
      let index = state.navTags.findIndex((item) => {
        return item.index === payload.index
      })
      if (index === -1) {
        return
      }
      state.navTags.splice(index, 1)
    }
  },
  actions: {
    addNavTags ({ state, commit }, view) {
      commit('addNavTags', view)
    },
    removeOneNavTag ({ state, commit }, payload) {
      commit('removeOneNavTag', payload)
    }
  }
})
