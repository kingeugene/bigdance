<template lang="pug">
include ../lib/pugDeps.pug

+b.Calendar
    +e.time
        +e.dataTable(:style="{'background':  colorVenue}") Data
        +e.timeBlock(:style="{'top': `-${scrollTime}px`, 'background':  colorVenue}")
            +e.TD.td-data(v-for="(item, index) of quantityTime"): +e.timeNumber {{timeCurrent(index)}}
    +b.TABLE.Table
        +e.THEAD.head(:style="{'left': `-${scrollHead}px`}" )
            +e.TR.th-row.is-daysWeek(:style="{'background':  colorVenue}")
                +e.TH.th-cell(:colspan="numHalls" v-for="(cell, index) of quantityDay")
                    +e.headDate
                        div(v-if="!isMobileChoose") {{ daysWeek[index] }}
                        div(v-else) {{ dayOfWeek(dateArr[index]) }}
                        div {{dateArr[index]}}
                +e.TR.th-row.is-halls(:style="{'background':  colorVenue}")
                    +e.TH.th-cell(v-for="(cell, index) of allDays")
                        div {{halls[(halsTurn(index + 1)) - 1].name}}
        +e.TBODY.tbody(ref="tableScroll")
            +e.TR.tr-row(v-for="(item, indexTr) of quantityTime")
                +e.TD.td-cell(
                    :id="classTd(indexTd, indexTr)"
                    :class="{'is-border': !((indexTd + 1) % numHalls) }"
                    v-for="(cell, indexTd) of allDays"
                    :key="indexTd"
                    @click="showModal($event, indexTr, indexTd)"
                )
                    +e.timeCurrent
                        +e.timeCurrentDefault
                            | {{timeCurrent(indexTr)}}-{{timeCurrent(indexTr + 1)}}

    Record(
        :recordId="+currentRecord"
        :time="clickTime"
        :date="dateModal"
        :venue_object_id="currentHall.id"
        @editRecord="editRecord"
        @addRecord="addRecord"
    )
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Action, Mutation, State, Getter} from "vuex-class";
import {throttle} from "lodash";

import Record from "@/components/Record.vue";
import {daysWeek} from "@/constants";
import {minutesToTime} from "@/lib/helpers";

@Component({
    components: {
        datepicker: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseDatePicker.vue"),
        basebutton: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseButton.vue"),
        baseselect: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseSelect.vue"),
        Record,
    },
    data: () => {
        return {
            daysWeek
        }
    }
})
export default class Calendar extends Vue {
    scrollTime = 0;
    scrollHead = 0;


    @State(state => state.calendar.listHalsVenueAll) hallsVenue!: [{ id: number; name: string; }];
    @State(state => state.calendar.currentVenue) currentVenue!: any;

    @Getter("colorVenue") colorVenue!: string;
    @Getter("intervalVenue") intervalVenue!: number;
    @Getter("startTimeVenue") startTimeVenue!: number;
    @Getter("endTimeVenue") endTimeVenue!: number;

    get quantityTime(): number {
        return Math.round((this.endTimeVenue - this.startTimeVenue + this.intervalVenue) / this.intervalVenue);
    }

    get halls(): TypeHalsVenueApi {
        return this.hallsVenue[this.currentVenue];
    }

    get numHalls(): number {
        return this.halls.length;
    }

    timeCurrent(i: number): string {
        return minutesToTime(this.startTimeVenue + (i * this.intervalVenue));
    }

    handleScroll(): void {
        this.scrollTime = document.querySelector(".Table__tbody")!.scrollTop;
        this.scrollHead = document.querySelector(".Table__tbody")!.scrollLeft;
    }

    setScrollTable(): void {
        this.scrollTable = this.$refs.tableScroll;

        if (this.scrollTable) {
            this.scrollTable!.addEventListener("scroll", throttle(this.handleScroll, 50));
        }
    }

    mounted() {
        this.setScrollTable();
        this.setDataItem();
    }

    updated() {
        this.setDataItem();
    }

    destroyed() {
        window.removeEventListener("scroll", this.handleScroll)
    }




































    modalNotes: string = "";
    quantityWeek: string = "1";

    scrollTable: any = null;
    initDataItem: boolean = true;
    currentTime: number | string = 1;

    statusModal: boolean = false;
    fullPage: boolean = true;
    currentRecord: number = 0;

    flagEditRecord: number = 0;

    @State(state => state.calendar.activitiesType) activitiesType!: Array<any>;
    @State(state => state.calendar.dateArr) dateArr!: string[];
    @State(state => state.calendar.allCoach) coach!: string[];
    @State(state => state.calendar.allClients) clients!: string[];
    @State(state => state.calendar.dataTable) dataTable!: any;
    @State(state => state.calendar.listVenue) listVenue!: string[];
    @State(state => state.calendar.listRecord) listRecord!: any;
    @State(state => state.calendar.oneMinInPx) oneMinInPx!: number;
    @State(state => state.calendar.dataItem) dataItem!: any;
    @State(state => state.calendar.dateTimeChoose) dateTimeChoose!: any;
    @State(state => state.calendar.coachChoose) coachChoose!: any;
    @State(state => state.calendar.customerChoose) customerChoose!: any;
    @State(state => state.calendar.isMobileChoose) isMobileChoose!: any;
    @State(state => state.calendar.recordDate) recordDate!: any;
    @State(state => state.calendar.recordStartTime) recordStartTime!: any;
    @State(state => state.calendar.recordEndTime) recordEndTime!: any;
    @State(state => state.calendar.recordCoaches) recordCoaches!: any;
    @State(state => state.calendar.recordClients) recordClients!: any;
    @State(state => state.calendar.recordActivityType) recordActivityType!: {
        account_id: number,
        block: number,
        color: string,
        id: number,
        label: string,
    };
    @State(state => state.calendar.recordHall) recordHall!: { id: number, name: string };
    //@State(state => state.calendar.currentVenueColor) currentVenue!: number;
    @State(state => state.calendar.weeks) weeks!: number;
    @State(state => state.calendar.descriptionRecord) descriptionRecord!: string;
    @State(state => state.calendar.settingsVenue) settingsVenue!: {};
    @State(state => state.calendar.week_day) week_day!: string;
    @State(state => state.record.chooseRecord) record!: {};


    @Mutation setDataTable!: ({}) => void;
    @Mutation setCurrentVenue!: (id: number) => void;
    @Mutation setDateTimeChoose!: (date: string) => void;
    @Mutation setCoachChoose!: (coach: { code: string, label: string }) => void;
    @Mutation setCustomerChoose!: (customer: { code: string, label: string }) => void;
    @Mutation setRecordDate!: (recordData: string) => void;
    @Mutation setRecordStartTime!: (recordStartTime: string) => void;
    @Mutation setRecordEndTime!: (recordEndTime: string) => void;
    @Mutation setRecordCoaches!: (recordCoaches: any) => void;
    @Mutation setRecordClients!: (recordClients: any) => void;
    @Mutation setWeeks!: (quantity: number) => void;
    @Mutation setDescriptionRecord!: (text: string) => void;

    @Mutation setRecordActivityType!: (recordActivityType: {
        account_id: number,
        block: number,
        color: string,
        id: number,
        label: string,
    }) => void;
    @Mutation setRecordHall!: (recordHall: { id: number, name: string }) => void;

    @Action listVenueObject!: () => void;
    @Action getListRecord!: ({venue_id, date, coach, client, slide}: any) => void;

    @Watch("dateTimeChoose")
    getActualRecords(value: any) {
        this.serActualDataItem();
    }

    @Watch("actualCoach")
    getActualСoach(value: any) {
        this.initDataItem = true;
        this.setDataItem();
        // this.serActualDataItem();
    }

    @Watch("customerChoose")
    getActualСustomer(value: any) {
        this.initDataItem = true;
        this.setDataItem();
        // this.serActualDataItem();
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
        return minutesToTime(this.currentTime as number);
    }

    set clickTime(value: string | number) {
        this.currentTime = this.startTimeVenue + +value;
    }


    get dateTime(): string {
        return this.dateTimeChoose;
    }

    set dateTime(value: string) {
        this.setDateTimeChoose(value);
    }

    get actualCoach(): { code: string, label: string } | null {
        return this.coachChoose;
    }

    set actualCoach(value: { code: string, label: string } | null) {
        if (!value) {
            value = {code: "", label: ""};
        }

        this.setCoachChoose(value);
    }

    get actualCustomer(): { code: string, label: string } {
        return this.customerChoose;
    }

    set actualCustomer(value: { code: string, label: string }) {
        if (!value) {
            value = {code: "", label: ""};
        }

        debugger;

        this.setCustomerChoose(value);
    }



    dayOfWeek(day: string): string {
        return day
            ? daysWeek[new Date(day.replace("-", ", ")).getDay() - 1]
            : "";
    }

    get allDays(): number {
        return this.numHalls * this.quantityDay;
    }

    serActualDataItem(slide = "") {
        let venue_id = this.actualVenue,
            date = this.dateTimeChoose,
            coach = this.coachChoose.code,
            client = this.customerChoose.code;

        this.getListRecord({venue_id, date, coach, client});
    }

    slideActualDataItem(slide: string): void {
        let venue_id = this.actualVenue,
            date = this.dateArr[0],
            coach = this.coachChoose.code,
            client = this.customerChoose.code;

        this.getListRecord({venue_id, date, coach, client, slide});
    }

    halsTurn(i: number): number {
        if (i < (this.numHalls)) {
            return i;
        } else if (!(i % this.numHalls)) {
            return this.numHalls;
        } else return i % this.numHalls;
    }

    classTd(indexTd: any, indexTr: any): string {
        let hallID: string | number = "";

        if (this.halls[(this.halsTurn(indexTd + 1) - 1)]) {
            hallID = this.halls[(this.halsTurn(indexTd + 1) - 1)].id;
        }

        return indexTr === 0
            ? `${this.dateArr[Math.floor(indexTd / this.numHalls)]}${hallID}`
            : "";
    }

    showModal(event: any, currentRow: number, currentTd: number) {
        const target = event.target;

        let currentDate = Math.floor(currentTd / this.numHalls);
        this.dateModal = this.dateArr[currentDate];
        this.currentHall = this.halls[this.halsTurn(currentTd + 1) - 1];

        if (target.classList.contains('is-record')) {
            this.clickTime = Math.round((event.offsetY + parseInt(target.style.top || 0)) / (60 / this.intervalVenue));
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

    editRecord(index) {
        this.dateModal = this.record[index].date;
        this.selectTimeStart = minutesToTime(this.record[index].start_time);
        this.selectTimeEnd = minutesToTime(this.record[index].end_time);

        let coaches = this.record[index].coaches.map(item => {
            return {
                code: item.person_id,
                label: `${item.first_name} ${item.second_name}`,
            };
        });

        let customer = this.record[index].clients.map(item => {

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
            id: this.record[index].activity_id,
            label: this.record[index].activity_type_name,
        };
        this.currentHall = {
            name: this.record[index].venue_object_name,
            id: this.record[index].venue_object_id,
        };
        this.currentWeeks = 1;
        this.currentDescriptionRecord = this.record[index].description;

        this.flagEditRecord = this.record[index].id;

        this.$modal.show('modal-add');
    }

    addRecord() {
        this.dateModal = this.record[0].date;
        this.selectTimeStart = minutesToTime(this.record[0].start_time);
        this.selectTimeEnd = minutesToTime(this.record[0].end_time);
        this.currentHall = {
            name: this.record[0].venue_object_name,
            id: this.record[0].venue_object_id,
        };
        this.currentWeeks = 1;
        this.$modal.show('modal-add');
    }

    @Watch("dataItem")
    getDataItem(value: any) {
        this.initDataItem = true;
        this.setDataItem();
    }

    setDataItem() {
        if (this.initDataItem) {
            console.log(this.dataItem);
            const value = this.dataItem,
                oldRecord = document.querySelectorAll(".is-record");

            for (let i = 0; i < oldRecord.length; i++) {
                oldRecord[i].remove();
            }

            for (let key = 0; key < value.length; key++) {

                let idRecord = Object.keys(value[key])[0];
                let record = value[key][idRecord];

                if (this.actualCoach!.code) {
                    if (record[5].some(item => item.id != this.actualCoach!.code) || !record[5].length) {
                        continue;
                    }
                }

                if (this.actualCustomer!.code) {
                    if (record[6].some(item => item.id != this.actualCustomer!.code) || !record[6].length) {
                        continue;
                    }
                }

                let dataAdd = document.getElementById(idRecord),
                    itemData = document.createElement("div");
                if (!dataAdd) {
                    return;
                }

                itemData!.style.top = record[0] + "px";
                itemData!.style.height = record[1] + "px";
                itemData!.style.background = record[2];
                itemData.setAttribute("data-id", record[7]);
                itemData!.innerHTML = `${minutesToTime(record[3])}-${minutesToTime(record[4])}`;
                itemData!.classList.add("is-record");

                dataAdd!.appendChild(itemData);
            }

            this.initDataItem = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.Calendar {
    $root: &;
    display: flex;
    height: calc(100vh - 60px);
    overflow: hidden;

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

            &.is-border {
                border-right: 3px solid #777777;
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

    &__arrowLeft,
    &__arrowRight {
        position: absolute;
        bottom: 20px;
        font-size: 40px;
        font-weight: bold;
        color: $orange;
        z-index: 9999;
    }

    &__arrowLeft {
        left: 20px;
    }

    &__arrowRight {
        right: 20px;
    }
}
</style>
<style lang="scss">
.Calendar {
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
                    position: fixed;
                    bottom: 68px;
                    transition: .3s;
                    box-shadow: 0 0 12px 0 rgba(0, 0, 0, .2);
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
                        box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, .2);
                        background: $white;
                    }
                }
            }
        }
    }
}
</style>
