// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import './responsive.js'
if (process.env.NODE_ENV === 'production') {
  require('./touch-simulator.js')
}
import Vue from 'vue'
import App from './App'
import router from './router'

import Demo from './routers/demo'
import DemoTitle from './routers/demoTitle'

import Neon from '@/index.js'
import { sqInput } from '@/directives'

Vue.use(Neon)
Vue.use(sqInput)
Vue.component(Demo.name, Demo)
Vue.component(DemoTitle.name, DemoTitle)

import Filter from './filter'

Filter(Vue)
Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
