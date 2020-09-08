import Vue from 'vue'

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

import Router from 'vue-router'

Vue.use(Router)

import App from './App'
import Tactip from '@/pages/tactip.vue'
import riot from '@/pages/riot.vue'
import whatIsTactip from '@/pages/whatIsTactip.vue'
import home from '@/pages/homePage.vue'
import contact from '@/pages/contact.vue'
import notFound from '@/pages/notFound.vue'
import privacy from '@/pages/privacy.vue'

const routes = [{
    path: '/tactip',
    name: 'tactip',
    component: Tactip
  },
  {
    path: '/riot.txt',
    name: 'riot',
    component: riot
  },
  {
    path: '/whatIsTactip',
    name: 'whatIsTactip',
    component: whatIsTactip
  },
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: privacy
  },
  {
    path: '*',
    name: 'notFound',
    component: notFound
  }
]

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

new Vue({
  el: '#app',
  vuetify,
  store,
  router,
  render: h => h(App)
})