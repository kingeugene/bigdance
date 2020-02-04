import { Module } from 'vuex';
import api from "@/lib/api";
import router from "@/router";
import {minInTime} from "@/store/baseCoach";

interface clientsState {
    loading: boolean;
    loadedComponentCustomer: boolean;
    showCustomer: Array<any>;
    recordCustomer: Array<any>;
    coachChoose: {code: string, label: string};
    dateTimeChoose: string;
}

const module: Module<clientsState, any> = {
    state: {
        loading: false,
        loadedComponentCustomer: false,
        showCustomer: [],
        recordCustomer: [],
        coachChoose: {
            code:"",
            label:"",
        },
        dateTimeChoose: "",
},

    mutations: {
        setLoading(state, data) {
            state.loading = data;
        },
        setShowCustomer(state, data) {
            state.showCustomer = data;
        },
        setRecordCustomer(state, data) {
            state.recordCustomer = data;
        },
        setCoachChoosePageCustomer(state, data) {
            state.coachChoose = data;
        },
        setDateTimeChoosePageCustomer(state, data) {
            state.dateTimeChoose = data;
        },
    },

    actions: {
        async getCustomer({commit, dispatch}, customer_id) {
            commit("setLoading", true);

            const {data, status} = await api.createClient(customer_id);

            if (status === 200) {
                commit("setShowCustomer", data);
            } else {
                alert("Тренер не загружен");
            }

            commit("setLoading", false);
        },

        async getRecordCustomer({commit, dispatch}, {date, coach, client }) {
            let dataRecord: any[] = [];
            commit("setLoading", true);

            const {data, status} = await api.listRecordCustomer({date, client, coach});

            if (status === 200) {
                for (let key in data) {
                    if (data[key].length) {
                        data[key].forEach((item: any) => {
                            dataRecord.push({
                                date: `${item.date} ${minInTime(item.start_time)}-${minInTime(item.end_time)}`,
                                coaches: item["coaches"].join(", "),
                                type: item.activity_type_name,
                                location: `${item.venue_name} ${item.venue_object_name}`,
                            });
                        });
                    }
                }

                commit("setRecordCustomer", dataRecord);
            } else {
                alert("Занятия не загружены");
            }

            commit("setLoading", false);
        },

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
            id_card,
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
                id_card,
                first_name,
                second_name,
                birth_date,
                sex: sex.code,
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
