import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
const axios = require('axios').default;

interface settingsState {

}

const module: Module<settingsState, any> = {
    state: {

    },

    mutations: {

    },

    actions: {
        async venueCreate({state, commit, dispatch}, {name, location, color, start_time, end_time, interval, id}) {
            commit("setLoading", true);

            const {data, status} = await api.createVenue({name, location, color, start_time, end_time, interval, id});

            if (status === 200) {
                dispatch("listVenue");
            } else {
                alert("Студия не создана");
            }

            commit("setLoading", false);
        },

        async hallCreate({state, commit, dispatch}, {venue_id, name, id}) {
            commit("setLoading", true);
            const {data, status} = await api.createHall({venue_id, name, id});

            if (status === 200) {
                dispatch("listVenueObjectAll");
            } else {
                alert("Студия не создана");
            }

            commit("setLoading", false);
        },

        async styleDanceCreate({state, commit, dispatch}, {label, id}) {
            commit("setLoading", true);

            const {data, status} = await api.createStyleDance({label, id});

            if (status === 200) {
                dispatch("activityStyleTrain");
            } else {
                alert("стиль танца не создана");
            }

            commit("setLoading", false);
        },

        async typeDanceCreate({state, commit, dispatch}, {label, color, block, id}) {
            commit("setLoading", true);

            const {data, status} = await api.createTypeDance({label, color, block: parseInt(block), id});

            if (status === 200) {
                dispatch("activitiesType");
            } else {
                alert("Студия не создана");
            }

            commit("setLoading", false);
        },

        async venueDelete({state, commit, dispatch}, id) {
            commit("setLoading", true);

            const {data, status} = await api.deleteVenue(id);

            if (status === 200) {
                dispatch("listVenue");
            } else {
                alert("Студия не удалена");
            }

            commit("setLoading", false);
        },

        async hallDelete({state, commit, dispatch}, id) {
            commit("setLoading", true);

            const {data, status} = await api.deleteHall(id);

            if (status === 200) {
                dispatch("listVenueObjectAll");
            } else {
                alert("Зал не удален");
            }

            commit("setLoading", false);
        },

        async styleDanceDelete({state, commit, dispatch}, id) {
            commit("setLoading", true);

            const {data, status} = await api.deleteStyleDance(id);

            if (status === 200) {
                dispatch("activityStyleTrain");
            } else {
                alert("Стиль танца не удален");
            }

            commit("setLoading", false);
        },

        async typeDanceDelete({state, commit, dispatch}, id) {
            commit("setLoading", true);

            const {data, status} = await api.deleteTypeDance(id);

            if (status === 200) {
                dispatch("activitiesType");
            } else {
                alert("Тип занятия не удален");
            }

            commit("setLoading", false);
        },
    },
};

export default module;
