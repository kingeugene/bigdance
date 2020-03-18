import { Module } from 'vuex';
import api from "@/lib/api";
import timetable from "@/store/baseTable";
import router from "@/router";

interface customerAddState {
    email: string;
    first_name: string;
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
    photo: any;
}

const module: Module<customerAddState, any> = {
    state: {
        email: "",
        first_name: "",
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
        photo: null,
    },

    mutations: {
        setEmail(state, data) {
            state.email = data;
        },

        setFirstName(state, data) {
            state.first_name = data;
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

        setPhotoCustomer(state, data) {
            state.photo = data;
        },

        clearAll(state) {
            state.email = "";
            state.first_name = "";
            state.second_name = "";
            state.birth_date = "";
            state.document_id = "";
            state.notes = "";
            state.username = "";
            state.password = "";
            state.price = "";
            state.phones = "";
        }
    },

    actions: {
        async submit({state, commit, dispatch}) {
            commit("setLoading", true);

            const formData = new FormData();

            formData.append("account_id",  "1");
            formData.append("id_card",  state.email);
            formData.append("first_name",  state.first_name);
            formData.append("second_name",  state.second_name);
            formData.append("photo",  state.photo);
            formData.append("birth_date", state.birth_date);
            formData.append("sex",  state.sex.code);
            formData.append("document_id",  state.document_id);
            formData.append("notes",  state.notes);
            formData.append("switch_user",  Number(state.switch_user).toString());
            formData.append("username", state.username,);
            formData.append("password", state.password);
            formData.append("price",  state.price);
            formData.append("phones",  JSON.stringify(state.phones.split(" ")));

            const {data, status} = await api.customerAdd(formData);

            if (status === 200) {
                await dispatch("allClients");
                commit("clearAll");
                router.push('/customers').catch(err => {});
            } else {
                alert("Данные введены не верно")
            }

            commit("setLoading", false);
        }
    }
};

export default module;
