import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/User.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/login' },
    { path: '/home', component: Home, redirect: '/welcome', children: [{ path: '/welcome', component: Welcome }, { path: '/users', component: Users }, { path: '/rights', component: Rights }, { path: '/roles', component: Roles }, { path: '/categories', component: Cate }, { path: '/params', component: Params }] }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tonkenStr = window.sessionStorage.getItem('token')
  if (!tonkenStr) return next('/login')
  next()
})
export default router
