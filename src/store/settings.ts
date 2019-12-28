import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
const axios = require('axios').default;

interface settingsState {
    loadingVenue: boolean;
}

const module: Module<settingsState, any> = {
    state: {
        loadingVenue: false,
    },

    mutations: {
        setLoadingVenue(state, data) {
            state.loadingVenue = data;
        },
    },

    actions: {
        async venueCreate({state, commit, dispatch}, {name, location, color, start_time, end_time, interval}) {
            commit("setLoadingVenue", true);
            const {data, status} = await api.createVenue({name, location, color, start_time, end_time, interval});

            if (status === 200) {
                dispatch("listVenue");
            } else {
                alert("Студия не создана");
            }

            commit("setLoadingVenue", false);
        },

        async hallCreate({state, commit, dispatch}, {venue_id, name}) {
            commit("setLoadingVenue", true);
            const {data, status} = await api.createHall({venue_id, name});

            if (status === 200) {
                dispatch("listVenueObject");
            } else {
                alert("Студия не создана");
            }

            commit("setLoadingVenue", false);
        },

        async styleDanceCreate({state, commit, dispatch}, {name}) {
            commit("setLoadingVenue", true);

            const {data, status} = await api.createStyleDance({name});

            // if (status === 200) {
            //
            // } else {
            //     alert("Студия не создана");
            // }

            commit("setLoadingVenue", false);
        },

        async typeDanceCreate({state, commit, dispatch}, {name, color, block}) {
            commit("setLoadingVenue", true);

            const {data, status} = await api.createTypeDance({name, color, block: parseInt(block)});

            if (status === 200) {
                dispatch("activitiesType");
            } else {
                alert("Студия не создана");
            }

            commit("setLoadingVenue", false);
        },
    },

};

export default module;
