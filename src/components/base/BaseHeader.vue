<template lang="pug">
include ../../lib/pugDeps.pug

+b.HEADER.header#header
    +e.showFilter(
        v-if="$route.name == \"timetable\""
        @click="changeShow"
        :class="{ 'is-active': showFilter }"
    )
        +e.LABEL.showFilterLabel
            +e.showFilterLine(v-for="item in 3")
    .d-flex.align-items-center.container
        +e.logo(@click="$router.push('/').catch(err => {})") BIG Dance
        +e.navigation
            template(v-for="item in navigationItem")
                +e.navigationItem(@click="$router.push(item.link).catch(err => {})") {{item.name}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from "vuex-class";

@Component
export default class BaseHeader extends Vue {
    @State(state => state.baseTable.show) showFilter!: boolean;
    @Mutation setShow!: () => void;

    changeShow(): void {
        this.setShow();
    }

    navigationItem: {name: string, link: string}[] = [
        {
            name: "Расписание",
            link: "/",
        },
        {
            name: "Клиенты",
            link: "customers",
        },
        {
            name: "Тренеры",
            link: "trainers",
        },
        {
            name: "Справка",
            link: "reference",
        },
        {
            name: "Выход",
            link: "login",
        },
    ];
}
</script>

<style lang="scss" scoped>
.header {
    $root: &;

    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    contain: layout size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s, box-shadow 0.2s;
    padding-left: 15px;
    transform: translateZ(0);
    background-color: $c-header;

    &__showFilter {
        position: absolute;
        left: -24px;
        width: 56px;
        height: 28px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: $orange;
        border-radius: 50px;
        transition: 0.3s;
        cursor: pointer;
        user-select: none;
        padding-right: 4px;

        &:hover {
            left: -10px;
            box-shadow: 0 10px 10px rgba(218, 165, 32, 0.3);
        }

        &Label {
            position: relative;
            width: 20px;
            height: 20px;
            display: inline-block;
            cursor: pointer;
            margin: 3px 5px 0 0;
            transition: all .5s;
            text-align: left;
        }

        &Line,
        &Line:before,
        &Line:after {
            background: $c-header;
            position: absolute;
            height: 3px;
            width: 20px;
            border-radius: 4px;
            transition: all .5s;
        }

        &Line {
            transition: top .15s .3s, transform .15s .12s;

            &:first-child {
                top: 0;
            }

            &:nth-child(2) {
                top: 6px;
            }

            &:nth-child(3) {
                top: 12px;
                transition: top .15s .3s, transform .3s;
            }
        }

        &.is-active & {
            &Line {
                top: 6px;
                transform: rotate(45deg);
                transition: top .15s, transform .12s .15s;

                &:nth-child(3) {
                    transform: rotate(135deg);
                    transition: top .15s, transform .3s .15s;
                }
            }
        }

    }

    &__logo {
        display: flex;
        flex-grow: 1;
        cursor: pointer;
        transition: 0.3s;
        white-space: nowrap;
        @include Semibold($orange, 18);

        &:hover {
            opacity: 0.8;
        }
    }

    &__navigation {
        display: flex;

        &Item {
            padding: 18px 0;
            cursor: pointer;
            transition: 0.3s;
            @include font(16, $white);

            &:not(:last-child) {
                margin-right: 30px;
            }

            &:hover {
                opacity: 0.8;
            }
        }
    }
}
</style>
