import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
const axios = require('axios').default;

interface recordState {
    chooseRecord: {},
    recordLoading: boolean,
}

const module: Module<recordState, any> = {
    state: {
        chooseRecord: {},
        recordLoading: false,
    },

    getters: {

    },

    mutations: {
        setChooseRecord(state, data) {
            state.chooseRecord = data;
        },

        setRecordLoading(state, data) {
            state.recordLoading = data;
        }
    },

    actions: {
        async initChooseRecord({commit}, id) {
            commit("setRecordLoading", true);
            const {data, status} = await api.recordOne(id);

            if (status === 200) {
                await commit("setChooseRecord", data.record);
            } else {
                alert("Данные не загрузились!")
            }
            commit("setRecordLoading", false);
        }
    }
};

export default module;
