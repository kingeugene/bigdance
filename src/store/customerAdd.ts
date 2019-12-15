import { Module } from 'vuex';
import api from "@/lib/api";
import timetable from "@/store/baseTable";
import router from "@/router";

interface customerAddState {
    email: string;
    first_name: string;
    middle_name: string;
    second_name: string;
    birth_date: string;
    sex: {
        label: string,
        code: string,
    };
    document_id: string;
    notes: string;
    switch_user: boolean;
    username: string;
    password: string;
    price:  string;
    phones: string;
    loading: boolean;
}

const module: Module<customerAddState, any> = {
    state: {
        email: "",
        first_name: "",
        middle_name: "",
        second_name: "",
        birth_date: "",
        sex: {
            label: "",
            code: "",
        },
        document_id: "",
        notes: "",
        switch_user: false,
        username: "",
        password: "",
        price:  "",
        phones: "",
        loading: false,
    },

    mutations: {
        setEmail(state, data) {
            state.email = data;
        },

        setFirstName(state, data) {
            state.first_name = data;
        },

        setMiddleName(state, data) {
            state.middle_name = data;
        },

        setSecondName(state, data) {
            state.second_name = data;
        },

        setBirthDate(state, data) {
            state.birth_date = data;
        },

        setSex(state, data) {
            state.sex = data;
        },

        setDocument(state, data) {
            state.document_id = data;
        },

        setNotes(state, data) {
            state.notes = data;
        },

        setSwitchUser(state, data) {
            state.switch_user = data;
        },

        setUsername(state, data) {
            state.username = data;
        },

        setPassword(state, data) {
            state.password = data;
        },

        setPrice(state, data) {
            state.price  = data;
        },

        setPhones(state, data) {
            state.phones = data;
        },

        setLoading(state, data) {
            state.loading = data;
        }
    },

    actions: {
        async submit({state, commit, dispatch}) {
            commit("setLoading", true);

            const {data, status} = await api.customerAdd({
                "account_id": 1,
                "email": state.email,
                "first_name": state.first_name,
                "middle_name": state.middle_name,
                "second_name": state.second_name,
                "birth_date": state.birth_date,
                "sex": state.sex.code,
                "document_id": state.document_id,
                "notes": state.notes,
                "switch_user": state.switch_user,
                "username": state.username,
                "password": state.password,
                "price":  state.price,
                "phones": (state.phones).split(" "),
            });

            if (status === 200) {
                await dispatch("allClients");
                router.push('/customers').catch(err => {});
            } else {
                alert("Данные введены не верно")
            }

            commit("setLoading", false);
        }
    }
};

export default module;
