<template lang="pug">
include ../lib/pugDeps.pug

+b.Timetable(ref="formContainer")
    +e.filter(v-if="showFilter")
        +e.studios
            +e.BUTTON.studiosBtn(
                v-for="(item, i) in listVenue"
                :key="i"
                :style="{background:  item.color}"
                @click="handleSwitchVenue(item.id, i)"
            ) {{ item.name }}
        datepicker2(
            lang="ru"
            v-model="dateTime"
            valueType="format"
            clearable
            :first-day-of-week="7"
            width="100%"
            format="YYYY-MM-DD"
        )
        +e.select
            +e.selectName Выбрать учителя
            v-select(
                :options="coach"
                v-model="actualCoach"
            )
        +e.select
            +e.selectName Выбрать клиента
            v-select(
                :options="clients"
                v-model="actualCustomer"
            )
    +e.time
        +e.dataTable(:style="{'background':  currentColor}") Data
        +e.timeBlock(:style="{'top': `-${scrollTime}px`, 'background':  currentColor}")
            +e.TD.td-data(v-for="(item, index) of quantityTime"): +e.timeNumber {{timeCurrent(index)}}
    +b.TABLE.Table
        +e.THEAD.head(:style="{'left': `-${scrollHead}px`}" )
            +e.TR.th-row.is-daysWeek(:style="{'background':  currentColor}")
                +e.TH.th-cell(
                    :colspan="numHalls"
                    v-for="(cell, index) of quantityDay"
                )
                    +e.headDate
                        div(v-if="!isMobileChoose") {{ daysWeek[index] }}
                        div {{dateArr[index]}}
                +e.TR.th-row.is-halls(:style="{'background':  currentColor}")
                    +e.TH.th-cell(
                        v-for="(cell, index) of allDays"
                    )
                        div {{halls[(halsTurn(index + 1)) - 1].name}}
        +e.TBODY.tbody(ref="tableScroll")
            +e.TR.tr-row(
                v-for="(item, indexTr) of quantityTime"
            )
                +e.TD.td-cell(
                    :id="classTd(indexTd, indexTr)"
                    v-for="(cell, indexTd) of allDays"
                    :key="indexTd"
                    @click="showModal($event, indexTr, indexTd)"
                )
                    +e.timeCurrent
                        +e.timeCurrentDefault
                            | {{timeCurrent(indexTr)}}-{{timeCurrent(indexTr + 1)}}
    // modall add
    +e.VMODAL.modal(
        name="modal-add"
        height="auto"
        draggable
        adaptive
        scrollable
        resizable
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
                +e.errorMessage {{errorMessage}}
    // modall record
    Record(
        :time="clickTime"
        :date="dateModal"
        :venue_object_id="currentHall.id"
        @editRecord="editRecord"
        @addRecord="addRecord"
    )
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";
import datepicker2 from "vue2-datepicker";
import { throttle } from "lodash";

import Record from "@/components/Record.vue";

@Component({
    components: {
        datepicker2,
        Record,
    },
})
export default class Timetable extends Vue {
    scrollTable: any = null;
    initDataItem: boolean = true;
    currentTime: number | string = 1;
    scrollHead: number = 0;
    scrollTime: number = 0;

    statusModal: boolean = false;
    quantityWeek: string = "1";
    modalNotes: string = "";
    errorMessage: string = "";
    fullPage: boolean = true;
    currentRecord: number = 0;

    daysWeek: string[] = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
    ];
    flagEditRecord: number = 0;

    @State(state => state.baseTable.activitiesType) activitiesType!: Array<any>;
    @State(state => state.baseTable.show) showFilter!: boolean;
    @State(state => state.baseTable.dateArr) dateArr!: string[];
    @State(state => state.baseTable.allCoach) coach!: string[];
    @State(state => state.baseTable.allClients) clients!: string[];
    @State(state => state.baseTable.listVenueObject) halls!: [{id: number; name: string;}];
    @State(state => state.baseTable.dataTable) dataTable!: any;
    @State(state => state.baseTable.listVenue) listVenue!: string[];
    @State(state => state.baseTable.listRecord) listRecord!: any;
    @State(state => state.baseTable.currentVenue) actualVenue!: any;
    @State(state => state.baseTable.loadedInit) loadedInit!: boolean;
    @State(state => state.baseTable.oneMinInPx) oneMinInPx!: number;
    @State(state => state.baseTable.dataItem) dataItem!: any;
    @State(state => state.baseTable.dateTimeChoose) dateTimeChoose!: any;
    @State(state => state.baseTable.coachChoose) coachChoose!: any;
    @State(state => state.baseTable.customerChoose) customerChoose!: any;
    @State(state => state.baseTable.isMobileChoose) isMobileChoose!: any;
    @State(state => state.baseTable.recordDate) recordDate!: any;
    @State(state => state.baseTable.recordStartTime) recordStartTime!: any;
    @State(state => state.baseTable.recordEndTime) recordEndTime!: any;
    @State(state => state.baseTable.recordCoaches) recordCoaches!: any;
    @State(state => state.baseTable.recordClients) recordClients!: any;
    @State(state => state.baseTable.recordActivityType) recordActivityType!: {
        account_id: number,
        block: number,
        color: string,
        id: number,
        label: string,
    };
    @State(state => state.baseTable.recordHall) recordHall!: {id: number, name: string};
    @State(state => state.baseTable.currentVenueColor) currentVenue!: number;
    @State(state => state.baseTable.weeks) weeks!: number;
    @State(state => state.baseTable.descriptionRecord) descriptionRecord!: string;
    @State(state => state.baseTable.settingsVenue) settingsVenue!: {};
    @State(state => state.record.chooseRecord) record!: {};

    @Mutation setDataTable!: ({}) => void;
    @Mutation setCurrentVenue!: (id: number) => void;
    @Mutation setDateTimeChoose!: (date: string) => void;
    @Mutation setCoachChoose!: (coach: {code: string, label: string}) => void;
    @Mutation setCustomerChoose!: (customer: {code: string, label: string}) => void;
    @Mutation setRecordDate!: (recordData: string) => void;
    @Mutation setRecordStartTime!: (recordStartTime: string) => void;
    @Mutation setRecordEndTime!: (recordEndTime: string) => void;
    @Mutation setRecordCoaches!: (recordCoaches: any) => void;
    @Mutation setRecordClients!: (recordClients: any) => void;
    @Mutation setCurrentVenueColor!: (colorId: number) => void;
    @Mutation setWeeks!: (quantity: number) => void;
    @Mutation setDescriptionRecord!: (text: string) => void;

    @Mutation setRecordActivityType!: (recordActivityType: {
        account_id: number,
        block: number,
        color: string,
        id: number,
        label: string,
    }) => void;
    @Mutation setRecordHall!: (recordHall: {id: number, name: string}) => void;

    @Action initBaseTable!: () => void;
    @Action listVenueObject!: () => void;
    @Action getListRecord!: ({venue_id, date, coach, client}: any) => void;
    @Action createRecord!: ({venue_object_id, activity_id, coaches, clients, number_weeks, description, edit}: any) => void;

    @Watch("dateTimeChoose")
    getActualRecords(value: any) {
        this.serActualDataItem();
    }

    @Watch("actualCoach")
    getActualСoach(value: any) {
        this.serActualDataItem();
    }

    @Watch("customerChoose")
    getActualСustomer(value: any) {
        this.serActualDataItem();
    }

    @Watch("actualVenue")
    setActualVenue(value: any) {
        this.serActualDataItem();
    }

    get quantityDay(): number {
        return this.isMobileChoose
            ? 1
            : 7;
    }


    get clickTime(): string | number {
        return this.minInTime(this.currentTime as number);
    }

    set clickTime(value: string | number) {
        this.currentTime = this.startTime + +value;
    }

    get startTime(): number {
        return this.settingsVenue[this.actualVenue]
            ? this.settingsVenue[this.actualVenue].start_time
            : 510;
    }

    get endTime(): number {
        return this.settingsVenue[this.actualVenue]
            ? this.settingsVenue[this.actualVenue].end_time
            : 1320;
    }

    get gapTime(): number {
        return this.settingsVenue[this.actualVenue]
            ? this.settingsVenue[this.actualVenue].interval
            : 30;
    }


    get dateTime(): string {
        return this.dateTimeChoose;
    }

    set dateTime(value: string) {
        this.setDateTimeChoose(value);
    }

    get actualCoach(): {code: string, label: string} | null {
        return this.coachChoose;
    }

    set actualCoach(value: {code: string, label: string} | null) {
        if(!value) {
            value = {code: "", label: ""};
        }

        this.setCoachChoose(value);
    }

    get actualCustomer(): {code: string, label: string} {
        return this.customerChoose;
    }

    set actualCustomer(value: {code: string, label: string}) {
        if(!value) {
            value = {code: "", label: ""};
        }

        this.setCustomerChoose(value);
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

    get selectTeacherModal(): {code: string, label: string}[] | null {
        return this.recordCoaches;
    }

    set selectTeacherModal(value: {code: string, label: string}[] | null) {
        if(!value) {
            value = [{code: "", label: ""}];
        }

        this.setRecordCoaches(value);
    }

    get selectedChildModal(): {code: string, label: string}[] {
        return this.recordClients;
    }

    set selectedChildModal(value: {code: string, label: string}[]) {
        if(!value) {
            value = [{code: "", label: ""}];
        }

        this.setRecordClients(value);
    }

    get currentHall(): {id: number, name: string} | null {
        return this.recordHall;
    }

    set currentHall(value: {id: number, name: string} | null) {
        if(!value) {
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
        if(!value) {
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

    get numHalls(): number {
        return this.halls.length;
    }

    get allDays(): number {
        return this.numHalls * this.quantityDay;
    }

    get quantityTime(): number {
        return Math.round((this.endTime - this.startTime + this.gapTime) / this.gapTime);
    }

    get currentColor(): string {
        return this.listVenue.length ? (this.listVenue[this.currentVenue]["color" as any]) : "#2f628e";
    }

    serActualDataItem() {
        let venue_id = this.actualVenue,
            date = this.dateTimeChoose,
            coach = this.coachChoose.code,
            client = this.customerChoose.code;

        this.getListRecord({ venue_id, date, coach, client});
    }

    handleSwitchVenue(venueId: number, index: number): void {
        if (this.currentVenue === index) {
            return;
        }

        this.setCurrentVenue(venueId);
        this.setCurrentVenueColor(index);
        this.listVenueObject();
    }

    halsTurn(i: number): number {
        if ( i < (this.numHalls)) {
            return i;
        } else if (!(i % this.numHalls)) {
            return this.numHalls;
        } else return i % this.numHalls;
    }

    timeCurrent(i: number): string {
        let time: number = this.startTime + (i * this.gapTime);
        return this.minInTime(time);
    }

    minInTime(time: number): string {
        let mins: number | string = time % 60,
            hours: number | string  = (time - mins) / 60;

        if (mins < 10)  mins = '0' + mins;
        if (hours < 10) hours = '0' + hours;

        return  hours + ':' + mins;
    }

    classTd(indexTd: any, indexTr: any): string {
        let hallID: string | number = "";

        if (this.halls[(this.halsTurn(indexTd + 1) - 1)]) {
            hallID  = this.halls[(this.halsTurn(indexTd + 1) - 1)].id;
        }

        return indexTr === 0
            ? `${this.dateArr[Math.floor(indexTd / this.numHalls)]}${hallID}`
            : "";
    }

    handleScroll(): void {
        this.scrollTime = document.querySelector(".Table__tbody")!.scrollTop;
        this.scrollHead = document.querySelector(".Table__tbody")!.scrollLeft;
    }

    showModal (event: any, currentRow: number, currentTd: number) {
        const target = event.target;

        let currentDate = Math.floor(currentTd / this.numHalls);
        this.dateModal = this.dateArr[currentDate];
        this.currentHall = this.halls[this.halsTurn(currentTd + 1) - 1];

        if (target.classList.contains('is-record')) {
            this.clickTime = Math.round((event.offsetY + parseInt(target.style.top)) / (60 / this.gapTime));
            const id = target.getAttribute("data-id");
            this.currentRecord = id;
            this.$modal.show('modal-record');
            return;
        }

        this.selectTimeStart = this.timeCurrent((currentRow));
        this.selectTimeEnd = this.timeCurrent((currentRow + 1));

        this.selectTeacherModal = this.actualCoach!.label
            ? [this.actualCoach!]
            : [];

        this.selectedChildModal = this.actualCustomer!.label
            ? [this.actualCustomer!]
            : [];

        this.currentType = this.activitiesType[0];

        this.$modal.show('modal-add');
    }

    submitForm(): void {
        this.errorMessage = "";

        const venue_object_id = this.recordHall.id,
            activity_id = this.recordActivityType.id,
            coaches = this.recordCoaches!.map((name: {code: string, label: string}) => name.code),
            clients = this.recordClients!.map((name: {code: string, label: string}) => name.code),
            number_weeks = this.weeks,
            description = this.descriptionRecord;

        if (!this.dateModal || !this.selectTimeStart || !this.selectTimeEnd || !activity_id || !venue_object_id) {
            this.errorMessage = "Введите все обязательные поля";
            return;
        }

        this.createRecord({venue_object_id, activity_id, coaches, clients, number_weeks, description, edit: this.flagEditRecord});

        this.currentRecord = 0;
        this.$modal.hide('modal-add');
        this.$modal.hide('modal-record');
    }

    setScrollTable(): void {
        this.scrollTable = this.$refs.tableScroll;

        if (this.scrollTable) {
            this.scrollTable!.addEventListener("scroll", throttle(this.handleScroll, 50));
        }
    }

    editRecord() {
        this.dateModal = this.record.date;
        this.selectTimeStart = this.minInTime(this.record.start_time);
        this.selectTimeEnd = this.minInTime(this.record.end_time);

        let coaches = this.record.coaches.map(item => {
            return {
                code: item.person_id,
                label: `${item.first_name} ${item.second_name}`,
            };
        });

        let customer = this.record.clients.map(item => {

            return {
                code: item.person_id,
                label: `${item.first_name} ${item.second_name}`,
            };
        });

        this.selectTeacherModal = coaches;
        this.selectedChildModal = customer;
        this.currentType = {
            account_id: 1,
            block: 1,
            color: "",
            id: this.record.activity_id,
            label: this.record.activity_type_name,
        };
        this.currentHall = {
            name: this.record.venue_object_name,
            id: this.record.venue_object_id,
        };
        this.currentWeeks = 1;
        this.currentDescriptionRecord = this.record.description;

        this.flagEditRecord = this.record.id;

        this.$modal.show('modal-add');
    }

    addRecord() {
        this.dateModal = this.record.date;
        this.selectTimeStart = this.minInTime(this.record.start_time);
        this.selectTimeEnd = this.minInTime(this.record.end_time);
        this.currentHall = {
            name: this.record.venue_object_name,
            id: this.record.venue_object_id,
        };
        this.currentWeeks = 1;
        this.$modal.show('modal-add');
    }

    @Watch("dataItem")
    getDataItem(value: any) {
        this.initDataItem = true;
        this.setDataItem();
    }

    @Watch("loadedInit")
    updateDataItem(value: any) {
        if (value) {
            this.initDataItem = true;
            this.setDataItem();
        }
    }

    setDataItem() {
        if (this.initDataItem) {
            const value = this.dataItem,
                oldRecord = document.querySelectorAll(".is-record");

            for (let i = 0; i < oldRecord.length; i++) {
                oldRecord[i].remove();
            }

            for (let key = 0; key < value.length; key++) {

                let idRecord = Object.keys(value[key])[0],
                    record = value[key][idRecord],
                    dataAdd = document.getElementById(idRecord),
                    itemData = document.createElement("div"),
                    itemDataChild = document.createElement("div");

                if (!dataAdd) {
                    return;
                }

                itemData!.style.top = record[0] + "px";
                itemData!.style.height = record[1] + "px";
                itemData!.style.background = record[2];
                itemData.setAttribute("data-id", record[7]);
                itemData!.innerHTML = `${this.minInTime(record[3])}-${this.minInTime(record[4])} `;
                itemData!.classList.add("is-record");

                if (record[5].length || record[6].length) {
                    let customer = "",
                        coach = "";

                    if (record[5].length) {
                        customer = `<div>Кл: ${record[5]}</div>`;
                    }

                    if (record[6].length) {
                        coach = `<div>Тр: ${record[6]}</div>`
                    }

                    itemDataChild!.innerHTML = `${customer}${coach}`;
                    itemDataChild!.classList.add("is-record-tooltip");
                    itemData!.appendChild(itemDataChild);
                }

                dataAdd!.appendChild(itemData);
            }

            this.initDataItem = false;
        }
    }

    created() {
        if (!this.loadedInit) {
            this.initBaseTable();
        }
    }

    mounted() {
        this.setScrollTable();
        this.setDataItem();
    }

    updated() {
        this.setDataItem();
    }
}
</script>

<style lang="scss" scoped>
.Timetable {
    $root: &;
    display: flex;
    height: calc(100vh - 60px);
    overflow: hidden;

    &__filter {
        min-width: 250px;
        margin: 20px;
    }

    &__studios {
        &Btn {
            display: block;
            border: none;
            cursor: pointer;
            padding: 5px 10px;
            margin-bottom: 15px;
            border-radius: 5px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, .3);
            outline:none;
            @include font(14, $white);

            &:not(:last-child) {
                margin-right: 30px;
            }

            &:hover {
                opacity: 0.8;
            }

            &.is-orange {
                background: $orange;
            }

            &.is-violet {
                background: $violet;
            }

            &.is-blue {
                background: $blue;
            }
        }
    }

    &__select {
        margin: 20px 0;
    }

    &__timeBlock, &__dataTable {
        padding: 0 10px;
        text-align: center;

        &.is-orange {
            background: $orange;
        }

        &.is-violet {
            background: $violet;
        }

        &.is-blue {
            background: $blue;
        }
    }

    &__time {
        &Block {
            position: relative;
            display: flex;
            flex-direction: column;
            color: #fff;
        }

        &Number {
            top: -5px;
            position: relative;
        }
    }

    & &__dataTable {
        position: relative;
        padding: 22px 0;
        height: 84px;
        z-index: 99;
        color: #fff;
        border-top: 2px solid;
    }

    &__td-data {
        height: 60px;
    }

    .Table {
        display: block;
        table-layout: fixed;
        border-collapse: collapse;
        overflow: hidden;
        transition: 3s;

        &,
        th,
        td {
            border: 1px solid #f2f2f2;
            color: #fff;
        }

        td {
            height: 60px;
            position: relative;
        }

        .greenInd {
            background: green;
        }

        .redInd {
            background-color: red;
        }

        &__td-cell {
            cursor: pointer;

            #{$root}__timeCurrent {
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        &__head {
            display: block;
            position: relative;

            &.is-orange {
                .Table__th-row {
                    background: $orange;
                }
            }

            &.is-violet {
                .Table__th-row {
                    background: $violet;
                }
            }

            &.is-blue {
                .Table__th-row {
                    background: $blue;
                }
            }

            &Date {
                display: flex;
                justify-content: space-between;
                margin: 0 20px;
                white-space: nowrap;
                overflow-x: auto;
            }
        }

        &__tbody {
            display: block;
            height: calc(100vh - 146px);
            overflow: auto;
        }

        &__timeCurrent {
            color: grey;
            font-size: 10px;

            &Modal {
                display: none;
            }
        }

        &__th-cell, &__td-cell {
            min-width: 100px;
            max-width: 100px;
            text-align: center;

            &.is-number {
                width: 90px;
            }
        }

        &__th-cell {
            padding: 8px 0;
            position: relative;

            &.green {
                background: green;
            }
        }

        &__tr-row {
            transition: .2s;

            &:hover {
                background-color: #f9f9f9;
            }
        }
    }

    &__modal {
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
                border: 1px solid rgba(60,60,60,.26);
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
                border: 1px solid rgba(60,60,60,.26);
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
<style lang="scss">
.Timetable {
    &__modal {
        .v--modal {
            padding: 30px;
        }
    }

    .Table {
        &__td-cell {
            .is-record {
                position: absolute;
                top: 0;
                color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                left: 6px;
                right: 6px;
                height: 100px;
                border: 2px solid white;
                z-index: 9;
                transition: .2s;
                box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
                @include Semibold($c-header, 10);

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, .5);

                    & > .is-record-tooltip {
                        opacity: 1;
                        transition: opacity .2s .5s;
                        visibility: visible;
                    }
                }

                &-tooltip {
                    display: block;
                    position: absolute;
                    bottom: 68px;
                    transition: .3s;
                    box-shadow: 0 0 12px 0 rgba(0,0,0,.2);
                    padding: 6px;
                    z-index: 2;
                    font-size: 12px;
                    visibility: hidden;
                    opacity: 0;
                    background: $white;
                    width: auto;

                    & > div {
                        white-space: nowrap;
                    }

                    &:after {
                        content: "";
                        position: absolute;
                        bottom: -10px;
                        left: 50%;
                        width: 12px;
                        height: 12px;
                        transform: rotate(45deg) translateX(-50%);
                        box-shadow: 5px 5px 10px 0 rgba(0,0,0,.2);
                        background: $white;
                    }
                }
            }
        }
    }
}
</style>
