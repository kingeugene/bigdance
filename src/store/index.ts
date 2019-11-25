import Vue from "vue";
import Vuex from "vuex";
import baseTable from "./baseTable";
import baseClients from "./baseClients";
import login from "./login";

Vue.use(Vuex);

export default new Vuex.Store<any>({
    modules: {
        baseTable,
        baseClients,
        login,
    },
});
