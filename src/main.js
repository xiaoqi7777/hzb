// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/reset.css'
import axios from 'axios'
import "video.js/dist/video-js.css";





// import v1 from './test1/a'
// v1();





Vue.use(Mint)

Vue.config.productionTip = false
console.log('123')
let url = 'http://tsml520.cn' 
// if (process.env.NODE_ENV == 'development') {
//   url = 'http://tsml520.cn'

// }else {
//   url = 'http://tsml520.cn' 
// }
Vue.prototype.axio = axios
Vue.prototype.axio = axios.create({
  baseURL: url,
})

Vue.filter('formatDate',function (val) {
  // let a = 2018 10 11/ 13/31/06
  let Y = val.substr(0,4)
  let M = val.substr(4,2)
  let d = val.substr(6,2)
  let h = val.substr(8,2)
  let m = val.substr(10,2)
  let s = val.substr(12,2)
  console.log(val,Y,M,d,h,m,s)
  return  `${M}-${d} ${h}:${m}`
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
