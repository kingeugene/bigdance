<template lang="pug">
include ../lib/pugDeps.pug
+b.Settings
    +e.H1.title Настройки
    +e.tabWrap
        +e.tab(
            v-for="item in tabs"
            :class="{'is-active': item.code === activeTab}"
            @click="activeTab = item.code"
        ) {{item.name}}
    template(v-for="item in tabs")
        div(v-show="item.code === activeTab")
            +e.btnAddWrap
                +e.btnAdd.btn.btn-success(@click="showModalAdd(item.code)") Добавить {{item.name}}

        +e.VMODAL.modal(
            :name="'modal-' + item.code + 'Add'"
            height="auto"
            draggable
            adaptive
            scrollable
            resizable
        )
            +e.FORM.form(@submit.prevent="submitSettings(item.code)")
                +e.formWrap
                    template(v-for="field in item.data")
                        +e.labelWrap(v-if="field.venue_id") {{field.name}}
                            +e.V-SELECT.input(
                                label="name"
                                :options="listVenueOption"
                                v-model="field.value"
                                :reduce="name => name.id"
                            )
                        div(v-else-if="field.block")
                            div {{field.name}}
                            +e.LABEL.radio Нет
                                +e.INPUT.switch(type="radio" :value="0" v-model="field.value")
                            +e.LABEL.radio Да
                                +e.INPUT.switch(type="radio" :value="1" v-model="field.value")

                        +e.labelWrap(v-else)
                            +e.label {{field.name}}
                            +e.INPUT.input(v-model="field.value" :required="field.required")
                +e.BUTTON.formBtn.btn.btn-success(type="submit") Отправить
    loading(:active.sync="loadingVenue")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

@Component({
    components: {
        VueGoodTable,
    }
})
export default class Settings extends Vue {
    activeTab: string = "venue";
    tabs: Array<{name: string, code: string, data: {}}> = [
        {
            name: "Cтудии",
            code: "venue",
            data: [
                {
                    name: "Название*",
                    value:  "",
                    code: "name",
                    required: true,
                },
                {
                    name: "Адресс",
                    value: "",
                    code: "location",
                    required: false,

                },
                {
                    name: "Цвет",
                    value: "",
                    code: "color",
                    required: false,

                },
                {
                    name: "Начало работы*",
                    value: "",
                    code: "start_time",
                    required: true,

                },
                {
                    name: "Окончание работы*",
                    value: "",
                    code: "end_time",
                    required: true,

                },
                {
                    name: "Интервал в минутах*",
                    value: "",
                    code: "interval",
                    required: true,
                },

            ]
        },
        {
            name: "Залы",
            code: "hall",
            data: [
                {
                    venue_id: true,
                    name: "Студия*",
                    value: "",
                    code: "venue_id",
                    required: true,
                },
                {
                    name: "Название Зала*",
                    value: "",
                    code: "name",
                    required: true,
                },

            ]
        },
        {
            name: "Стили танца",
            code: "styleDance",
            data: [
                {
                    name: "Название стиля танца*",
                    value: "",
                    code: "name",
                    required: true,
                },
            ]
        },
        {
            name: "Типы танца",
            code: "typeDance",
            data: [
                {
                    name: "Название типа танца*",
                    code: "name",
                    value: "",
                    required: true,
                },
                {
                    name: "Цвет",
                    value: "",
                    code: "color",
                    required: false,
                },
                {
                    block: true,
                    name: "Только одна бронь",
                    value: 0,
                    code: "block",
                    required: false,
                },
            ]

        },
    ];

    @State(state => state.baseTable.listVenue) listVenueOption!: string[];
    @State(state => state.baseTable.loadedComponent) loadedComponent!: boolean;
    @State(state => state.baseTable.loadedListVenue) loadedListVenue!: boolean;
    @State(state => state.settings.loadingVenue) loadingVenue!: boolean;

    @Action listVenue!: () => void;
    @Action venueCreate!: ({name, location, color, start_time, end_time, interval}: any) => void;
    @Action hallCreate!: ({venue_id, name}: any) => void;
    @Action styleDanceCreate!: ({name}: any) => void;
    @Action typeDanceCreate!: ({name, color, block}: any) => void;

    showModalAdd(item: string): void {
        this.$modal.show(`modal-${item}Add`);
    }

    submitSettings(nameSettings: string): void {
        let dataArr:any = {};

        for(let key in this.tabs) {
            if (this.tabs[key]["code"] === nameSettings) {
                for(let keyData in this.tabs[key]["data"]) {
                    dataArr[`${this.tabs[key]["data"][keyData]["code"]}`] = `${this.tabs[key]["data"][keyData]["value"]}`
                }

                this[`${nameSettings}Create`](dataArr);
                this.$modal.hide(`modal-${nameSettings}Add`);
                return;
            }
        }
    }

    created() {
        if (!this.loadedListVenue) {
            this.listVenue();
        }
    }
}
</script>

<style lang="scss" scoped>
.Settings {
    padding: 20px 0;

    &__title {
        text-align: center;
        margin-bottom: 40px;
        color: $orange;
    }

    &__tab {
        padding: 10px 30px;
        border: 1px solid $grey;
        color: $c-header;
        cursor: pointer;

        &.is-active {
            background: $orange;
            color: white;
        }

        &Wrap {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    &__btnAdd {
        margin: 40px 0;

        &Wrap {
            display: flex;
            justify-content: flex-end;
        }
    }

    &__form {
        &Wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        &Btn {
            display: block;
            margin: 30px auto 0;
        }
    }

    &__label {
        &Wrap {
            width: 100%;
            max-width: 200px;
            margin-bottom: 16px;
        }
    }

    &__input {
        width: 100%;
    }

    &__switch {
        margin: 5px;
    }

    &__radio {
        margin-right: 10px;
    }
}
</style>
<style lang="scss">
.Settings {
    &__modal {
        .v--modal {
            padding: 30px;
        }
    }
}
</style>
