import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";

interface loginState {
    token: any,
    validLogin: string,
    status: string,
}

const module: Module<loginState, any> = {
    state: {
        token: localStorage.getItem('user-token') || '',
        status: '',
        validLogin: "",
    },

    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
    },

    mutations: {
        changeValidLogin(state, status) {
            state.validLogin = status;
        },

        auth__request: (state) => {
            state.status = 'loading'
        },
        auth_succes: (state, token) => {
            state.status = 'success'
            state.token = token
        },
        auth_error: (state) => {
            state.status = 'error'
        },
    },

    actions: {
        async submitForm({commit, state}, body) {
            commit("auth__request");
            const { data, errors, status } = await api.login(body);

            if (errors) {
                localStorage.removeItem('user-token');

                commit("changeValidLogin", "Неправильные доступы");
                commit("auth_error");
                return;
            } else {
                localStorage.setItem('user-token', data.access_token);

                commit("changeValidLogin", "");
                commit("auth_succes", data.access_token);

                router.push('/')
            }
        }
    }
};

export default module;
