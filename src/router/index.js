import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import MyEasyUI from '@/components/MyEasyUI'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/MyEasyUI',
      name: 'MyEasyUI',
      component: MyEasyUI
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
