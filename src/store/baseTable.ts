import { Module } from 'vuex';
import api from "@/lib/api"

interface baseTableState {
    show: boolean;
    listVenue: [];
    listVenueObject: [];
    activitiesType: [];
    allClients: [];
    allCoach: [];
    loadedComponent: boolean;
    dateArr: string[];
    teacher: string[];
    clients: string[];
    typeLessons: string[];
    halls: string[];
    dataTable: any;
}

const module: Module<baseTableState, any> = {
    state: {
        show: true,
        listVenue: [],
        listVenueObject: [],
        activitiesType: [],
        allClients: [],
        allCoach: [],
        loadedComponent: true,
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
        typeLessons: [
            "Свободно",
            "Аренда",
            "Индивидуальные занятие",
            "Групповое занятие",

        ],
        halls: [
            "1",
            "2",
        ],
        dataTable: {
            "13-10-2019": {
                1: {
                    training1: {
                        startTraining: 510,
                        endTraining: 570,
                        typeTraining: 0,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 570,
                        endTraining: 610,
                        typeTraining: 0,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
                2: {
                    training1: {
                        startTraining: 570,
                        endTraining: 655,
                        typeTraining: 1,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 700,
                        endTraining: 760,
                        typeTraining: 3,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
            },
            "14-10-2019": {
                1: {
                    training1: {
                        startTraining: 574,
                        endTraining: 655,
                        typeTraining: 2,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 695,
                        endTraining: 750,
                        typeTraining: 1,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
                2: {
                    training1: {
                        startTraining: 596,
                        endTraining: 675,
                        typeTraining: 3,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 700,
                        endTraining: 760,
                        typeTraining: 2,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
            },
            "15-10-2019": {
                1: {
                    training1: {
                        startTraining: 510,
                        endTraining: 640,
                        typeTraining: 2,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 650,
                        endTraining: 720,
                        typeTraining: 1,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
                2: {
                    training1: {
                        startTraining: 530,
                        endTraining: 570,
                        typeTraining: 3,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 640,
                        endTraining: 680,
                        typeTraining: 2,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
            },
            "16-10-2019": {
                1: {
                    training1: {
                        startTraining: 610,
                        endTraining: 685,
                        typeTraining: 2,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 705,
                        endTraining: 740,
                        typeTraining: 1,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
                2: {
                    training1: {
                        startTraining: 632,
                        endTraining: 660,
                        typeTraining: 3,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 690,
                        endTraining: 750,
                        typeTraining: 2,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
            },
            "17-10-2019": {
                1: {
                    training1: {
                        startTraining: 524,
                        endTraining: 585,
                        typeTraining: 2,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 620,
                        endTraining: 660,
                        typeTraining: 1,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
                2: {
                    training1: {
                        startTraining: 1290,
                        endTraining: 1310,
                        typeTraining: 3,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                    training2: {
                        startTraining: 680,
                        endTraining: 720,
                        typeTraining: 2,
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
            },
        },
    },

    mutations: {
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
    },

    actions: {
        async initBaseTable({dispatch, commit}) {
            commit("setLoaded", true);

            await dispatch("listVenue");
            await dispatch("listVenueObject");
            await dispatch("activitiesType");
            await dispatch("allClients");
            await dispatch("allCoach");

            commit("setLoaded", false);
        },

        async listVenue({commit}) {
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
