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
    .close-modal(@click="$modal.hide('modal-record')") +
    +b.Record
        +e.H4.title Запись
        template(v-if="!loading")
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
            +e.btnEdit
                button.btn.btn-warning(@click="editRecord") Редактировать
                button.btn.btn-danger(@click="recordDelete") Удалить

            button.btn.btn-success(@click="addRecord") Добавить Запись
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";

@Component
export default class Record extends Vue {
    @Prop({type: String, default: ""}) time!: string;
    @Prop({type: String, default: 1}) date!: string;
    @Prop({type: Number, default: 1}) venue_object_id!: number;

    @Action initChooseRecord!: ({date, time, venue_object_id}: any) => void;
    @Action deleteRecord!: (id: string) => void;


    @State(state => state.profile.loading) loading!: boolean;
    @State(state => state.record.chooseRecord) record!: {};


    @Watch("time")
    handleRecordId(value: number) {
        if (value) {
            this.initChooseRecord({
                date: this.date,
                time: this.time,
                venue_object_id: this.venue_object_id,
            });
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

    addRecord() {
        this.$emit("addRecord");
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

    &__btnEdit {
        display: flex;
        justify-content: flex-end;
        margin: 20px 0;

        button {
            margin: 0 10px;
        }
    }
}
</style>
