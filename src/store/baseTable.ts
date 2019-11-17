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
    },
};

export default module;
