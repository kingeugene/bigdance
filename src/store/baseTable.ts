import { Module } from 'vuex';
import api from "@/lib/api"

interface baseTableState {
    show: boolean;
    account_id: number;
    currentDate: string;
    currentVenue: number;
    currentColor: string;
    listVenue: [];
    listVenueObject: [
        {
            id: number;
            name: string;
            venue_id: number
        }
    ];
    activitiesType: [
        {
            id: number,
            account_id: number,
            name: string,
            color: string | null,
        }
    ];
    allClients: [];
    allCoach: [];
    loadedComponent: boolean;
    dateArr: string[];
    idItem: number[];
    listRecord: any;
    dataTable: any;
    gapTime: number;
    oneMinInPx: number;
    startTime: number,
    endTime: number,
    dataItem: any;
    dateTimeChoose: string;
    coachChoose: string;
    customerChoose: string;
    isMobileChoose: boolean;
    recordActivityType: string;
    recordColor: string;
    recordDate: string;
    recordStartTime: string,
    recordEndTime: string,
    recordStatus: string,
    recordCancelledAt: string,
    recordCoaches: Array<any>,
    recordClients: Array<any>,
}

const module: Module<baseTableState, any> = {
    state: {
        show: true,
        account_id: 1,
        currentDate: "",
        currentVenue: 1,
        dateTimeChoose: "",
        coachChoose: "",
        customerChoose: "",
        isMobileChoose: false,
        currentColor: "#2f628e",
        gapTime: 30,
        oneMinInPx: 101 / 30,
        startTime: 510,
        endTime: 1320,
        listVenue: [],
        listVenueObject: [
            {
                id: 1,
                name:"",
                venue_id: 1
            }
        ],
        activitiesType: [
            {
                "id": 1,
                "account_id": 1,
                "name": "Individual",
                "color": ""
            },
        ],
        allClients: [],
        allCoach: [],
        loadedComponent: true,
        dataTable: {},
        dateArr: [],
        idItem: [],
        listRecord: {},
        dataItem: {},
        recordDate: "",
        recordActivityType: "",
        recordColor: "#DC4141",
        recordStartTime: "",
        recordEndTime: "",
        recordStatus: "",
        recordCancelledAt: "",
        recordCoaches: [],
        recordClients: []
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

        setAllCoach(state, data) {
            state.allCoach = data;
        },

        setLoaded(state, data) {
            state.loadedComponent = data;
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

        // setRecordCoaches(state, data) {
        //     state.recordCoaches = data;
        // },
        //
        // setRecordClients(state, data) {
        //     state.recordClients = data;
        // },
        //
        // setRecordActivityType(state, data) {
        //     state.recordActivityType = data;
        // }
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
                dispatch("getListRecord", {venue_id: 1, date: null, coach: null, client: null, mobile: null})
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

            dispatch("dataForItem");

            commit("setLoaded", false);
        },

//GET
        async getListRecord({commit}, {venue_id, date, coach, client, mobile}) {
            const {data, status} = await api.listRecord({venue_id, date, coach, client, mobile});

            if (status === 200) {
                commit("setListRecord", data);
            }
        },

        dataForItem({commit, state}) {
            const dataTable = state.listRecord,
                dateArr = [],
                dataItem: any = {};

            for (let key in dataTable) {
                dateArr.push(key);

                for (let indexItem = 0; indexItem < dataTable[key].length; indexItem++)  {

                    const classTd = `${(key + 1)}`;

                    const startTrain = dataTable[key][indexItem]["start_time"],
                        endTrain = dataTable[key][indexItem]["end_time"],
                        activityColor = dataTable[key][indexItem]["color"],
                        nameCoach = dataTable[key][indexItem]["clients"],
                        nameCustomer = dataTable[key][indexItem]["coaches"];

                    const startPosition = (startTrain - state.startTime) * state.oneMinInPx,
                        heightRecord = (endTrain - startTrain) * state.oneMinInPx - 1;

                    dataItem[classTd] = [
                        startPosition,
                        heightRecord,
                        activityColor,
                        startTrain,
                        endTrain,
                        nameCoach,
                        nameCustomer,
                    ]
                }
            }

            commit("setAllDataItem", {dateArr, dataItem});

        },

        async listVenue({commit, state}) {
            const {data, status} = await api.listVenues();

            if (status === 200) {

                commit("setListVenue", data);
            }
        },

        async listVenueObject({commit}) {
            const {data, status} = await api.showVenueObject();

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

        async allClients({commit}) {
            const {data, status} = await api.createClient();

            if (status === 200) {
                let arrName = [];

                for (let i = 0; i < data.length; i++) {
                    arrName.push({label: `${data[i].first_name} ${data[i].second_name}`, code: `${data[i].id}`})
                }
                commit("setAllClients", arrName);
            }
        },

        async allCoach({commit}) {
            const {data, status} = await api.showAllCoach();

            if (status === 200) {
                let arrName = [];

                for (let i = 0; i < data.length; i++) {
                    arrName.push({label: `${data[i].first_name} ${data[i].second_name}`, code: `${data[i].id}`})
                }

                commit("setAllCoach", arrName);
            }
        },
    }
};

export default module;
