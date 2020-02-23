import { Module } from 'vuex';
import api from "@/lib/api";
import router from "@/router";

interface coachAddState {
    email: string;
    first_name: string;
    second_name: string;
    photo: any;
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
    position: string;
    wage: string;
    price: string;
    phones: string;
    style_id: {
        id: number,
        account_id: number,
        "label": string,
    };
    availability: Array<{slot: string, from: string, to: string}>;
    activityStyle: [];
}

const module: Module<coachAddState, any> = {
    state: {
        email: "",
        first_name: "",
        second_name: "",
        photo: null,
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
        position: "",
        wage: "",
        phones: "",
        style_id: {
            "id": 1,
            "account_id": 1,
            "label": ""
        },
        availability: [],
        activityStyle: [],
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

        setPosition(state, data) {
            state.position = data;
        },

        setWage(state, data) {
            state.wage = data;
        },

        setPrice(state, data) {
            state.price = data;
        },

        setPhones(state, data) {
            state.phones = data;
        },

        setStyleId(state, data) {
            state.style_id = data;
        },

        setAvailability(state, data) {
            state.availability = data;
        },

        setActivityStyle(state, data) {
            state.activityStyle = data;
        },

        setPhoto(state, data) {
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
            state.position = "";
            state.wage = "";
            state.price = "";
            state.phones = "";
            state.availability = [];

        }
    },

    actions: {
        async submitTrainers({state, commit, dispatch}) {
            commit("setLoading", true);

            const formData = new FormData();

            formData.append("account_id",  "1");
            formData.append("id_card",  state.email);
            formData.append("first_name",  state.first_name);
            formData.append("second_name",  state.second_name);
            formData.append("photo",  state.photo);
            formData.append("sex",  state.sex.code);
            formData.append("document_id",  state.document_id);
            formData.append("notes",  state.notes);
            formData.append("switch_user",  Number(state.switch_user).toString());
            formData.append("username",  state.username);
            formData.append("password",  state.password);
            formData.append("position",  state.position);
            formData.append("wage",  state.wage);
            formData.append("price",  state.price);
            formData.append("phones",  JSON.stringify(state.phones.split(" ")));
            formData.append("availability",  state.availability.toString());
            formData.append("style_id",  state.style_id["id"].toString());

            const {data, status} = await api.coachAdd(formData);

            if (status === 200) {
                await dispatch("allCoach");
                commit("clearAll");
                router.push('/trainers').catch(err => {});
            } else {
                alert("Данные введены не верно")
            }

            commit("setLoading", false);
        },

        async activityStyleTrain({commit, state}) {
            commit("setLoading", true);

            const {data, status} = await api.activityStyle();

            if (status === 200) {
                commit("setActivityStyle", data);
            } else {
                alert("Стили танца не обнаружины, Ошибка");
            }

            commit("setLoading", false);
        },
    }
};

export default module;
