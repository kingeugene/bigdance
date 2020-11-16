<template lang="pug">
layout
  router-view
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Layout from "@/components/base/BaseLayout.vue";
import {Action} from "vuex-class";
const axios = require('axios').default;


@Component({
  components: {
    Layout,
  },
})
export default class App extends Vue {
    @Action logout!: () => void;

    created() {
        let currentThis = this;

        axios.interceptors.response.use(undefined, function (err: any) {
            return new Promise(function (resolve, reject) {
                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    currentThis.logout();
                }
                throw err;
            });
        });
    }
}
</script>

<style lang="scss">

input, input:before, input:after,
select, select:before, select:after,
textarea, textarea:before, textarea:after {
    -webkit-user-select: initial;
    -khtml-user-select: initial;
    -moz-user-select: initial;
    -ms-user-select: initial;
    user-select: initial;
}

input, textarea {
    width: 100%;
    height: 34px;
    padding: 0 8px 4px;
    background: none;
    border: 1px solid rgba(60,60,60,.26);
    border-radius: 4px;
    white-space: normal;
}

.close-modal {
    font-size: 40px;
    position: absolute;
    right: 20px;
    top: -11px;
    transform: rotate(45deg);
    cursor: pointer;
}

.vgt-table {
    min-width: 600px;
}

.v--modal-box {
    overflow: auto !important;
}

#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
