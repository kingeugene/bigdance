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
                                :options="venueList"
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

    vue-good-table(
        :columns="columns"
        :rows="rows"
        :search-options="optionSearch"
        styleClass="vgt-table bordered"
        :pagination-options="optionPagination"
        :line-numbers="true"
        row-style-class="Settings__row"
        max-height="600px"
        theme="black-rhino"
    )
        template(slot="table-row" slot-scope="props")
            +e.iconWrap.SPAN(v-if="props.column.field == 'action'")
                +e.iconEdit.I.fa.fa-edit(@click.prevent="editSetting(props.row)" title="Редактировать")
                +e.iconEdit.I.fa.fa-trash(@click.prevent="showModalDelete(props.row.id)" title="Удалить")
    +e.VMODAL.modalDelete(
        name="delete-settings"
        height="260"
        width="500"
        adaptive
    )
        +e.H4.modalDeleteTitle Вы действительно хотите удалить?
        +e.modalDelete-btnWrap
            +e.modalDelete-btnCancel(@click="$modal.hide('delete-settings')") Отмена
            +e.modalDelete-btnOk(@click="deleteSettings") Да
    loading(:active.sync="loadingSetting")
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
    deleteRow: any = null;
    activeTab: string = "venue";
    editId: number = 0;
    tabs: Array<{name: string, code: string, data: Array<{}>}> = [
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
                    code: "label",
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
                    code: "label",
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
    optionSearch: object = {
        enabled: true,
    };

    optionPagination: object = {
        enabled: true,
        perPage: 20,
        nextLabel: 'Вперед',
        prevLabel: 'Назад',
        rowsPerPageLabel: 'Количество страниц',
        ofLabel: 'из',
        allLabel: 'Все',
    };

    venueColumns: any = [
        {
            label: 'Название',
            field: 'name',
            filterable: true,
        },
        {
            label: 'Локация',
            field: 'location',
            filterable: true,
        },
        {
            label: 'Цвет',
            field: 'color',
            filterable: true,
        },
        {
            label: 'Начало',
            field: 'start_time',
        },
        {
            label: 'Окончание',
            field: 'end_time',
        },
        {
            label: 'Интервал',
            field: 'interval',
        },
        {
            label: 'Ред',
            field: 'action',
        },
    ];

    hallColumns: any = [
        {
            label: 'Название зала',
            field: 'name',
            filterable: true,
        },
        {
            label: 'Студия',
            field: 'venue_id',
        },
        {
            label: 'Ред',
            field: 'action',
        },
    ];

    typeDanceColumns: any = [
        {
            label: 'Тип занятия',
            field: 'label',
            filterable: true,
        },
        {
            label: 'Цвет',
            field: 'color',
        },
        {
            label: 'Бронь всего зала',
            field: 'block',
        },
        {
            label: 'Ред',
            field: 'action',
        },
    ];

    styleDanceColumns: any = [
        {
            label: 'Стиль танца',
            field: 'label',
            filterable: true,
        },
        {
            label: 'Ред',
            field: 'action',
        },
    ];

    @State(state => state.baseTable.listVenue) venueList!: string[];
    @State(state => state.baseTable.listVenueObjectAll) hallList!: string[];
    @State(state => state.baseTable.activitiesType) typeDanceList!: string[];
    @State(state => state.trainersAdd.activityStyle) styleDanceList!: [];
    @State(state => state.baseTable.loadedComponent) loadedComponent!: boolean;
    @State(state => state.trainersAdd.loadingStyle) loadingStyle!: boolean;
    @State(state => state.settings.loading) loadingDelete!: boolean;

    @Action initBaseTable!: () => void;
    @Action venueCreate!: ({name, location, color, start_time, end_time, interval}: any) => void;
    @Action hallCreate!: ({venue_id, name}: any) => void;
    @Action styleDanceCreate!: ({name}: any) => void;
    @Action typeDanceCreate!: ({name, color, block}: any) => void;
    @Action activityStyleTrain!: () => void;
    @Action venueDelete!: (id: number) => void;
    @Action hallDelete!: (id: number) => void;
    @Action styleDanceDelete!: (id: number) => void;
    @Action typeDanceDelete!: (id: number) => void;

    get columns(): {} {
        return this[`${this.activeTab}Columns`];
    }

    get rows(): {} {
        return this[`${this.activeTab}List`];
    }

    get loadingSetting(): boolean {
        return this.loadedComponent || this.loadingDelete;
    }

    showModalAdd(item: string): void {
        this.$modal.show(`modal-${item}Add`);
    }

    showModalDelete(id: number): void {
        this.$modal.show('delete-settings');
        this.deleteRow = id;
    }

    deleteSettings(): void {
        const nameDelete: string = `${this.activeTab}Delete`;
        this[nameDelete](this.deleteRow);
        this.$modal.hide('delete-settings');
    }

    editSetting(row: any) {
        this.editId = row.id;

        let currentData: any = null;

        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].code === this.activeTab) {
                currentData = i;
                break;
            }
        }

        for (let key in this.tabs[currentData].data) {
            let code = this.tabs[currentData].data[key].code;
            this.tabs[currentData].data[key].value = row[code];
        }

        this.$modal.show(`modal-${this.activeTab}Add`);
    }

    submitSettings(nameSettings: string): void {
        let dataArr:any = {};

        for(let key in this.tabs) {
            if (this.tabs[key]["code"] === nameSettings) {
                for(let keyData in this.tabs[key]["data"]) {
                    dataArr[`${this.tabs[key]["data"][keyData]["code"]}`] = `${this.tabs[key]["data"][keyData]["value"]}`
                }

                dataArr.id = this.editId;

                this[`${nameSettings}Create`](dataArr);
                this.$modal.hide(`modal-${nameSettings}Add`);
                this.editId = 0;
            }
        }
    }

    created() {
        if (this.loadedComponent) {
            this.initBaseTable();
        }

        if (!this.loadingStyle) {
            this.activityStyleTrain();
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

    &__icon {
        &Wrap {
            display: flex;
            justify-content: space-around;
        }

        &Edit {
            font-size: 20px;
            cursor: pointer;
            transition: .3s;

            &:hover {
                color: green;
                transform: translateY(-2px);
            }
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

    &__modalDelete {
        &Title {
            text-align: center;
            line-height: 36px;
        }

        &-btn {
            &Wrap {
                display: flex;
                align-items: center;
                justify-content: space-around;
            }

            &Cancel,
            &Ok {
                padding: 10px 30px;
                transition: .3s;
                cursor: pointer;
                color: #fff;
                width: 120px;
                text-align: center;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
                }
            }

            &Cancel {
                background: red;
            }

            &Ok {
                background: green;
            }
        }
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

    &__modalDelete {
        .v--modal {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 40px 20px;
        }
    }

    &__modalDetails {
        .v--modal {
            padding: 30px;
            display: flex;
        }

        &-info {
            margin-right: 50px;

            &Icon {
                height: 240px;
                object-fit: contain;
                margin: 0 40px 40px 0;
            }

            &Title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 50px;
            }

        }

        &-table {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            &Title {
                font-size: 18px;
                font-weight: bold;
            }

            &Btn {
                padding: 10px 30px;
                background: green;
                border-radius: 50px;
                color: white;
                transition: .3s;
                cursor: pointer;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
                }
            }
        }
    }
}
</style>
