import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
const axios = require('axios').default;

interface recordState {
    chooseRecord: {},
}

const module: Module<recordState, any> = {
    state: {
        chooseRecord: {},
    },

    mutations: {
        setChooseRecord(state, data) {
            state.chooseRecord = data;
        },
    },

    actions: {
        async initChooseRecord({commit}, {date, time, venue_object_id}) {
            commit("setLoading", true);
            const {data, status} = await api.recordOne({date, time, venue_object_id});

            if (status === 200) {
                await commit("setChooseRecord", data[date]);
            } else {
                alert("Данные не загрузились!")
            }
            commit("setLoading", false);
        }
    }
};

export default module;