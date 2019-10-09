import { Module } from 'vuex';

interface baseTableState {
    show: boolean,
}

const module: Module<baseTableState, any> = {
    state: {
        show: true,
    },

    mutations: {
        setShow(state) {
            state.show = !state.show;
        },
    },
};

export default module;
