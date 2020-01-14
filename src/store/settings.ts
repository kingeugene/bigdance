import { Module } from 'vuex';
import api from "@/lib/api"
import router from "@/router";
const axios = require('axios').default;

interface settingsState {
    loadingVenue: boolean;
    loading: boolean;
}

const module: Module<settingsState, any> = {
    state: {
        loadingVenue: false,
        loading: false,
    },

    mutations: {
        setLoadingVenue(state, data) {
            state.loadingVenue = data;
        },

        setLoading(state, data) {
            state.loading = data;
        },
    },

    actions: {
        async venueCreate({state, commit, dispatch}, {name, location, color, start_time, end_time, interval, id}) {
            commit("setLoadingVenue", true);

            const {data, status} = await api.createVenue({name, location, color, start_time, end_time, interval, id});

            if (status === 200) {
                dispatch("listVenue");
            } else {
                alert("Студия не создана");
            }

            commit("setLoadingVenue", false);
        },

        async hallCreate({state, commit, dispatch}, {venue_id, name, id}) {
            commit("setLoadingVenue", true);
            const {data, status} = await api.createHall({venue_id, name, id});

            if (status === 200) {
                dispatch("listVenueObjectAll");
            } else {
                alert("Студия не создана");
            }

            commit("setLoadingVenue", false);
        },

        async styleDanceCreate({state, commit, dispatch}, {label, id}) {
            commit("setLoadingVenue", true);

            const {data, status} = await api.createStyleDance({label, id});

            if (status === 200) {
                dispatch("activityStyleTrain");
            } else {
                alert("стиль танца не создана");
            }

            commit("setLoadingVenue", false);
        },

        async typeDanceCreate({state, commit, dispatch}, {label, color, block, id}) {
            commit("setLoadingVenue", true);

            const {data, status} = await api.createTypeDance({label, color, block: parseInt(block), id});

            if (status === 200) {
                dispatch("activitiesType");
            } else {
                alert("Студия не создана");
            }

            commit("setLoadingVenue", false);
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
