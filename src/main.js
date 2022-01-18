import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 引入vant
// import Vant from 'vant'
// 引入vant相关css样式
// import 'vant/lib/index.css'

// 注册

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
