import Vue from "vue";
import Vuex from "vuex";
import baseTable from "./baseTable";

Vue.use(Vuex);

export default new Vuex.Store<any>({
    modules: {
        baseTable,
    },
});
