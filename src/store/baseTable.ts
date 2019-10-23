import { Module } from 'vuex';

interface baseTableState {
    show: boolean;
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
                        startTraining: 520,
                        endTraining: 605,
                        typeTraining: "individual training",
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
                2: {
                    training1: {
                        startTraining: 555,
                        endTraining: 605,
                        typeTraining: "individual training",
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
                        endTraining: 605,
                        typeTraining: "individual training",
                        nameTeacher: "Vasy Popovich",
                        nameClient: "Geny Geny",
                        statusTraining: true,
                        numberWeeks: 1,
                        reference: "",
                    },
                },
                2: {
                    training1: {
                        startTraining: 696,
                        endTraining: 605,
                        typeTraining: "individual training",
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
    },
};

export default module;
