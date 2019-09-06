import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import '../../static/font-awesome-4.7.0/css/font-awesome.min.css'

Vue.use(Router)
const routes = []
// 登录路由
routes.push(
  {
    path: '/',
    name: 'Login',
    component: () => import('@/components/Login')
  }
)
// 侧边栏菜单路由
routes.push({
  path: '/home',
  name: 'Home',
  component: Home,
  children: [
    {
      path: 'BasicLayout',
      name: 'BasicLayout',
      meta: {
        'index': '/home/BasicLayout',
        'title': '基本布局',
        'type': 'menu',
        'active': false
      },
      component: () => import(`@/components/BasicLayout`)
    },
    {
      path: 'BasicContainer',
      name: 'BasicContainer',
      meta: {
        'index': '/home/BasicContainer',
        'title': '基本容器',
        'type': 'menu',
        'active': false
      },
      component: () => import(`@/components/BasicContainer`)
    },
    {
      path: 'FormRadio',
      name: 'FormRadio',
      meta: {
        'index': '/home/FormRadio',
        'title': '单选按钮',
        'type': 'menu',
        'active': false
      },
      component: () => import(`@/components/FormRadio`)
    }
  ]
})
export default new Router({routes})
