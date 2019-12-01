import Vue from 'vue';

import App from './App.vue';
import router from './router';
const axios = require('axios').default;
import store from './store/index';

const token = localStorage.getItem('user-token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

Vue.config.productionTip = false;

import vClickOutside from 'v-click-outside';
import vSelect from 'vue-select';
import "vue-select/src/scss/vue-select.scss";
import VModal from 'vue-js-modal';
import VueTheMask from 'vue-the-mask';

Vue.use(VueTheMask);
Vue.use(vClickOutside);
Vue.use(VModal, {componentName: "vmodal" });

Vue.component('v-select', vSelect);

import loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(loading);

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

app.$mount('#app');
