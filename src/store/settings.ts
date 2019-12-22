import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
const axios = require('axios').default;

interface settingsState {
    loadingVenue: boolean;
}

const module: Module<settingsState, any> = {
    state: {
        loadingVenue: false
    },

    mutations: {
        setLoadingVenue(state, data) {
            state.loadingVenue = data;
        }
    },

    actions: {
        async venueCreate({state, commit}, {name, location, color, start_time, end_time, interval}) {
            console.error("test");
            commit("setLoadingVenue", true);
            const {data, status} = await api.createVenue({name, location, color, start_time, end_time, interval});

            if (status === 200) {
                commit("setListVenueObject", data);
            } else {
                alert("Студия не создана");
            }

            commit("setLoadingVenue", true);
        }
    }

};

export default module;
