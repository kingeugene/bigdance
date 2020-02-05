<template lang="pug">
include ../lib/pugDeps.pug
vmodal(
    name="modal-record"
    height="auto"
    width="900"
    draggable
    adaptive
    scrollable
    resizable
)
    +b.Record
        +e.H4.title Запись
        template(v-if="!recordLoading")
            +e.wrap
                +e.labelWrap
                    +e.label Дата и Время
                    +e.data {{record.date}} | {{minInTime(record.start_time)}} - {{minInTime(record.end_time)}}

                +e.labelWrap
                    +e.label Тип
                    +e.data {{record.activity_type_name}}

                +e.labelWrap(v-for="item in record.clients")
                    +e.label Клиент
                    +e.data {{item.first_name}} {{item.second_name}}

                +e.labelWrap(v-for="item in record.coaches")
                    +e.label Тренер
                    +e.data {{item.first_name}} {{item.second_name}}

                +e.labelWrap
                    +e.label Заметки
                    +e.data {{record.description}}
            +e.btnEditWrap
                +e.btnbtnEdit
                    button.btn.btn-success(@click="editRecord") Редактировать
                    button.btn.btn-danger(@click="recordDelete") Удалить

        loading(:active.sync="recordLoading")

</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";

@Component
export default class Record extends Vue {
    @Prop({type: Number, default: 1}) recordId!: string;

    @Action initChooseRecord!: (id: string) => void;
    @Action deleteRecord!: (id: string) => void;

    @State(state => state.record.chooseRecord) record!: {};
    @State(state => state.record.recordLoading) recordLoading!: boolean;

    @Watch("recordId")
    handleRecordId(value: number) {
        if (value) {
            this.initChooseRecord(this.recordId);
        }
    }

    minInTime(time: number): string {
        let mins: number | string = time % 60,
            hours: number | string  = (time - mins) / 60;

        if (mins < 10)  mins = '0' + mins;
        if (hours < 10) hours = '0' + hours;

        return  hours + ':' + mins;
    }

    editRecord() {
        this.$emit("editRecord");
    }

    recordDelete() {
        if (window.confirm("Вы действительно хотите уалить Запись?")) {
            this.deleteRecord(this.recordId);
        }
    }
}
</script>

<style lang="scss" scoped>
.Record {
    padding: 20px;

    &__title {
        text-align: center;
        margin-bottom: 10px;
        color: $orange;
    }

    &__subtitle {
        text-align: center;
        margin: 30px;
        color: $orange;
    }

    &__wrap {
        display: flex;
        border: 1px solid #0b0e11;
    }

    &__wrapPerson {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    &__label {
        border-bottom: 1px solid #0b0e11;
        margin-bottom: 5px;

        &Wrap {
            border: 1px solid #0b0e11;
            flex-basis: 100%;
            padding: 5px;
        }
    }
}
</style>
