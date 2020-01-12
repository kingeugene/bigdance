import { Module } from 'vuex';
import api from "@/lib/api";
import router from "@/router";

interface coachAddState {
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
    position: string;
    wage: string;
    price: string;
    phones: string;
    style_id: {
        id: number,
        account_id: number,
        "name": string,
    };
    availability: Array<{slot: string, from: string, to: string}>;
    activityStyle: [];
    loading: boolean;
    loadingStyle: boolean;
}

const module: Module<coachAddState, any> = {
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
        position: "",
        wage: "",
        phones: "",
        style_id: {
            "id": 1,
            "account_id": 1,
            "name": ""
        },
        availability: [],
        activityStyle: [],
        loading: false,
        loadingStyle: false,
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

        setLoading(state, data) {
            state.loading = data;
        },

        setLoadingStyle(state, data) {
            state.loadingStyle = data;
        },

        clearAll(state) {
            state.email = "";
            state.first_name = "";
            state.middle_name = "";
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

            const {data, status} = await api.coachAdd({
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
                "position": state.position,
                "wage": state.wage,
                "price":  state.price,
                "phones": (state.phones).split(" "),
                "style_id": state.style_id["id"],
                "availability": state.availability,
            });

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
            commit("setLoadingStyle", true);
        },
    }
};

export default module;
