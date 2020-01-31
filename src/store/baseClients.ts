import { Module } from 'vuex';
import api from "@/lib/api";
import router from "@/router";

interface clientsState {
    loading: boolean;
    loadedComponentCustomer: boolean;
}

const module: Module<clientsState, any> = {
    state: {
        loading: false,
        loadedComponentCustomer: false,
    },

    mutations: {
        setLoading(state, data) {
            state.loading = data;
        },
    },

    actions: {
        async customerDelete({commit, dispatch, state}, id: number) {
            commit("setLoading", true);

            const {data, status} = await api.customerDelete(id);

            if (status === 200) {
                await dispatch("allClients");
            } else {
                alert("Клиент не удален")
            }

            commit("setLoading", false);
        },

        async customerUpdate({commit, dispatch}, {
            id,
            email,
            first_name,
            second_name,
            birth_date,
            sex,
            document_id,
            notes,
            price,
            phones,
        }) {
            commit("setLoading", true);

            const {data, status} = await api.customerUpdate({
                id,
                email,
                first_name,
                second_name,
                birth_date,
                sex,
                document_id,
                notes,
                price,
                phones,
            });

            if (status === 200) {
                await dispatch("allClients");
            } else {
                alert("Пользователь не обнавлен")
            }

            commit("setLoading", false);
        }
    }
};

export default module;
