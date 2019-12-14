import { Module } from 'vuex';

interface clientsState {
    columns2: any,
    rows2: any,
}

const module: Module<clientsState, any> = {
    state: {
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

    },
};

export default module;
