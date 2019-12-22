import Vue from "vue";
import Vuex from "vuex";
import baseTable from "./baseTable";
import baseClients from "./baseClients";
import baseCoach from "./baseCoach";
import login from "./login";
import record from "./record";
import customerAdd from "./customerAdd";
import trainersAdd from "./trainersAdd";
import settings from "./settings";

Vue.use(Vuex);

export default new Vuex.Store<any>({
    modules: {
        baseTable,
        baseClients,
        baseCoach,
        login,
        record,
        customerAdd,
        trainersAdd,
        settings,
    },
});
