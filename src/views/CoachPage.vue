<template lang="pug">
include ../lib/pugDeps.pug
+b.CoachPage
    +e.H1.title Тренер
    template(v-if="!loadingCoach")
        +e.coachWrap
            +e.IMG.coach(src="https://sivator.com/uploads/posts/2017-08/1501737653_urodru20170803sheste_01.jpg")
            +e.coachName-wrap
                +e.coachName {{coach.first_name}} <br> {{coach.middle_name}} <br> {{coach.second_name}}
                +e.coachPosition {{coach.position}}
                +e.coachStyle {{coach.name}}
        +e.availableName Доступное рабочие время:
        +e.available(v-for="item in coach.availability") {{item.slot}}: {{item.from}} - {{item.to}}
        vue-good-table(
            :columns="columns"
            :rows="recordCoach"
            :search-options="optionSearch"
            styleClass="vgt-table bordered"
            :pagination-options="optionPagination"
            :line-numbers="true"
            row-style-class="CoachPage__row"
            max-height="600px"
            theme="black-rhino"
        )

    loading(:active.sync="loadingCoach")
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
export default class CoachPage extends Vue {
    @Action getCoach!: (id: number) => void;
    @Action getRecordCoach!: (id: number) => void;
    @Action initBaseTable!: () => void;

    @State(state => state.baseCoach.showCoach) coach!: any;
    @State(state => state.baseCoach.loading) loadingCoach!: boolean;
    @State(state => state.baseTable.listVenue) listVenue!: string[];
    @State(state => state.baseCoach.recordCoach) recordCoach!: string[];
    @State(state => state.baseTable.loadedComponent) loadedComponent!: boolean;

    columns: any = [
        {
            label: 'Дата/Время',
            field: 'date',
        },
        {
            label: 'Клиент',
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
        rowsPerPageLabel: 'Количество страниц',
        ofLabel: 'из',
        allLabel: 'Все',
    };

    optionSearch: object = {
        enabled: true,
    };

    async created() {
        if (this.loadedComponent) {
            await this.initBaseTable();
        }

        this.getCoach(parseInt(this.$route.params.id));
        this.getRecordCoach(parseInt(this.$route.params.id));
    }
}
</script>

<style lang="scss" scoped>
.CoachPage {
    &__title {
        text-align: center;
        margin: 30px 0;
        color: $orange
    }

    &__coach {
        width: 260px;

        &Wrap {
            display: flex;
            margin-bottom: 40px;
        }

        &Name {
            font-size: 24px;
            margin-bottom: 50px;

            &-wrap {
                margin: 10px 50px;
            }
        }

        &Style,
        &Position {
            font-size: 20px;
            margin-bottom: 10px;
        }


    }

    &__available {
        &Name {
            margin-bottom: 10px;
            font-size: 18px;
        }
    }
}
</style>
