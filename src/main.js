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


let url = null 
if (process.env.NODE_ENV == 'development') {
  url = 'http://tsml520.cn'

}else {
  url = 'http://tsml520.cn' 
}
Vue.prototype.axio = axios.create({
  baseURL: url,
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
