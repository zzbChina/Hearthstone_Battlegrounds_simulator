import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // $mount和Vue的el配置项一样的作用
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
