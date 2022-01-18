import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import insureinfo from '../views/insureInfo/index.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/insureinfo', name: 'insureInfo', component: insureinfo},
  {path: '*',redirect: "/insureinfo"},
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  
]

const router = new VueRouter({
  routes
})

export default router
