import Vue from "vue";
import Vuex from "vuex";
import calendar from "./calendar";
import baseClients from "./baseClients";
import baseCoach from "./baseCoach";
import login from "./login";
import record from "./record";
import customerAdd from "./customerAdd";
import trainersAdd from "./trainersAdd";
import settings from "./settings";
import profile from "./profile";

Vue.use(Vuex);

export default new Vuex.Store<any>({
    modules: {
        calendar,
        baseClients,
        baseCoach,
        login,
        record,
        customerAdd,
        trainersAdd,
        settings,
        profile,
    },
});
