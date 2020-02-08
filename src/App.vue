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

* {
    user-select: none;
}

input {
    outline:none;
}

input, input:before, input:after {
    -webkit-user-select: initial;
    -khtml-user-select: initial;
    -moz-user-select: initial;
    -ms-user-select: initial;
    user-select: initial;
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
