import { Module } from 'vuex';
import api from "@/lib/api";
import router from "@/router";

interface coachState {
    loading: boolean;
}

const module: Module<coachState, any> = {
    state: {
        loading: false,
    },

    mutations: {
        setLoading(state, data) {
            state.loading = data;
        },
    },

    actions: {
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
