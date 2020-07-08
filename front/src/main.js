import Vue from 'vue'
import App from './App.vue'

// VUETIFY
import vuetify from './plugins/vuetify'

// VUEX
import Vuex from 'vuex'

// LODASH
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// FONT AWESOME
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faSitemap,
  faBoxOpen,
  faHandPointer,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

// GOOGLE ADS
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

// VUE COOKIES
Vue.use(require('vue-cookies'))

library.add(faSitemap, faBoxOpen, faHandPointer, faExclamationTriangle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// name is optional
Vue.use(VueLodash, {
  name: 'custom',
  lodash: lodash
})

import {
  store
} from '@/store'

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')