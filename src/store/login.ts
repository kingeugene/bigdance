import { Module } from 'vuex';
import api from "@/lib/api"

interface loginState {

}

const module: Module<loginState, any> = {
    state: {

    },

    mutations: {

    },

    actions: {
        async submitL({commit, state}, body) {
            console.log("sdasda");
            const { response, errors, status } = await api.login(body);
        }
    }
};

export default module;
