<template lang="pug">
include ../lib/pugDeps.pug
vmodal(
    name="modal-record"
    height="555"
    width="900"
    :draggable="!isMobileChoose"
    adaptive
    scrollable
)
    .close-modal(@click="$modal.hide('modal-record')") +
    +b.Record
        +e.H4.title Запись
        template(v-if="!loading")
            template(v-for="(item, index) in record")
                +e.wrap
                    +e.labelWrap
                        +e.label Дата и Время
                        +e.data {{item.date}} </br> {{minInTime(item.start_time)}} - {{minInTime(item.end_time)}}

                    +e.labelWrap
                        +e.label Тип
                        +e.data {{item.activity_type_name}}

                    +e.labelWrap(v-for="itemCustomer in item.clients")
                        +e.label Клиент
                        +e.data {{itemCustomer.first_name}} {{itemCustomer.second_name}} <br/> Прайс: {{itemCustomer.client_price}} <br/> Тел: {{itemCustomer.phone}}

                    +e.labelWrap(v-for="itemCoach in item.coaches")
                        +e.label Тренер
                        +e.data {{itemCoach.first_name}} {{itemCoach.second_name}} <br/> Прайс: {{itemCoach.coach_price}} <br/> Тел: {{itemCoach.phone}}

                    +e.labelWrap
                        +e.label Заметки
                        +e.data {{item.description}}
                +e.btnEdit(v-if="role === 'root'")
                    button.btn.btn-primary(@click="copyRecord(item.id)") Скопировать на следующую неделю
                    button.btn.btn-warning(@click="editRecord(index)") Редактировать
                    button.btn.btn-danger(@click="recordDelete(item.id)") Удалить

            button.btn.btn-success(v-if="role === 'root'" @click="addRecord") Добавить Запись
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import {State, Mutation, Action} from "vuex-class";

    @Component
    export default class Record extends Vue {
        @Prop({type: Number, default: 1}) recordId!: string;
        @Prop({type: String, default: ""}) time!: string;
        @Prop({type: String, default: ""}) date!: string;
        @Prop({type: Number, default: 1}) venue_object_id!: number;

        @Action initChooseRecord!: ({date, time, venue_object_id}: any) => void;
        @Action deleteRecord!: (id: string) => void;
        @Action recordCopy!: (id: string) => void;

        @State(state => state.calendar.role) role!: string;
        @State(state => state.profile.loading) loading!: boolean;
        @State(state => state.record.chooseRecord) record!: {};
        @State(state => state.calendar.isMobileChoose) isMobileChoose!: any;


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
                hours: number | string = (time - mins) / 60;

            if (mins < 10) mins = '0' + mins;
            if (hours < 10) hours = '0' + hours;

            return hours + ':' + mins;
        }

        editRecord(index) {
            this.$emit("editRecord", index);
        }

        addRecord(index) {
            this.$emit("addRecord");
        }

        copyRecord(id) {
            this.recordCopy(id);
            this.$modal.hide('modal-record');
        }

        recordDelete(id) {
            if (window.confirm("Вы действительно хотите уалить Запись?")) {
                this.deleteRecord(id);
                this.$modal.hide('modal-record');
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
            flex-wrap: wrap;
            border: 1px solid #0b0e11;
            margin-bottom: 10px;

            @include bp(m) {
                flex-wrap: nowrap;
            }
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
