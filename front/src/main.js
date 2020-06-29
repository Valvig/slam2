import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuex from 'vuex'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
 
// name is optional
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

import { store } from '@/store'

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')