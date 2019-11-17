import { Module } from 'vuex';

interface clientsState {
    columns: any,
    rows: any,
    columns2: any,
    rows2: any,
}

const module: Module<clientsState, any> = {
    state: {
        columns: [
            {
                label: 'Имя',
                field: 'name',
                filterable: true,
            },
            {
                label: 'Фамилия',
                field: 'surName',
                filterable: true,
            },
            {
                label: 'Телефон',
                field: 'phone',
                filterable: true,
            },
            {
                label: 'Ставка',
                field: 'rate',
            },
            {
                label: 'Ред',
                field: 'action',
            },
        ],
        rows: [
            { id:1, name: "Михаил", surName: "Дмитрук", phone: "0973916465", rate: 1 },
            { id:2, name: "Сергей", surName: "Дмитрук", phone: "0973916465", rate: 2 },
            { id:3, name: "Юрий", surName: "Дмитрук", phone: "0973916465", rate: 3 },
            { id:4, name: "Александр", surName: "Дмитрук", phone: "0973916465", rate: 4 },
            { id:5, name: "Михаил", surName: "Дмитрук", phone: "0973916465", rate: 3 },
            { id:6, name: "Дмитрий", surName: "Дмитрук", phone: "0973916465", rate: 2 },
            { id:7, name: "Василий", surName: "Дмитрук", phone: "0973916465", rate: 325 },
            { id:8, name: "Петр", surName: "Дмитрук", phone: "0973916465", rate: 10 },
            { id:9, name: "Вадим", surName: "Дмитрук", phone: "0973916465", rate: 325 },
            { id:10, name: "Гоша", surName: "Дмитрук", phone: "0973916465", rate: 325 },
            { id:11, name: "Михаил", surName: "Дмитрук", phone: "0973916465", rate: 1 },
            { id:12, name: "Сергей", surName: "Дмитрук", phone: "0973916465", rate: 2 },
            { id:13, name: "Юрий", surName: "Дмитрук", phone: "0973916465", rate: 3 },
            { id:14, name: "Александр", surName: "Дмитрук", phone: "0973916465", rate: 4 },
            { id:15, name: "Михаил", surName: "Дмитрук", phone: "0973916465", rate: 3 },
            { id:16, name: "Дмитрий", surName: "Дмитрук", phone: "0973916465", rate: 2 },
            { id:17, name: "Василий", surName: "Дмитрук", phone: "0973916465", rate: 325 },
            { id:18, name: "Петр", surName: "Дмитрук", phone: "0973916465", rate: 10 },
            { id:19, name: "Вадим", surName: "Дмитрук", phone: "0973916465", rate: 325 },
            { id:20, name: "Гоша", surName: "Дмитрук", phone: "0973916465", rate: 325 },
        ],

        columns2: [
            {
                label: 'Дата/Время',
                field: 'date',
                filterable: true,
            },
            {
                label: 'Клиент',
                field: 'client',
                filterable: true,
            },
            {
                label: 'Тип Занятия',
                field: 'typeLesson',
                filterable: true,
            },
            {
                label: 'Филиал и Зал',
                field: 'hall',
            },

        ],
        rows2: [
            { id:1, date: "21.11.2019 - 10:30", client: "Иванов И.B", typeLesson: "Индивидуальное Занятие", hall: "Подол, Зал 2" },
            { id:2, date: "21.11.2019 - 10:30", client: "Иванов И.B", typeLesson: "Индивидуальное Занятие", hall: "Подол, Зал 2" },
            { id:3, date: "21.11.2019 - 10:30", client: "Иванов И.B", typeLesson: "Индивидуальное Занятие", hall: "Подол, Зал 2" },
            { id:4, date: "21.11.2019 - 10:30", client: "Иванов И.B", typeLesson: "Индивидуальное Занятие", hall: "Подол, Зал 2" },
            { id:5, date: "21.11.2019 - 10:30", client: "Иванов И.B", typeLesson: "Индивидуальное Занятие", hall: "Подол, Зал 2" },
            { id:6, date: "21.11.2019 - 10:30", client: "Иванов И.B", typeLesson: "Индивидуальное Занятие", hall: "Подол, Зал 2" },

        ],
    },

    mutations: {
        deleteRows(state, id) {
            for (let i = 0; i < state.rows.length; i++) {
                if ( state.rows[i].id === id) {
                    state.rows.splice(i, 1);
                    return;
                }
            }
        },
    },
};

export default module;
