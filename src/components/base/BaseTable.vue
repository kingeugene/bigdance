<template lang="pug">
include ../../lib/pugDeps.pug

+b.TABLE.BaseTable(:style="{width: `${1200 * numHalls}px`}")
    +e.THEAD.head
        +e.TR.th-row.is-daysWeek
            +e.TH.th-cell.is-number(rowspan="2") Дата
            +e.TH.th-cell(
                :colspan="numHalls"
                v-for="(cell, index) of 7"
            ) {{ daysWeek[index] }}
        +e.TR.th-row.is-halls
            +e.TH.th-cell(
                v-for="(cell, index) of 7 * numHalls"
            ) Зал {{halsTurn(index + 1)}}
    +e.TBODY.tbody
        +e.TR.tr-row(
            v-for="(item, index) of quantityTime"
        )
            +e.TD.td-cell.is-number {{timeCurrent(index)}}
            +e.TD.td-cell(
                v-for="(cell, index) of 7 * numHalls"
            ) Занятия



</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Timetable extends Vue {
daysWeek: string[] = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
];

@Prop({type: Number, default: 1}) numHalls!: number;
@Prop({type: Number, default: 510}) startTime!: number;
@Prop({type: Number, default: 1320}) endTime!: number;
@Prop({type: Number, default: 30}) gapTime!: number;

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

}
</script>

<style lang="scss" scoped>
.BaseTable {
    table-layout: fixed;
    border-collapse: collapse;
    margin-top: 40px;

    &,
    th,
    td {
        border: 1px solid black;
    }

    &__th-cell, &__td-cell {
        width: 100%;
        text-align: center;

        &.is-number {
            width: 90px;
        }
    }
}
</style>
