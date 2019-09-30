import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import VueWait from 'vue-wait';
import { Plugin } from 'vue-fragment';
import Web3Check, { ACTIONS } from 'vue-web3-check';
import App from './App.vue';
import config from './config';
import messages from './messages';
import router from './router';
import store from './store';
import LinkExplorer from './components/common/LinkExplorer';
import * as filters from './utils/filters';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(Plugin);
Vue.use(VueWait);
Vue.component('LinkExplorer', LinkExplorer);
Vue.filter('fromWei', filters.fromWei);
Vue.filter('urlExplorer', filters.urlExplorer);
Vue.filter('urlIpfs', filters.urlIpfs);

let lang = window.localStorage.lang || 'en';
const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: 'en',
  messages
});

Web3Check.store.on('update', data => {
  if (
    (data.state.old.account !== null && data.action === ACTIONS.UPD_ACCOUNT) ||
    (data.state.old.networkId !== null &&
      data.action === ACTIONS.UPD_NETWORK_ID)
  ) {
    window.location.reload(false);
  }
});
Vue.use(Web3Check, {
  Web3: Web3,
  networks: config.CHAINS,
  requireAccount: true
});

new Vue({
  router,
  store,
  i18n,
  wait: new VueWait(),
  render: h => h(App)
}).$mount('#app');
