<template lang="pug">
include ../lib/pugDeps.pug
+b.CoachPage
    +e.H1.title Тренер
    +e.wrap(v-if="loadedInit")
        div
            +e.coachWrap
                +e.IMG.coach(src="http://tt-crm.loc:8085/api/1582578081.png")
                +e.coachName-wrap
                    +e.coachName {{coach.first_name}} <br> {{coach.second_name}}
                    +e.coachPosition {{coach.position}}
                    +e.coachStyle {{coach.name}}
                    div Зарплата: {{coach.wage}}
                    div Прайс: {{coach.price}}
                    +e.filter
                        +e.select
                            +e.selectName Выбрать клиента
                            v-select(
                                :options="clients"
                                v-model="actualCustomer"
                            )
                        datepicker2(
                            lang="ru"
                            v-model="date"
                            valueType="format"
                            clearable
                            :first-day-of-week="7"
                            width="100%"
                            format="YYYY-MM-DD"
                        )
            +e.availableName Доступное рабочие время:
            +e.available(v-for="item in coach.availability") {{item.slot}}: {{item.from}} - {{item.to}}
        +e.tableWrap
            vue-good-table(
                :columns="columns"
                :rows="filterRecordCoach"
                :search-options="optionSearch"
                styleClass="vgt-table bordered"
                :pagination-options="optionPagination"
                :line-numbers="true"
                row-style-class="CoachPage__row"
                max-height="600px"
                theme="black-rhino"
            )
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import datepicker2 from "vue2-datepicker";

@Component({
    components: {
        VueGoodTable,
        datepicker2
    }
})
export default class CoachPage extends Vue {
    @Action getCoach!: (id: number) => void;
    @Action getRecordCoach!: ({date, coach, client}: any) => void;
    @Action initBaseTable!: () => void;

    @State(state => state.baseCoach.showCoach) coach!: any;
    @State(state => state.baseTable.allClients) clients!: string[];
    @State(state => state.baseTable.listVenue) listVenue!: string[];
    @State(state => state.baseCoach.recordCoach) recordCoach!: any;
    @State(state => state.baseCoach.customerChoose) customerChoose!: any;
    @State(state => state.baseCoach.dateTimeChoose) dateTimeChoose!: string;
    @State(state => state.baseTable.loadedInit) loadedInit!: boolean;

    @Mutation setCustomerChoosePageCoach!: (customer: {code: string, label: string}) => void;
    @Mutation setDateTimeChoosePageCoach!: (date: string) => void;

    columns: any = [
        {
            label: 'Дата/Время',
            field: 'date',
        },
        {
            label: 'Клиент',
            field: 'clients',
            filterable: true,
        },
        {
            label: 'Тип Занятия',
            field: 'type',
            filterable: true,
        },

        {
            label: 'Филиал и зал',
            field: 'location',
        },
    ];

    optionPagination: object = {
        enabled: true,
        perPage: 20,
        nextLabel: 'Вперед',
        prevLabel: 'Назад',
        rowsPerPageLabel: 'Кол-во стр: ',
        ofLabel: 'из',
        allLabel: 'Все',
    };

    optionSearch: object = {
        enabled: true,
    };

    get filterRecordCoach(): any {
        return this.actualCustomer!.code
            ? this.recordCoach.filter(item => item.clientsId.some(id => id == this.actualCustomer!.code))
            : this.recordCoach;
    }

    @Watch("dateTimeChoose")
    getActualRecords(value: string) {
        this.getRecordCoach({
            date: value,
            coach: parseInt(this.$route.params.id),
            client: this.customerChoose.code,
        });
    }

    get actualCustomer(): {code: string, label: string} {
        return this.customerChoose;
    }

    set actualCustomer(value: {code: string, label: string}) {
        if(!value) {
            value = {code: "", label: ""};
        }

        this.setCustomerChoosePageCoach(value);
    }

    get date(): string {
        return this.dateTimeChoose;
    }

    set date(value: string) {
        this.setDateTimeChoosePageCoach(value);
    }

    async created() {
        if (!this.loadedInit) {
            await this.initBaseTable();
        }

        this.getCoach(parseInt(this.$route.params.id));
        this.getRecordCoach({
            date: "",
            coach: parseInt(this.$route.params.id),
            client: this.customerChoose.code,
        });
    }
}
</script>

<style lang="scss" scoped>
.CoachPage {
    padding: 0 20px;

    &__wrap {
        display: flex;
        flex-wrap: wrap;

        @include bp(m) {
            flex-wrap: nowrap;
        }
    }

    &__title {
        text-align: center;
        margin: 30px 0;
        color: $orange
    }

    &__tableWrap {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        @include bp(m) {
            flex-wrap: nowrap;
        }
    }

    &__filter {
        width: 100%;
        margin-top: 40px;
    }

    &__select {
        margin-bottom: 20px;
    }

    &__coach {
        width: 200px;
        object-fit: contain;

        &Wrap {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 40px;

            @include bp(m) {
                flex-wrap: nowrap;
            }
        }

        &Name {
            font-size: 24px;
            margin-bottom: 20px;

            &-wrap {
                width: 100%;

                @include bp(m) {
                    margin: 10px 30px;
                    min-width: 200px;
                }
            }
        }

        &Style,
        &Position {
            font-size: 20px;
            margin-bottom: 10px;
        }


    }

    &__available {
        margin-bottom: 30px;

        &Name {
            margin-bottom: 10px;
            font-size: 18px;
        }
    }
}
</style>
<style lang="scss">
.CoachPage {
    .vgt-wrap {
        width: 100%;
    }
}
</style>
