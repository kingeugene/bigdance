<template lang="pug">
include ../lib/pugDeps.pug

+b.Timetable
    +e.filter(v-if="showFilter")
        +e.studios
            +e.BUTTON.studiosBtn(
            v-for="item in studios"
            :class="`is-${item.color}`"
            @click="changeColor(item.color)"
            ) {{ item.name }}

        datepicker2(
            lang="ru"
            v-model="dateTime"
            valueType="format"
            clearable
            :first-day-of-week="7"
            width="100%"
            format="DD-MM-YYYY"
        )

        +e.select
            +e.selectName Выбрать учителя
            v-select(
                :options="teacher"
                v-model="selectedTeacher"
            )

        +e.select
            +e.selectName Выбрать клиента
            v-select(
                :options="clients"
                v-model="selectedChild"
            )

    +e.time
        +e.dataTable(:class="`is-${colorTable}`") Data
        +e.timeBlock(:style="{'top': `-${scrollTime}px`}" :class="`is-${colorTable}`")
            +e.TD.td-data(v-for="(item, index) of quantityTime"): +e.timeNumber {{timeCurrent(index)}}
    +b.TABLE.Table
        +e.THEAD.head(:class="`is-${colorTable}`" :style="{'left': `-${scrollHead}px`}" )
            +e.TR.th-row.is-daysWeek
                +e.TH.th-cell(
                    :colspan="numHalls"
                    v-for="(cell, index) of 7"
                )
                    +e.headDate
                        div {{ daysWeek[index] }}
                        div {{dateArr[index]}}
                +e.TR.th-row.is-halls
                    +e.TH.th-cell(
                        v-for="(cell, index) of allDays"
                  ) {{halsTurn(index + 1)}}
        +e.TBODY.tbody
            +e.TR.tr-row(
                v-for="(item, indexTr) of quantityTime"
            )
                +e.TD.td-cell(
                    v-for="(cell, indexTd) of allDays"
                    :id="classTd(indexTd, indexTr)"
                )
                    +e.timeCurrent
                        +e.timeCurrentDefault(
                            @click="showModal(indexTr, indexTd)"
                        )
                            | {{timeCurrent(indexTr)}}
                    +e.timeCurrentModal(
                        @click="showModalCurrent(indexTr, indexTd)"
                    )
    // modall add
    +e.VMODAL.modal(
        name="modal-add"
        height="auto"
        draggable
        adaptive
        scrollable
        resizable
    )
        +e.modalDate
            datepicker2(
                lang="ru"
                v-model="dateModal"
                valueType="format"
                clearable
                :first-day-of-week="1"
                format="DD-MM-YYYY"
            )
        +e.modalTime
            | Время начала
            v-select(
                :options="allTime"
                v-model="selectTimeStart"
            )

        +e.modalTime
            | Время окончания
            v-select(
                :options="allTime"
                v-model="selectTimeEnd"
            )

        +e.select
            +e.selectName Выбрать учителя
            v-select(
                :options="teacher"
                v-model="selectTeacherModal"
            )

        +e.select
            +e.selectName Выбрать клиента
            v-select(
                :options="clients"
                v-model="selectedChildModal"
            )
        +e.select
            +e.selectName Выбрать тип занятия
            v-select(
                :options="typeLessons"
                v-model="currentType"
            )

        +e.select
            +e.selectName Выбрать зал
            v-select(
                :options="halls"
                v-model="currentHall"
            )
        +e.modalStatus
            +e.INPUT(type="checkbox" v-model="statusModal")
            | Статус

        +e.modalWeek
            +e.modalWeekName Введите количество недель (для регулярных занятий)
            +e.INPUT(type="text" v-model="quantityWeek")

        +e.modalNotes
            +e.modalNotesName Справка
            +e.TEXTAREA.modalNotesText(v-model="modalNotes")

        +e.BUTTON.modalSubmit(@click="submitForm") Отправить

    //modal changed
    +e.VMODAL.modal(
        v-if="currentChangeArr !== 'loading'"
        name="modal-changed"
        height="auto"
        draggable
        adaptive
        scrollable
        resizable
    )
        +e.modalDate
            datepicker2(
                lang="ru"
                v-model="dateModal"
                valueType="format"
                clearable
                :first-day-of-week="1"
                format="DD-MM-YYYY"
            )
        +e.modalTime
            | Время начала
            v-select(
                :options="allTime"
                v-model="dataTable[currentChangeArr][0]"
            )

        +e.modalTime
            | Время окончания
            v-select(
                :options="allTime"
                v-model="dataTable[currentChangeArr][3]"
            )

        +e.select
            +e.selectName Выбрать учителя
            v-select(
                :options="teacher"
                v-model="dataTable[currentChangeArr][4]"
            )

        +e.select
            +e.selectName Выбрать клиента
            v-select(
                :options="clients"
                v-model="dataTable[currentChangeArr][5]"
            )
        +e.select
            +e.selectName Выбрать тип занятия
            v-select(
                :options="typeLessons"
                v-model="dataTable[currentChangeArr][6]"
            )

        +e.select
            +e.selectName Выбрать зал
            v-select(
                :options="halls"
                v-model="currentHall"
            )
        +e.modalStatus
            +e.INPUT(type="checkbox" v-model="dataTable[currentChangeArr][7]")
            | Статус

        +e.modalWeek
            +e.modalWeekName Введите количество недель (для регулярных занятий)
            +e.INPUT(type="text" v-model="dataTable[currentChangeArr][8]")

        +e.modalNotes
            +e.modalNotesName Справка
            +e.TEXTAREA.modalNotesText(v-model="dataTable[currentChangeArr][9]")

        +e.BUTTON.modalSubmit(@click="submitForm") Изменить

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from "vuex-class";
import datepicker2 from "vue2-datepicker";
import datepicker from "vuejs-datepicker";
import { throttle } from "lodash";

@Component({
    components: {
        datepicker,
        datepicker2,
    },
})
export default class Timetable extends Vue {
    startTime: number = 510;
    endTime: number = 1320;
    gapTime: number = 30;
    oneMinInPx: number = 102 / this.gapTime;
    scrollHead: number = 0;
    scrollTime: number = 0;
    colorTable: string = "blue";
    selectedTeacher: string = "";
    selectedChild: string = "";

    selectTimeStart: string = "";
    selectTimeEnd: string = "";
    selectTeacherModal: string = "";
    selectedChildModal: string = "";
    dateTime: string = "";
    dateModal: string = "";
    currentType: string = "Индивидуальные занятие";
    currentHall: string = "";
    statusModal: boolean = false;
    quantityWeek: string = "1";
    modalNotes: string = "";

    daysWeek: string[] = [
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье",
    ];
    studios: {name: string, color: string}[] = [
            {
              name: "Студия Подол",
              color: "orange",
            },
            {
              name: "Студия Театральная",
              color: "violet",
            },
            {
              name: "Студия Институт физкультуры",
              color: "blue",
            },
    ];

    //modal changed
    currentChangeArr: string = "loading";

    @State(state => state.baseTable.typeLessons) typeLessons!: string[];
    @State(state => state.baseTable.show) showFilter!: boolean;
    @State(state => state.baseTable.dateArr) dateArr!: string[];
    @State(state => state.baseTable.teacher) teacher!: string[];
    @State(state => state.baseTable.clients) clients!: string[];
    @State(state => state.baseTable.halls) halls!: string[];
    @State(state => state.baseTable.dataTable) dataTable!: string[];

    @Mutation setDataTable!: ({}) => void;

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



    addData(): any {
        for (let objData in this.dataTable) {
            for (let halls in this.dataTable[objData] as any) {
                let idStr = objData + halls;

                let testDone = document.getElementById(idStr),
                    createdBlock = document.createElement("div");

                createdBlock.classList.add("is-full");

                let startPosition = ((parseInt(this.dataTable[objData][halls as any]["training1" as any]["startTraining" as any])) - (this.startTime )) * this.oneMinInPx;

                createdBlock.style.top = startPosition + "px";
                createdBlock.innerText = "Done";

                testDone!.appendChild(createdBlock)
            }
        }

        return true;
    }

    halsTurn(i: number): number {
        if ( i < this.numHalls) {
            return i;
        } else if (!(i % this.numHalls)) {
            return this.numHalls;
        } else return i % this.numHalls;
    }

    timeCurrent(i: number): string {
        let time: number = this.startTime + (i * this.gapTime),
            mins: number | string = time % 60,
            hours: number | string  = (time - mins) / 60;

        if (mins < 10)  mins = '0' + mins;
        if (hours < 10) hours = '0' + hours;

        return  hours + ':' + mins;
    }

    classTd(indexTd: any, indexTr: any): string {
        return indexTr === 0
            ? `${this.dateArr[Math.floor(indexTd / this.numHalls)]}${this.halsTurn(indexTd + 1)}`
            : "";
    }

    handleScroll(): void {
        this.scrollTime = document.querySelector(".Table__tbody")!.scrollTop;
        this.scrollHead = document.querySelector(".Table__tbody")!.scrollLeft;
    }

    changeColor(color: string): void {
        this.colorTable = color;
    }

    showModal (currentRow: number, currentTd: number) {
        this.selectTimeStart = this.timeCurrent((currentRow));
        this.selectTimeEnd = this.timeCurrent((currentRow + 1));

        this.selectTeacherModal = this.selectedTeacher || "";
        this.selectedChildModal = this.selectedChild || "";

        let currentDate = Math.floor(currentTd / this.numHalls);
        this.dateModal = this.dateArr[currentDate];

        this.currentHall = `${this.halsTurn(currentTd + 1)}`;
        this.$modal.show('modal-add');
    }

    showModalCurrent(indexTr: number, indexTd: number) {
        this.currentChangeArr = this.classTd(indexTr, indexTd);

        this.$modal.show('modal-changed');
    }

    submitForm(): void {
        let arr = [],
            idStr = this.selectTimeStart + this.dateModal + this.currentHall;

        arr.push(this.selectTimeStart);
        arr.push(this.dateModal);
        arr.push(this.currentHall);
        arr.push(this.selectTimeEnd);
        arr.push(this.selectTeacherModal);
        arr.push(this.selectedChildModal);
        arr.push(this.currentType);
        arr.push(this.statusModal);
        arr.push(this.quantityWeek);
        arr.push(this.modalNotes);

        this.setDataTable({data: arr, id: idStr});
    }

    mounted() {
        this.addData();

        let testT = document.querySelector(".Table__tbody");
        testT!.addEventListener("scroll", throttle(this.handleScroll, 50));
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
        height: calc(100vh - 120px);

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
        height: 83px;
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
                margin: 0 20px;
            }
        }

        &__tbody {
            display: block;
            height: calc(100vh - 204px);
            overflow: auto;
        }

        &__timeCurrent {
            color: grey;

            &Modal {
                position: relative;
            }
        }

        &__th-cell, &__td-cell {
            min-width: 150px;
            text-align: center;

            &.is-number {
                min-width: 90px;
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
            &:hover {
                background-color: #f9f9f9;
            }
        }
    }

    &__modal {
        z-index: 99999999;

        &Status {
            display: flex;
            align-items: center;

            input {
                margin-right: 10px;
            }
        }

        &Week {
            margin: 16px 0;

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
            &Text {
                width: 100%;
                height: 60px;
            }
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
            .is-full {
                position: absolute;
                top: 0;
                width: 148px;
                height: 100px;
                background: red;
                z-index: 9;
            }
        }
    }
}
</style>
