import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
const axios = require('axios').default;

interface profileState {
    loading: boolean;
}

const module: Module<profileState, any> = {
    state: {
        loading: false,
    },

    mutations: {
        setLoading: (state, data) => {
            state.loading = data;
        },
    },
};

export default module;
