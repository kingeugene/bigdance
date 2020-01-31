<template lang="pug">
include ../lib/pugDeps.pug
+b.Record
    +e.H1.title Запись
    template(v-if="!recordLoading")
        +e.block
            +e.wrap
                +e.labelWrap
                    +e.label Дата
                    +e.data {{record.date}}

                +e.labelWrap
                    +e.label C
                    +e.data {{minInTime(record.start_time)}}

                +e.labelWrap
                    +e.label До
                    +e.data {{minInTime(record.end_time)}}

                +e.labelWrap
                    +e.label Зал
                    +e.data {{record.venue_object_id}}

                +e.labelWrap
                    +e.label Тип
                    +e.data {{record.activity_id}}

                +e.labelWrap
                    +e.label Статус
                    +e.data {{record.status}}

            +e.H3.subtitle Клиент
            +e.wrapPerson(v-for="item in record.clients")
                +e.labelWrap
                    +e.label Фамилия
                    +e.data {{item.first_name}}

                +e.labelWrap
                    +e.label Имя
                    +e.data {{item.second_name}}

                +e.labelWrap
                    +e.label Пол
                    +e.data {{item.sex}}

                +e.labelWrap
                    +e.label Номер карты
                    +e.data {{item.email}}
                +e.labelWrap
                    +e.label Дата Рождения
                    +e.data {{item.birth_date}}

                +e.labelWrap
                    +e.label Документ
                    +e.data {{item.document_id}}
                +e.labelWrap
                    +e.label Заметки
                    +e.data {{item.notes}}

            +e.H3.subtitle Тренер
            +e.wrapPerson(v-for="item in record.coaches")
                +e.labelWrap
                    +e.label Фамилия
                    +e.data {{item.first_name}}

                +e.labelWrap
                    +e.label Имя
                    +e.data {{item.second_name}}

                +e.labelWrap
                    +e.label Пол
                    +e.data {{item.sex}}

                +e.labelWrap
                    +e.label Номер карты
                    +e.data {{item.email}}
                +e.labelWrap
                    +e.label Дата Рождения
                    +e.data {{item.birth_date}}

                +e.labelWrap
                    +e.label Документ
                    +e.data {{item.document_id}}
                +e.labelWrap
                    +e.label Заметки
                    +e.data {{item.notes}}
    loading(:active.sync="recordLoading")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";

@Component
export default class Record extends Vue {
    @Action initChooseRecord!: (id: string) => void;

    @State(state => state.record.chooseRecord) record!: {};
    @State(state => state.record.recordLoading) recordLoading!: boolean;

    minInTime(time: number): string {
        let mins: number | string = time % 60,
            hours: number | string  = (time - mins) / 60;

        if (mins < 10)  mins = '0' + mins;
        if (hours < 10) hours = '0' + hours;

        return  hours + ':' + mins;
    }

    created() {
        this.initChooseRecord(this.$route.params.id);
    }
}
</script>

<style lang="scss" scoped>
.Record {
    padding: 20px 0;

    &__title {
        text-align: center;
        margin-bottom: 40px;
        color: $orange;
    }

    &__subtitle {
        text-align: center;
        margin: 30px;
        color: $orange;
    }

    &__block {
        margin: 0 -60px;
        padding: 40px 60px;
        box-shadow: 0 7px 60px rgba(0,0,0,0.06);
        border-radius: 50px;
    }

    &__wrap {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    &__wrapPerson {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
}
</style>
