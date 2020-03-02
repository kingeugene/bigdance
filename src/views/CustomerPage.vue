<template lang="pug">
include ../lib/pugDeps.pug
+b.CoachPage
    +e.H1.title Тренер
    +e.wrap(v-if="loadedInit")
        div
            +e.coachWrap
                +e.IMG.coach(src="https://ivara.ru/images/new/main_redgirl.png")
                +e.coachName-wrap
                    +e.coachName {{customer.first_name}} <br> {{customer.second_name}}
                    div Прайс: {{customer.price}}
                    +e.filter
                        +e.select
                            +e.selectName Выбрать тренера
                            v-select(
                                :options="coach"
                                v-model="actualCoach"
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
        +e.tableWrap
            vue-good-table(
                :columns="columns"
                :rows="filterRecordCustomer"
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
    @Action getCustomer!: (customer_id: number) => void;
    @Action getRecordCustomer!: ({date, coach, client}: any) => void;
    @Action initBaseTable!: () => void;

    @State(state => state.baseClients.showCustomer) customer!: any;
    @State(state => state.baseTable.allCoach) coach!: string[];
    @State(state => state.baseTable.listVenue) listVenue!: string[];
    @State(state => state.baseClients.recordCustomer) recordCustomer!: any;
    @State(state => state.baseClients.coachChoose) coachChoose!: any;
    @State(state => state.baseClients.dateTimeChoose) dateTimeChoose!: string;
    @State(state => state.baseTable.loadedInit) loadedInit!: boolean;

    @Mutation setCoachChoosePageCustomer!: (customer: {code: string, label: string}) => void;
    @Mutation setDateTimeChoosePageCustomer!: (date: string) => void;

    columns: any = [
        {
            label: 'Дата/Время',
            field: 'date',
        },
        {
            label: 'Тренер',
            field: 'coaches',
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

    get filterRecordCustomer(): any {
        return this.actualCoach!.code
            ? this.recordCustomer.filter(item => item.coachesId.some(id => id == this.actualCoach!.code))
            : this.recordCustomer;
    }

    @Watch("dateTimeChoose")
    getActualRecords(value: string) {
        this.getRecordCustomer({
            date: value,
            coach: this.coachChoose.code ,
            client: parseInt(this.$route.params.id),
        });
    }

    get actualCoach(): {code: string, label: string} | null {
        return this.coachChoose;
    }

    set actualCoach(value: {code: string, label: string} | null) {
        if(!value) {
            value = {code: "", label: ""};
        }

        this.setCoachChoosePageCustomer(value);
    }

    get date(): string {
        return this.dateTimeChoose;
    }

    set date(value: string) {
        this.setDateTimeChoosePageCustomer(value);
    }

    async created() {
        if (!this.loadedInit) {
            await this.initBaseTable();
        }

        this.getCustomer(parseInt(this.$route.params.id));
        this.getRecordCustomer({
            date: "",
            coach: this.coachChoose.code ,
            client: parseInt(this.$route.params.id),
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
