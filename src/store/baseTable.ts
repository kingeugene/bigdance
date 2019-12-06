import { Module } from 'vuex';
import api from "@/lib/api"

interface baseTableState {
    show: boolean;
    currentDate: string;
    currentVenue: number;
    currentColor: string;
    listVenue: [];
    listVenueObject: [];
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
    teacher: string[];
    clients: string[];
    halls: string[];
    listRecord: any;
    dataTable: any,
}

const module: Module<baseTableState, any> = {
    state: {
        show: true,
        currentDate: "",
        currentVenue: 1,
        currentColor: "#2f628e",
        listVenue: [],
        listVenueObject: [],
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
        dataTable: [],
        dateArr: [
          "13-10-2019",
          "14-10-2019",
          "15-10-2019",
          "16-10-2019",
          "17-10-2019",
          "18-10-2019",
          "19-10-2019",
        ],
        teacher:  [
          "Алеша Николаевич",
          "Диадор Петрович",
          "Шарик Леопольдович",
          "Кузьма Петрович",
          "Петросян Петрухин",
        ],
        clients: [
            "Клиент 1",
            "Клиент 2",
            "Клиент 3",
            "Клиент 4",
            "Клиент 5",
            "Клиент 6",
        ],
        halls: [
            "1",
            "2",
        ],
        listRecord: {},
    },

    mutations: {
        setCurrentDate(state, data) {
            state.currentDate = data
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
        }
    },

    actions: {
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

            dispatch("listVenue");
            dispatch("listVenueObject");
            // dispatch("listRecord");
            dispatch("activitiesType");
            dispatch("allClients");
            dispatch("allCoach");

            commit("setLoaded", false);
        },

//GET
        async listRecord({commit}) {
            const {data, status} = await api.listRecord();

            if (status === 200) {
                commit("setListRecord", data);
            }
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
                    arrName.push(`${data[i].first_name} ${data[i].second_name}`)
                }
                commit("setAllClients", arrName);
            }
        },

        async allCoach({commit}) {
            const {data, status} = await api.showAllCoach();

            if (status === 200) {
                let arrName = [];

                for (let i = 0; i < data.length; i++) {
                    arrName.push(`${data[i].first_name} ${data[i].second_name}`)
                }

                commit("setAllCoach", arrName);
            }
        },
    }
};

export default module;
