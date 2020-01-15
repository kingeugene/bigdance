import { Module } from 'vuex';
import api from "@/lib/api";
import router from "@/router";

interface coachState {
    loading: boolean;
    showCoach: Array<any>;
}

const module: Module<coachState, any> = {
    state: {
        loading: false,
        showCoach: [],
    },

    mutations: {
        setLoading(state, data) {
            state.loading = data;
        },

        setShowCoach(state, data) {
          state.showCoach = data;
        },
    },

    actions: {
        async getCoach({commit, dispatch}, coach_id) {
            commit("setLoading", true);

            const {data, status} = await api.showAllCoach(coach_id);

            if (status === 200) {

            } else {
                alert("Тренер не загружен");
            }

            commit("setLoading", false);
        },

        async coachDelete({commit, dispatch}, id: number) {
            commit("setLoading", true);

            const {data, status} = await api.coachDelete(id);

            if (status === 200) {
                await dispatch("allCoach");
            } else {
                alert("Тренер не удален")
            }

            commit("setLoading", false);
        },

        async coachUpdate({commit, dispatch}, {
            id,
            email,
            first_name,
            second_name,
            middle_name,
            birth_date,
            sex,
            document_id,
            notes,
            position,
            wage,
            price,
            style_id,
            phones,
            availability,
        }) {
            commit("setLoading", true);

            const {data, status} = await api.coachUpdate({
                id,
                email,
                first_name,
                second_name,
                middle_name,
                birth_date,
                sex,
                document_id,
                notes,
                position,
                wage,
                price,
                style_id,
                phones,
                availability,
            });

            if (status === 200) {
                await dispatch("allCoach");
            } else {
                alert("Тренер не обнавлен")
            }

            commit("setLoading", false);
        }
    }
};

export default module;
