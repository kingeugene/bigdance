import { Module } from 'vuex';
import api from "@/lib/api";
import router from "@/router";

interface coachState {
    loading: boolean;
    showCoach: Array<any>;
    recordCoach: Array<any>;
}

const module: Module<coachState, any> = {
    state: {
        loading: false,
        showCoach: [],
        recordCoach: [],
    },

    mutations: {
        setLoading(state, data) {
            state.loading = data;
        },

        setShowCoach(state, data) {
          state.showCoach = data;
        },

        setRecordCoach(state, data) {
            state.recordCoach = data;
        },
    },

    actions: {
        async getCoach({commit, dispatch}, coach_id) {
            commit("setLoading", true);

            const {data, status} = await api.showAllCoach(coach_id);

            if (status === 200) {
                commit("setShowCoach", data);
            } else {
                alert("Тренер не загружен");
            }

            commit("setLoading", false);
        },

        async getRecordCoach({commit, dispatch}, coach_id) {
            let dataRecord: any[] = [];
            commit("setLoading", true);

            const {data, status} = await api.listRecordCoach({coach: coach_id});

            if (status === 200) {
                for (let key in data) {
                    if (data[key].length) {
                        data[key].forEach((item: any) => {
                            dataRecord.push({
                                date: `${item.date} ${minInTime(item.start_time)}-${minInTime(item.end_time)}`,
                                coaches: item["coaches"].join(", "),
                                type: item.color,
                                location: item.venue_object_id,
                            });
                        });
                    }
                }

                commit("setRecordCoach", dataRecord);
            } else {
                alert("Занятия не загружены");
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
            person_id,
            id_card,
            first_name,
            second_name,
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

            const {data, error} = await api.coachUpdate({
                person_id,
                id_card,
                first_name,
                second_name,
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

            if (!error) {
                await dispatch("allCoach");
            } else {
                alert("Тренер не обнавлен");
            }

            commit("setLoading", false);
        }
    }
};

export function minInTime(time: number): string {
    let mins: number | string = time % 60,
        hours: number | string  = (time - mins) / 60;

    if (mins < 10)  mins = '0' + mins;
    if (hours < 10) hours = '0' + hours;

    return  hours + ':' + mins;
}



export default module;
