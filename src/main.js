import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import vuelazyload from 'vue-lazyload'
import store from './store'
import fastclick from 'fastclick'
// import ElementUI from 'element-ui'
// import "element-ui/lib/theme-chalk/index.css"
import 'common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(vuelazyload, {
	loading: require('common/image/default.png')
})
// Vue.use(ElementUI)

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
