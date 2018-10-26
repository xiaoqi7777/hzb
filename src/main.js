// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'mint-ui/lib/style.css'  //0.5s
import './assets/css/reset.css' //0.5s
import axios from 'axios'
import { Button , TabContainer, TabContainerItem, Navbar, TabItem,  Swipe, SwipeItem, Loadmore, Spinner   } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner.name, Spinner);


Vue.config.productionTip = false
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
