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
                label="label"
                :options="coach"
                v-model="actualCoach"
            )

        +e.select
            +e.selectName Выбрать клиента
            v-select(
                label="label"
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
                    v-for="(cell, index) of allDays"
                )
                    +e.headDate
                        div {{ daysWeek[index] }}
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
                    @click="showModal(indexTr, indexTd)"
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
    )

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
                )

            +e.modalTime
                | Окончания*
                input(
                    type="tel"
                    v-mask="'##:##'"
                    v-model="selectTimeEnd"
                )

        +e.modalWrap
            +e.select
                +e.selectName Выбрать учителя
                v-select(
                    multiple
                    :options="coach"
                    v-model="selectTeacherModal"
                    :reduce="label => label.code"
                )

            +e.select
                +e.selectName Выбрать клиента
                v-select(
                    multiple
                    :options="clients"
                    v-model="selectedChildModal"
                    :reduce="label => label.code"
                )
        +e.modalWrap
            +e.select.is-type
                +e.selectName Тип занятия*
                v-select(
                    label="name"
                    :options="activitiesType"
                    v-model="currentType"
                    :reduce="name => name.id"
                )

            +e.select.is-halls
                +e.selectName Зал*
                v-select(
                    label="name"
                    :options="halls"
                    v-model="currentHall"
                    :reduce="name => name.id"
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
            +e.BUTTON.modalSubmit.btn.btn-success(@click="submitForm") Отправить
            +e.errorMessage {{errorMessage}}
    loading(
        :active.sync="loadedComponent"
        :is-full-page="fullPage"
    )
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";
import datepicker2 from "vue2-datepicker";
import { throttle } from "lodash";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

@Component({
    components: {
        datepicker2,
        Loading,
    },
})
export default class Timetable extends Vue {
    scrollTable: any = null;
    currentVenue: number = 0;
    initDataItem: boolean = true;
    startTime: number = 510;
    endTime: number = 1320;
    scrollHead: number = 0;
    scrollTime: number = 0;

    selectTeacherModal: Array<any> = [];
    selectedChildModal: Array<any> = [];
    currentType: string = "";
    currentHall: string = "";
    statusModal: boolean = false;
    quantityWeek: string = "1";
    modalNotes: string = "";
    errorMessage: string = "";
    fullPage: boolean = true;

    daysWeek: string[] = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
    ];

    //modal changed
    currentChangeArr: string = "loading";

    @State(state => state.baseTable.activitiesType) activitiesType!: Array<any>;
    @State(state => state.baseTable.show) showFilter!: boolean;
    @State(state => state.baseTable.dateArr) dateArr!: string[];
    @State(state => state.baseTable.allCoach) coach!: string[];
    @State(state => state.baseTable.allClients) clients!: string[];
    @State(state => state.baseTable.listVenueObject) halls!: [{id: number; name: string; venue_id: number}];
    @State(state => state.baseTable.dataTable) dataTable!: any;
    @State(state => state.baseTable.listVenue) listVenue!: string[];
    @State(state => state.baseTable.listRecord) listRecord!: any;
    @State(state => state.baseTable.currentVenue) actualVenue!: any;
    @State(state => state.baseTable.loadedComponent) loadedComponent!: boolean;
    @State(state => state.baseTable.gapTime) gapTime!: number;
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

    @Mutation setDataTable!: ({}) => void;
    @Mutation setCurrentVenue!: (id: number) => void;
    @Mutation setDateTimeChoose!: (date: string) => void;
    @Mutation setCoachChoose!: (coach: {code: string, label: string}) => void;
    @Mutation setCustomerChoose!: (customer: {code: string, label: string}) => void;
    @Mutation setRecordDate!: (recordData: string) => void;
    @Mutation setRecordStartTime!: (recordStartTime: string) => void;
    @Mutation setRecordEndTime!: (recordEndTime: string) => void;
    @Mutation setRecordCoaches!: (recordCoaches: string[]) => void;
    @Mutation setRecordClients!: (recordClients: string[]) => void;

    @Action initBaseTable!: () => void;
    @Action getListRecord!: ({venue_id, date, coach, client, mobile}: any) => void;
    @Action createRecord!: ({venue_object_id, activity_id, coaches, clients}: any) => void;

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

    get numHalls(): number {
        return this.halls.length;
    }

    get allDays(): number {
        return this.numHalls * 7;
    }

    get quantityTime(): number {
        return Math.round((this.endTime - this.startTime + this.gapTime) / this.gapTime);
    }

    get allTime(): string[] {
        let arr = [];
        for (let i = 0; i < this.quantityTime; i++) {
            arr.push(this.timeCurrent(i));
        }

        return arr;
    }

    get currentColor(): string {
        return this.listVenue.length ? (this.listVenue[this.currentVenue]["color" as any]) : "#2f628e";
    }

    serActualDataItem() {
        let venue_id = this.actualVenue,
            date = this.dateTimeChoose,
            coach = this.coachChoose.code,
            client = this.customerChoose.code,
            mobile = this.isMobileChoose;

        this.getListRecord({ venue_id, date, coach, client, mobile});
    }

    handleSwitchVenue(venueId: number, index: number): void {
        if (this.currentVenue === index) {
            return;
        }

        this.setCurrentVenue(venueId);
        this.currentVenue = index;
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

    showModal (currentRow: number, currentTd: number) {
        this.dateModal =
        this.selectTimeStart = this.timeCurrent((currentRow));
        this.selectTimeEnd = this.timeCurrent((currentRow + 1));

        let currentDate = Math.floor(currentTd / this.numHalls);
        this.dateModal = this.dateArr[currentDate];
        // this.currentHall = this.halls[this.halsTurn(currentTd)];
        this.$modal.show('modal-add');
    }

    submitForm(): void {
        this.errorMessage = "";

        const venue_object_id = this.currentHall,
            activity_id = this.currentType,
            coaches = this.selectTeacherModal,
            clients = this.selectedChildModal;

        if (!this.dateModal || !this.selectTimeStart || !this.selectTimeEnd || !activity_id || !venue_object_id) {
            this.errorMessage = "Введите все обязательные поля";

            return;
        }

        this.createRecord({venue_object_id, activity_id, coaches, clients});
    }

    setScrollTable(): void {
        this.scrollTable = this.$refs.tableScroll;

        if (this.scrollTable) {
            this.scrollTable!.addEventListener("scroll", throttle(this.handleScroll, 50));
        }
    }

    @Watch("dataItem")
    getDataItem(value: any) {
        this.initDataItem = true;
        this.setDataItem();
    }

    setDataItem() {
        if (this.initDataItem) {
            const value = this.dataItem,
                oldRecord = document.querySelectorAll(".is-record");

            for (let i = 0; i < oldRecord.length; i++) {
                oldRecord[i].remove();
            }

            for (let key in value) {
                let dataAdd = document.getElementById(key),
                    itemData = document.createElement("div");

                if (!dataAdd) {
                    return;
                }

                itemData!.style.top = value[key][0] + "px";
                itemData!.style.height = value[key][1] + "px";
                itemData!.style.background = value[key][2];
                itemData!.innerHTML = `${this.minInTime(value[key][3])}-${this.minInTime(value[key][4])} <div>${value[key][5]} <br>${value[key][6]} </div>`;
                itemData!.classList.add("is-record");

                dataAdd!.appendChild(itemData);
            }

            this.initDataItem = false;
        }
    }

    created() {
        if (this.loadedComponent) {
            this.initBaseTable();
        }
    }

    mounted() {
        this.setScrollTable();
    }

    updated() {
        this.setScrollTable();
        this.setDataItem();
    }
}
</script>

<style lang="scss" scoped>
.Timetable {
    $root: &;
    display: flex;
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
        height: 101px;
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
            height: 101px;
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
                flex-wrap: wrap;
                margin: 0 20px;
            }
        }

        &__tbody {
            display: block;
            height: calc(100vh - 146px);
            overflow: auto;
        }

        &__timeCurrent {
            color: grey;

            &Modal {
                display: none;
            }
        }

        &__th-cell, &__td-cell {
            min-width: 150px;
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
            justify-content: space-between;
            margin-bottom: 20px;

            #{$root}__select {
                width: 48%;
                margin: 0;

                &.is-type {
                    width: 70%;
                }

                &.is-halls {
                    width: 25%;
                }
            }
        }

        &Date {
            display: flex;
            flex-direction: column;
        }

        &Time {
            width: 25%;

            input {
                width: 100%;
                height: 34px;
                padding: 0 8px 4px;
                background: none;
                border: 1px solid rgba(60,60,60,.26);
                border-radius: 4px;
                white-space: normal;
            }
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

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 20px rgba(0, 0, 0, .5);
                }
            }
        }
    }
}
</style>
