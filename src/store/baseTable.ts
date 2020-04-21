import { Module } from 'vuex';
import api from "@/lib/api"

interface baseTableState {
    show: boolean;
    account_id: number;
    currentDate: string;
    currentVenueColor: number;
    currentVenue: number;
    currentColor: string;
    listVenue: [];
    listVenueObject: [];
    listVenueObjectAll: [];
    activitiesType: [];
    allClients: [];
    customers: [];
    allCoach: [];
    coach: [];
    dateArr: string[];
    idItem: number[];
    listRecord: any;
    dataTable: any;
    dataItem: [];
    dateTimeChoose: string;
    coachChoose: {code: string, label: string};
    customerChoose: {code: string, label: string};
    isMobileChoose: number;
    recordActivityType: {
        account_id: number,
        block: number,
        color: string,
        id: number,
        name: string,
    };
    recordHall: {id: number, name: string};
    recordColor: string;
    recordDate: string;
    recordStartTime: string;
    recordEndTime: string;
    recordStatus: string;
    recordCancelledAt: string;
    recordCoaches: {code?: string, label?: string}[];
    recordClients: {code?: string, label?: string}[];
    weeks: number;
    descriptionRecord: string,
    loadedInit: boolean;
    settingsVenue: {};
    week_day: string;
    role: string;

}

const module: Module<baseTableState, any> = {
    state: {
        show: true,
        account_id: 1,
        currentDate: "",
        currentVenue: 1,
        currentVenueColor: 0,
        dateTimeChoose: "",
        coachChoose: {
            code:"",
            label:"",
        },
        customerChoose: {
            code:"",
            label:"",
        },
        isMobileChoose: 0,
        currentColor: "#2f628e",
        listVenue: [],
        listVenueObject: [],
        listVenueObjectAll: [],
        activitiesType: [],
        allClients: [],
        customers: [],
        allCoach: [],
        coach: [],
        loadedInit: false,
        dataTable: {},
        dateArr: [],
        idItem: [],
        listRecord: {},
        dataItem: [],
        recordDate: "",
        recordColor: "#DC4141",
        recordStartTime: "",
        recordEndTime: "",
        recordStatus: "",
        recordCancelledAt: "",
        recordCoaches: [],
        recordClients: [],
        recordActivityType: {
            account_id: 0,
            block: 0,
            color: "",
            id: 0,
            name: "",
        },
        recordHall: {
            id: 0,
            name: "",
        },
        weeks: 1,
        descriptionRecord: "",
        settingsVenue: {},
        week_day: "Понедельник",
        role: "",
},

    mutations: {
        setCurrentDate(state, data) {
            state.currentDate = data
        },

        setAllDataItem(state, data) {
            state.dateArr = data.dateArr;
            state.dataItem = data.dataItem;
        },

        setDateTimeChoose(state, data) {
            state.dateTimeChoose = data;
        },

        setCurrentVenueColor(state, data) {
          state.currentVenueColor = data;
        },

        setCoachChoose(state, data) {
            state.coachChoose = data;
        },

        setCustomerChoose(state, data) {
            state.customerChoose = data;
        },

        setCurrentVenue(state, data) {
            state.currentVenue = data;
        },

        setShow(state) {
            state.show = !state.show;
        },

        setDataTable(state, {data, id}) {
            state.dataTable[id] = data;
        },

        setListVenue(state, data) {
            state.listVenue = data;
        },

        setListVenueObject(state, data) {
            state.listVenueObject = data;
        },

        setListVenueObjectAll(state, data) {
            state.listVenueObjectAll = data;
        },

        setActivitiesType(state, data) {
            state.activitiesType = data;
        },

        setAllClients(state, data) {
            state.allClients = data;
        },

        setCustomers(state, data) {
            state.customers = data;
        },

        setAllCoach(state, data) {
            state.allCoach = data;
        },

        setCoach(state, data) {
            state.coach = data;
        },

        setLoadedInit(state, data) {
            state.loadedInit = data;
        },

        setListRecord(state, data) {
            state.listRecord = data;
        },

        setRecordDate(state, data) {
            state.recordDate = data;
        },

        setRecordStartTime(state, data) {
            state.recordStartTime = data;
        },

        setRecordEndTime(state, data) {
            state.recordEndTime = data;
        },

        setRecordCoaches(state, data) {
            state.recordCoaches = data;
        },

        setRecordClients(state, data) {
            state.recordClients = data;
        },

        setRecordActivityType(state, data) {
            state.recordActivityType = data;
        },

        setRecordHall(state, data) {
            state.recordHall = data;
        },

        setWeeks(state, data) {
            state.weeks = data;
        },

        setDescriptionRecord(state, data) {
            state.descriptionRecord = data;
        },

        setSettingsVenue(state, data) {
            state.settingsVenue = data;
        },

        setIsMobileChoose(state, data) {
            state.isMobileChoose = data;
        },

        setWeek_day(state, data) {
            state.week_day = data;
        },

        setRole(state, data) {
            state.role = data;
        },
    },

    actions: {
        async recordCopy({state, commit, dispatch}, id) {
            commit("setLoading", true);

            const {data, status} = await api.copyRecord(id);

            if (status !== 200 || data.status !== 'ok') {
                alert("В связи с ограничениями, невозможно скопировать запись на данное время")
            }

            commit("setLoading", false);
        },

        async createRecord({state, commit, dispatch}, {venue_object_id, activity_id, coaches, clients, number_weeks, description, edit})  {
            commit("setLoading", true);

            const color = state.currentColor,
                start_time = `${state.recordDate} ${state.recordStartTime}:00`,
                end_time = `${state.recordDate} ${state.recordEndTime}:00`,
                status_record = "confirmed",
                cancelled_at = "";

            const {data, status, errors} = await api.createRecord({venue_object_id, activity_id, color, start_time, end_time, status_record, cancelled_at, coaches, clients, number_weeks, description, edit });

            if (status === 200 && data.status !== "error") {
                dispatch("getListRecord", {venue_id: state.currentVenue, date: state.dateTimeChoose, coach: state.coachChoose.code, client: state.customerChoose.code, mobile: null,});
            } else {
                alert("В связи с ограничениями, невозможно создать запись на данное время")
            }

            commit("setLoading", false);
        },

        async deleteRecord({state, commit, dispatch}, id)  {
            commit("setLoading", true);

            const {data, status} = await api.deleteRecord(id);

            if (status === 200) {
                dispatch("getListRecord", {venue_id: state.currentVenue, date: state.dateTimeChoose, coach: state.coachChoose.code, client: state.customerChoose.code, mobile: null,});
            }

            commit("setLoading", false);
        },

        currentDate({commit}) {
            let dateObj = new Date(),
                year = dateObj.getFullYear(),
                month: string = dateObj.getMonth().toString(),
                day = dateObj.getDay().toString();

            if (month.length === 1) {
                month = "0" + month;
            }

            if (day.length === 1) {
                day = "0" + day;
            }

            commit("setCurrentDate", `${year}-${month}-${day}`);
        },

        async initBaseTable({dispatch, commit, state}) {
            commit("setLoadedInit", false);
            commit("setLoading", true);

            if (window.innerWidth < 768) {
                commit("setIsMobileChoose", 1);
            }

            await Promise.all([
                dispatch("listVenue"),
                dispatch("getUserInfo"),
            ]);

            await Promise.all([
                dispatch("listVenueObject"),
                dispatch("activitiesType"),
                dispatch("allClients"),
                dispatch("allCoach"),
                dispatch("listVenueObjectAll"),
                dispatch("activityStyleTrain"),
                dispatch("getListRecord", {venue_id: state.currentVenue, date: state.dateTimeChoose, coach: state.coachChoose.code, client: state.customerChoose.code}),
            ]);

            commit("setLoading", false);
            commit("setLoadedInit", true);
        },

//GET
        async getListRecord({commit, state, dispatch}, {venue_id, date, coach, client, slide = ""}) {
            commit("setLoading", true);

            const {data, status} = await api.listRecord({venue_id, date, coach, client, mobile: state.isMobileChoose, slide});

            if (status === 200) {
                await commit("setListRecord", data);
                dispatch("dataForItem");
            } else {
                alert("Данные не загрузились!")
            }

            commit("setLoading", false);
        },

        async getUserInfo({commit}) {
            commit("setLoading", true);

            const {data, status} = await api.userSettings();

            if (status === 200) {
                commit("setRole", data.role);
            } else {
                alert("Данные не загрузились!")
            }

            commit("setLoading", false);
        },

        dataForItem({commit, state}) {
            commit("setLoading", true);
            const dataTable = state.listRecord,
                dateArr: string[] = [],
                dataItem: any = [];

            for (let key in dataTable) {
                dateArr.push(key);

                if (dataTable[key][0]) {
                    commit("setWeek_day", dataTable[key][0].week_day);
                } else {
                    commit("setWeek_day", "");
                }

                for (let indexItem = 0; indexItem < dataTable[key].length; indexItem++)  {


                    const venueID = dataTable[key][indexItem]["venue_object_id"],
                        tdId = `${(key + venueID)}`,
                        startTrain = dataTable[key][indexItem]["start_time"],
                        endTrain = dataTable[key][indexItem]["end_time"],
                        activityColor = dataTable[key][indexItem]["color"],
                        nameCoach = dataTable[key][indexItem]["coaches"],
                        nameCustomer = dataTable[key][indexItem]["clients"],
                        id = dataTable[key][indexItem]["id"],
                        startVenue = state.settingsVenue[state.currentVenue].start_time,
                        oneMinInPx = 60 / state.settingsVenue[state.currentVenue].interval;

                    const startPosition = (startTrain - startVenue) * oneMinInPx,
                        heightRecord = (endTrain - startTrain) * oneMinInPx - 1;

                    dataItem.push({[tdId]: [
                        startPosition,
                        heightRecord,
                        activityColor,
                        startTrain,
                        endTrain,
                        nameCoach,
                        nameCustomer,
                        id,
                    ]})
                }
            }

            commit("setAllDataItem", {dateArr, dataItem});
            commit("setLoading", false);
        },

        async listVenue({commit, state}) {
            commit("setLoading", true);

            const {data, status} = await api.listVenues();

            if (status === 200) {
                const arrSettings = {};

                for (let key in data) {
                    const id = data[key].id;

                    arrSettings[id] = {
                        interval: data[key].interval,
                        start_time: data[key].start_time_formated,
                        end_time: data[key].end_time_formated,
                    }
                }

                commit("setSettingsVenue", arrSettings);
                commit("setListVenue", data);
                commit("setCurrentVenue", data[0].id);
            }

            commit("setLoading", false);
        },

        async listVenueObjectAll({commit, state}) {
            commit("setLoading", true);

            const {data, status} = await api.listVenueObject();

            if (status === 200) {
                commit("setListVenueObjectAll", data);
            }

            commit("setLoading", false);
        },

        async listVenueObject({commit, state}) {
            commit("setLoading", true);
            const {data, status} = await api.showVenueObject(state.currentVenue);

            if (status === 200) {
                commit("setListVenueObject", data);
            }

            commit("setLoading", false);
        },

        async activitiesType({commit}) {
            commit("setLoading", true);

            const {data, status} = await api.activitiesType();

            if (status === 200) {
                commit("setActivitiesType", data);
            }

            commit("setLoading", false);
        },

        async allClients({commit, state}) {
            commit("setLoading", true);

            const {data, status} = await api.createClient();

            if (status === 200) {
                commit("setCustomers", data);

                let arrName: { label: string, code: string }[] = [];

                for (let i = 0; i < data.length; i++) {
                    arrName.push({label: `${data[i].first_name} ${data[i].second_name}`, code: `${data[i].person_id}`})
                }

                commit("setAllClients", arrName);
            }

            commit("setLoading", false);
        },

        async allCoach({commit, state}) {
            commit("setLoading", true);

            const {data, status} = await api.showAllCoach();

            if (status === 200) {
                commit("setCoach", data);

                let arrName: { label: string, code: string }[] = [];

                for (let i = 0; i < data.length; i++) {
                    arrName.push({label: `${data[i].first_name} ${data[i].second_name}`, code: `${data[i].person_id}`})
                }
                commit("setAllCoach", arrName);
            }

            commit("setLoading", false);
        },
    }
};

export default module;
