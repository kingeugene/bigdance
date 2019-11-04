import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store/index';

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


const app = new Vue({
  router,
  store,
  render: (h) => h(App),
});

app.$mount('#app');
