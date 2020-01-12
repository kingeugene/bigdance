import { Module } from 'vuex';
import api from "@/lib/api"

interface baseTableState {
    show: boolean;
    account_id: number;
    currentDate: string;
    currentVenue: number;
    currentColor: string;
    listVenue: [];
    listVenueObject: [];
    activitiesType: [];
    allClients: [];
    customers: [];
    allCoach: [];
    coach: [];
    loadedComponent: boolean;
    loading: boolean;
    loadedCustomers: boolean;
    dateArr: string[];
    idItem: number[];
    listRecord: any;
    dataTable: any;
    gapTime: number;
    oneMinInPx: number;
    startTime: number;
    endTime: number;
    dataItem: any;
    dateTimeChoose: string;
    coachChoose: {code: string, label: string};
    customerChoose: {code: string, label: string};
    isMobileChoose: boolean;
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
    recordLoading: boolean;
    loadedCustomer: boolean;
    loadedCoach: boolean;
    loadedListVenue: boolean;
}

const module: Module<baseTableState, any> = {
    state: {
        show: true,
        account_id: 1,
        currentDate: "",
        currentVenue: 1,
        dateTimeChoose: "",
        coachChoose: {
            code:"",
            label:"",
        },
        customerChoose: {
            code:"",
            label:"",
        },
        isMobileChoose: false,
        currentColor: "#2f628e",
        gapTime: 30,
        oneMinInPx: 101 / 30,
        startTime: 510,
        endTime: 1320,
        listVenue: [],
        listVenueObject: [],
        activitiesType: [],
        allClients: [],
        customers: [],
        allCoach: [],
        coach: [],
        loadedComponent: true,
        loading: false,
        loadedCustomers: true,
        dataTable: {},
        dateArr: [],
        idItem: [],
        listRecord: {},
        dataItem: {},
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
        recordLoading: false,
        loadedCustomer: false,
        loadedCoach: false,
        loadedListVenue: false,
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

        setLoaded(state, data) {
            state.loadedComponent = data;
        },

        setLoading(state, data) {
            state.loading = data;
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

        setRecordLoading(state, data) {
            state.recordLoading = data;
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

        setLoadedCustomer(state, data) {
            state.loadedCustomer = data;
        },

        setLoadedCoach(state, data) {
            state.loadedCoach = data;
        },
        setLoadedListVenue(state, data) {
            state.loadedListVenue = data;
        },
    },

    actions: {
        async createRecord({state, commit, dispatch}, {venue_object_id, activity_id, coaches, clients})  {
            const color = state.currentColor,
                start_time = `${state.recordDate} ${state.recordStartTime}:00`,
                end_time = `${state.recordDate} ${state.recordEndTime}:00`,
                status_record = "confirmed",
                cancelled_at = "";

            const {data, status} = await api.createRecord({venue_object_id, activity_id, color, start_time, end_time, status_record, cancelled_at, coaches, clients });

            if (status === 200) {
                dispatch("getListRecord", {venue_id: 1, date: null, coach: null, client: null, mobile: null});
            }


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

        async initBaseTable({dispatch, commit}) {
            commit("setLoaded", true);

            let request = [
                dispatch("listVenue"),
                dispatch("listVenueObject"),
                dispatch("activitiesType"),
                dispatch("allClients"),
                dispatch("allCoach"),
                dispatch("getListRecord", {venue_id: 1, date: null, coach: null, client: null, mobile: null}),
            ];

            await Promise.all(request);

            commit("setLoaded", false);
        },

//GET
        async getListRecord({commit, dispatch}, {venue_id, date, coach, client, mobile}) {
            commit("setRecordLoading", true);

            const {data, status} = await api.listRecord({venue_id, date, coach, client, mobile});

            if (status === 200) {
                await commit("setListRecord", data);
                dispatch("dataForItem");
            } else {
                alert("Данные не загрузились!")
            }

            commit("setRecordLoading", false);
        },

        dataForItem({commit, state}) {
            const dataTable = state.listRecord,
                dateArr = [],
                dataItem: any = {};

            for (let key in dataTable) {
                dateArr.push(key);

                for (let indexItem = 0; indexItem < dataTable[key].length; indexItem++)  {

                    const venueID = dataTable[key][indexItem]["venue_object_id"],
                        tdId = `${(key + venueID)}`,
                        startTrain = dataTable[key][indexItem]["start_time"],
                        endTrain = dataTable[key][indexItem]["end_time"],
                        activityColor = dataTable[key][indexItem]["color"],
                        nameCoach = dataTable[key][indexItem]["clients"],
                        nameCustomer = dataTable[key][indexItem]["coaches"],
                        id = dataTable[key][indexItem]["id"];

                    const startPosition = (startTrain - state.startTime) * state.oneMinInPx,
                        heightRecord = (endTrain - startTrain) * state.oneMinInPx - 1;

                    dataItem[tdId] = [
                        startPosition,
                        heightRecord,
                        activityColor,
                        startTrain,
                        endTrain,
                        nameCoach,
                        nameCustomer,
                        id,
                    ]
                }
            }

            commit("setAllDataItem", {dateArr, dataItem});

        },

        async listVenue({commit, state}) {
            const {data, status} = await api.listVenues();

            if (status === 200) {
                commit("setListVenue", data);

                if (!state.loadedListVenue) {
                    commit("setLoadedListVenue", true);
                }
            }
        },

        async listVenueObject({commit, state}) {
            const {data, status} = await api.showVenueObject(state.currentVenue);

            if (status === 200) {
                commit("setListVenueObject", data);
            }
        },

        async activitiesType({commit}) {
            const {data, status} = await api.activitiesType();

            if (status === 200) {
                commit("setActivitiesType", data);
            }
        },

        async allClients({commit, state}) {
            commit("setLoading", true);

            const {data, status} = await api.createClient();

            if (status === 200) {
                commit("setCustomers", data);

                let arrName = [];

                for (let i = 0; i < data.length; i++) {
                    arrName.push({label: `${data[i].first_name} ${data[i].second_name}`, code: `${data[i].id}`})
                }

                commit("setAllClients", arrName);

                if (!state.loadedCustomer) {
                    commit("setLoadedCustomer", true);
                }
            }

            commit("setLoading", false);
        },

        async allCoach({commit, state}) {
            commit("setLoading", true);

            const {data, status} = await api.showAllCoach();

            if (status === 200) {
                commit("setCoach", data);

                let arrName = [];

                for (let i = 0; i < data.length; i++) {
                    arrName.push({label: `${data[i].first_name} ${data[i].second_name}`, code: `${data[i].id}`})
                }

                if (!state.loadedCoach) {
                    commit("setLoadedCoach", true);
                }
                commit("setAllCoach", arrName);
            }

            commit("setLoading", false);
        },
    }
};

export default module;
