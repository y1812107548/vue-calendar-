import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入echarts
import echarts from 'echarts'
import './directives'
import elDragDialog from './components/directive/index'
import FullCalendar from 'vue-fullcalendar'
Vue.use(FullCalendar)
// 挂载到原型上
Vue.prototype.echarts = echarts
Vue.use(elDragDialog);
Vue.use(ElementUI)

if (  window.location.href.indexOf('lock') >-1 ) {
  // router.beforeEach((to, from, next) => {
  // //   if (to.path === '/login') {
  // //     next()
  // //   } else {
  // //     next({path: '/lock'})
  // //   }
  //  })
}


// 路由守卫 拦截所有路由
// router.beforeEach((to, from, next) => {

//   // // 判断
//   // if (token) {   // 如果有token 
//   //   next() // 直接放行
//   // } else {
//   //   if (to.path === '/login') { // 如果去的是登录 直接放行
//   //     next() 
//   //   } else {
//   //     next({path: '/login'}) //  如果去的是其他页面，直接跳转到登录页面。
//   //   }
//   // }


// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
