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

        +e.select
            +e.selectName Выбрать учителя
            v-select(
                :options="daysWeek"
                v-model="selectedTicher"
                label="country"
            )

        +e.select
            +e.selectName Выбрать клиента
            v-select(
                :options="daysWeek"
                v-model="selectedChild"
                label="country"
            )
        datepicker(
            inline
            maximum-view="month"
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
                ) {{ daysWeek[index] }}
                +e.TR.th-row.is-halls
                    +e.TH.th-cell(
                        v-for="(cell, index) of allDays"
                  ) Зал {{halsTurn(index + 1)}}
        +e.TBODY.tbody
            +e.TR.tr-row(
                v-for="(item, index1) of quantityTime"
                :class="{'green': index1 % 3 === 0 && index1 % 2 === 0}"
            )
                +e.TD.td-cell(
                    v-for="(cell, index) of allDays"
                )
                    div(v-if="index % 3 === 0 && index1 % 2 === 0" class="greenInd") Индива </br> {{timeCurrent(index1)}} до {{timeCurrent(index1 + 1)}}
                    div(v-else-if="index % 2 === 0 && index1 % 3 === 0" class="redInd") Общие занятия </br> {{timeCurrent(index1)}} до {{timeCurrent(index1 + 1)}}


</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from "vuex-class";
import datepicker from "vuejs-datepicker";
import { throttle } from "lodash";

@Component({
    components: {
        datepicker,
    },
})
export default class Timetable extends Vue {
    numHalls: number = 2;
    startTime: number = 510;
    endTime: number = 1320;
    gapTime: number = 60;
    scrollHead: number = 0;
    scrollTime: number = 0;
    colorTable: string = "blue";
    selectedTicher: string = "";
    selectedChild: string = "";

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

    @State(state => state.baseTable.show) showFilter!: boolean;

    get allDays(): number {
        return this.numHalls * 7;
    }

    get quantityTime(): number {
        return Math.round((this.endTime - this.startTime + this.gapTime) / this.gapTime);
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

    handleScroll(): void {
        this.scrollTime = document.querySelector(".Table__tbody")!.scrollTop;
        this.scrollHead = document.querySelector(".Table__tbody")!.scrollLeft;
    }

    changeColor(color: string): void {
        this.colorTable = color;
    }

    mounted() {
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
        min-width: 300px;
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
        }

        .greenInd {
            background: green;
        }

        .redInd {
            background-color: red;
        }

        &__td-cell div {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
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
        }

        &__tbody {
            display: block;
            height: calc(100vh - 204px);
            overflow: auto;
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
}
</style>
