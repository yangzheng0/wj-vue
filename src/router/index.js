import Vue from 'vue'
import Router from 'vue-router'
import menus from '../../config/menu-config'
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
// 侧边栏二级菜单路由
let LayoutChildren = []
menus.forEach((item) => {
  item.sub.forEach((cell) => {
    LayoutChildren.push({
      path: cell.name,
      name: cell.name,
      meta: cell.meta,
      component: () => import(`@/components/${cell.name}`)
    })
  })
})
// 侧边栏菜单路由
routes.push({
  path: '/home',
  name: 'Home',
  component: Home,
  children: LayoutChildren
})
export default new Router({routes})
