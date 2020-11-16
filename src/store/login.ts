import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
import {createForm, email, maxLength, password, required} from "@/store/lib/vuex-form";
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
        async submitForm({commit, getters}) {
            commit("auth_request");
            commit("setLoading", true);

            let { name, password } = getters["loginForm/allFields"];
            const { data, errors } = await api.login({name, password});

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
    },
    modules: {
        loginForm: createForm("loginForm", {
            fields: {
                name: {
                    type: String,
                    validators: [
                        required(),
                        maxLength(255),
                    ]
                },
                password: {
                    type: String,
                    validators: [
                        required(),
                    ],
                },
            },
            onSubmit({dispatch}) {
                dispatch("submitForm", {}, { root: true });
            }
        })
    }
};



export default module;
