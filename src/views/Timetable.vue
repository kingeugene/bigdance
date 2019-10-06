<template lang="pug">
include ../lib/pugDeps.pug

+b.Timetable
    +e.filter
        h1 Расписание
        +e.studios
            +e.BUTTON.studiosBtn(
            v-for="item in studios"
            :class="`is-${item.color}`"
            ) {{ item.name }}
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
                        v-for="(cell, index) of 7 * numHalls"
                  ) Зал {{halsTurn(index + 1)}}
        +e.TBODY.tbody
            +e.TR.tr-row(
                testH
                v-for="(item, index) of quantityTime"
            )
                +e.TD.td-cell(
                    @click="myblock(event)"
                    v-for="(cell, index) of 7 * numHalls"
                )

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import basetable from "@/components/base/BaseTable.vue";
import { throttle } from "lodash";

@Component({
  components: {
    basetable,
  },
})
export default class Timetable extends Vue {
    numHalls: number = 2;
    startTime: number = 510;
    endTime: number = 1320;
    gapTime: number = 60;
    scrollHead: number = 0;
    scrollTime: number = 0;

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

    get colorTable(): string {
        return "orange";
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

    &__filter {
        min-width: 260px;
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

    &__timeBlock, &__dataTable {
        &.is-orange {
            background: $orange;
        }
    }

    &__time {
        padding-top: 2px;

        &Block {
            position: relative;
            display: flex;
            flex-direction: column;
            color: #fff;
        }

        &Number {
            top: -12px;
            position: relative;
        }
    }

    &__dataTable {
        padding: 22px 0;
        height: 83px;
        z-index: 9;
        position: relative;
        color: #fff;
    }

    &__td-data {
        height: 101px;
    }

    .Table {
        display: block;
        table-layout: fixed;
        border-collapse: collapse;
        overflow: hidden;

        &,
        th,
        td {
            border: 1px solid #f2f2f2;
        }

        td {
            padding: 50px 0;
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
                #{$root}__th-row {
                    background: $violet;
                }
            }

            &.is-blue {
                #{$root}__th-row {
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
        }

        &__tr-row {
            &:hover {
                background-color: #f9f9f9;
            }
        }
    }
}
</style>
