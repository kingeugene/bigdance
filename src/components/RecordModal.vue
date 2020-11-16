<template lang="pug">
include ../lib/pugDeps.pug
+e.VMODAL.RecordModal(
    name="modal-add"
    height="auto"
    :draggable="!isMobileChoose"
    adaptive
    @closed="flagEditRecord = 0"
)
    .close-modal(@click="$modal.hide('modal-add')") +
    +e.FORM.form(@submit.prevent="submitForm")
        +e.modalWrap
            +e.modalDate
                | Дата*
                datepicker2(
                    lang="ru"
                    v-model="dateModal"
                    valueType="format"
                    clearable
                    :first-day-of-week="1"
                    format="YYYY-MM-DD"
                )
            +e.modalTime
                | Начало*
                input(
                    type="tel"
                    v-mask="'##:##'"
                    v-model="selectTimeStart"
                    required
                )
            +e.modalTime
                | Окончания*
                input(
                    type="tel"
                    v-mask="'##:##'"
                    v-model="selectTimeEnd"
                    required
                )
        +e.modalWrap
            +e.select
                +e.selectName Выбрать учителя
                v-select(
                    multiple
                    :options="coach"
                    v-model="selectTeacherModal"
                )
            +e.select
                +e.selectName Выбрать клиента
                v-select(
                    multiple
                    :options="clients"
                    v-model="selectedChildModal"
                )
        +e.modalWrap
            +e.select.is-type
                +e.selectName Тип занятия*
                v-select(
                    :options="activitiesType"
                    v-model="currentType"
                )
            +e.select.is-halls
                +e.selectName Зал*
                v-select(
                    label="name"
                    :options="halls"
                    v-model="currentHall"
                )
        +e.modalWrap
            +e.select.is-week
                +e.selectName Недель
                input(
                    type="number"
                    v-model="currentWeeks"
                )
            +e.select.is-description
                +e.selectName Заметки
                textarea(
                    v-model="currentDescriptionRecord"
                )
        +e.modalWrap.d-none
            +e.modalWeek
                +e.modalWeekName Кол-во недель
                +e.INPUT(type="text" v-model="quantityWeek")
            +e.modalStatus
                +e.INPUT(type="checkbox" v-model="statusModal") Статус
            +e.modalNotes
                +e.modalNotesName Справка
                +e.TEXTAREA.modalNotesText(v-model="modalNotes")
        +e.errorMessageWrap
            +e.BUTTON.modalSubmit.btn.btn-success(type="submit") {{flagEditRecord ? "Редактировать" : "Отправить"}}
            +e.errorMessage {{errorMessage}}</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Action, State} from "vuex-class";

@Component
export default class Record extends Vue {
    errorMessage = "";
    flagEditRecord = 0;
    currentRecord = 0;

    @State(state => state.calendar.recordCoaches) recordCoaches!: any;
    @State(state => state.calendar.recordClients) recordClients!: any;
    @State(state => state.calendar.recordHall) recordHall!: { id: number, name: string };
    @State(state => state.calendar.weeks) weeks!: number;
    @State(state => state.calendar.descriptionRecord) descriptionRecord!: string;
    @State(state => state.calendar.recordActivityType) recordActivityType!: {
        account_id: number,
        block: number,
        color: string,
        id: number,
        label: string,
    };

    @Action createRecord!: ({venue_object_id, activity_id, coaches, clients, number_weeks, description, edit}: any) => void;


    submitForm(): void {
        this.errorMessage = "";

        const venue_object_id = this.recordHall.id,
            activity_id = this.recordActivityType.id,
            coaches = this.recordCoaches!.map((name: { code: string, label: string }) => name.code),
            clients = this.recordClients!.map((name: { code: string, label: string }) => name.code),
            number_weeks = this.weeks,
            description = this.descriptionRecord;

        if (!this.dateModal || !this.selectTimeStart || !this.selectTimeEnd || !activity_id || !venue_object_id) {
            this.errorMessage = "Введите все обязательные поля";
            return;
        }

        this.createRecord({
            venue_object_id,
            activity_id,
            coaches,
            clients,
            number_weeks,
            description,
            edit: this.flagEditRecord
        });

        this.currentRecord = 0;
        this.$modal.hide('modal-add');
        this.$modal.hide('modal-record');
    }

    get dateModal(): string {
        return this.recordDate;
    }

    set dateModal(value: string) {
        this.setRecordDate(value);
    }

    get selectTimeStart(): string {
        return this.recordStartTime;
    }

    set selectTimeStart(value: string) {
        this.setRecordStartTime(value);
    }

    get selectTimeEnd(): string {
        return this.recordEndTime;
    }

    set selectTimeEnd(value: string) {
        this.setRecordEndTime(value);
    }

    get selectTeacherModal(): { code: string, label: string }[] | null {
        return this.recordCoaches;
    }

    set selectTeacherModal(value: { code: string, label: string }[] | null) {
        if (!value) {
            value = [{code: "", label: ""}];
        }

        this.setRecordCoaches(value);
    }

    get selectedChildModal(): { code: string, label: string }[] {
        return this.recordClients;
    }

    set selectedChildModal(value: { code: string, label: string }[]) {
        if (!value) {
            value = [{code: "", label: ""}];
        }

        this.setRecordClients(value);
    }

    get currentHall(): { id: number, name: string } | null {
        return this.recordHall;
    }

    set currentHall(value: { id: number, name: string } | null) {
        if (!value) {
            value = {
                id: 0,
                name: "",
            };
        }

        this.setRecordHall(value);
    }

    get currentDescriptionRecord(): string {
        return this.descriptionRecord;
    }

    set currentDescriptionRecord(value: string) {
        this.setDescriptionRecord(value);
    }

    get currentWeeks(): number {
        return this.weeks;
    }

    set currentWeeks(value: number) {
        this.setWeeks(value);
    }

    get currentType(): {
        account_id: number,
        block: number,
        color: string,
        id: number,
        label: string,
    } {
        return this.recordActivityType;
    }

    set currentType(value: {
        account_id: number,
        block: number,
        color: string,
        id: number,
        label: string,
    }) {
        if (!value) {
            value = {
                account_id: 0,
                block: 0,
                color: "",
                id: 0,
                label: "",
            };
        }

        this.setRecordActivityType(value);
    }
}
</script>

<style lang="scss" scoped>
.RecordModal {
    z-index: 99999999;

    &Wrap {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 20px;

        input {
            width: 100%;
            height: 34px;
            padding: 0 8px 4px;
            background: none;
            border: 1px solid rgba(60, 60, 60, .26);
            border-radius: 4px;
            white-space: normal;
        }

        #{$root}__select {
            width: 48%;
            margin: 0;

            &.is-type {
                width: 60%;
            }

            &.is-halls {
                width: 40%;
            }
        }
    }

    &Date {
        display: flex;
        flex-direction: column;
    }

    &Time {
        width: 25%;
    }

    &Status {
        display: flex;
        align-items: center;
        margin-top: 24px;
        width: 15%;

        input {
            margin-right: 10px;
        }
    }

    &Week {
        margin: 16px 0;
        width: 15%;
        white-space: nowrap;

        input {
            width: 100%;
            padding: 0 8px 4px;
            background: none;
            border: 1px solid rgba(60, 60, 60, .26);
            border-radius: 4px;
            white-space: normal;

        }
    }

    &Notes {
        width: 60%;

        &Text {
            width: 100%;
            height: 34px;
        }
    }

    &__errorMessage {
        color: red;
        transition: .5s;

        &Wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>
