// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/reset.css'
import axios from 'axios'






// import v1 from './test1/a'

// v1();



Vue.use(Mint)

Vue.config.productionTip = false

Vue.prototype.$axio = axios



// http().get('/').then(data=>{
//   console.log('111',data)
// })

// http().post('/app/getActivityPlayUrl').then((data)=>{
//   console.log('---1')
// },(data)=>{
//   console.log('---2',data)
// })


// let url = 'http://access.hezhibo.com:8008/bpc/api/app/getActivityPlayUrl'
// Vue.prototype.ax = axios.create({
//   baseURL: url,
// })



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
