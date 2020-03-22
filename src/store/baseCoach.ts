import { Module } from 'vuex';
import api from "@/lib/api";
import router from "@/router";

interface coachState {
    showCoach: Array<any>;
    customerChoose: {code: string, label: string};
    recordCoach: Array<any>;
    dateTimeChoose: string;
}

const module: Module<coachState, any> = {
    state: {
        showCoach: [],
        recordCoach: [],
        customerChoose: {
            code:"",
            label:"",
        },
        dateTimeChoose: "",
    },

    mutations: {
        setShowCoach(state, data) {
          state.showCoach = data;
        },

        setRecordCoach(state, data) {
            state.recordCoach = data;
        },
        setCustomerChoosePageCoach(state, data) {
            state.customerChoose = data;
        },
        setDateTimeChoosePageCoach(state, data) {
            state.dateTimeChoose = data;
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

        async getRecordCoach({commit, dispatch}, {date, coach, client }) {
            let dataRecord: any[] = [];
            commit("setLoading", true);

            const {data, status} = await api.listRecordCoach({date, coach, client});

            if (status === 200) {
                for (let key in data) {
                    if (data[key].length) {
                        data[key].forEach((item: any) => {
                            let clients: string[] = [];
                            let clientsId: string[] = [];

                            for (let indexClients in item["clients"]) {
                                clients.push(item["clients"][indexClients].full_name);
                                clientsId.push(item["clients"][indexClients].id);
                            }

                            dataRecord.push({
                                date: `${item.date} ${minInTime(item.start_time)}-${minInTime(item.end_time)}`,
                                clients: clients.join(", "),
                                clientsId,
                                type: item.activity_type_name,
                                location: `${item.venue_name} ${item.venue_object_name}`,
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
            style,
            phones,
            availability,
            photo,
            username,
            password,
        }) {
            commit("setLoading", true);

            const formData = new FormData();

            formData.append("account_id",  "1");
            formData.append("id_card",  id_card);
            formData.append("first_name",  first_name);
            formData.append("second_name",  second_name);
            formData.append("birth_date",  birth_date);
            formData.append("photo",  photo);
            formData.append("sex",  sex.code);
            formData.append("document_id",  document_id);
            formData.append("notes",  notes);
            formData.append("position",  position);
            formData.append("wage",  wage);
            formData.append("price",  price);
            formData.append("phones",  JSON.stringify(phones));
            formData.append("availability",  JSON.stringify(availability));
            formData.append("style_id",  style["id"].toString());

            if (username && password) {
                formData.append("username",  username);
                formData.append("password",  password);
            }

            const {data, status} = await api.coachUpdate(formData, person_id);

            if (status === 200) {
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
