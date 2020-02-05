import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
const axios = require('axios').default;

interface loginState {
    token: any,
    validLogin: string,
    status: boolean,
    loading: boolean,
}

const module: Module<loginState, any> = {
    state: {
        token: localStorage.getItem('user-token') || '',
        status: false,
        validLogin: "",
        loading: false,
    },

    getters: {
        isAuthenticated: state => !!state.token,
    },

    mutations: {
        changeValidLogin(state, status) {
            state.validLogin = status;
        },

        changeToken(state, data) {
          state.token = data;
        },
        auth_request: (state) => {
            state.status = true;
        },
        auth_succes: (state, token) => {
            state.status = false;
            state.token = token
        },
        auth_error: (state) => {
            state.status = true;
        },
    },

    actions: {
        async submitForm({commit, state}, body) {
            commit("auth_request");
            commit("setLoading", true);
            const { data, errors, status } = await api.login(body);

            if (errors) {
                localStorage.removeItem('user-token');

                commit("changeValidLogin", "Неправильные доступы");
                commit("auth_error");
                commit("setLoading", false);
                return;
            } else {
                const token = data.access_token;
                localStorage.setItem('user-token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                commit("changeValidLogin", "");
                commit("auth_succes", data.access_token);

                router.push('/').catch(err => {});
                commit("setLoading", false);
            }
        },
        async logout({commit, state}) {
            const response = await api.logout();

            if (response.status) {
                localStorage.removeItem('user-token');
                commit("changeToken", "");
                location.reload();
            } else {
                localStorage.removeItem('user-token');
                commit("changeToken", "");
                router.push('/login').catch(err => {});
            }
        }
    }
};

export default module;
