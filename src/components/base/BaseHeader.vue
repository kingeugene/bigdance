<template lang="pug">
include ../../lib/pugDeps.pug

+b.HEADER.header#header
    +e.filterTable(@click="changeShow")
        +e.ARROW.filterTableIcons
    .d-flex.align-items-center.container
        +e.logo(@click="$router.push('/')") BIG Dance
        +e.navigation
            template(v-for="item in navigationItem")
                +e.navigationItem(@click="$router.push(`/${item.link}`)") {{item.name}}


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from "vuex-class";

import arrow from "@/icons/arrow.svg"

@Component({
    components: {
        arrow,
    }
})
export default class BaseHeader extends Vue {
    @State(state => state.baseTable.show) showFilter!: boolean;
    @Mutation setShow!: () => void;

    changeShow(): void {
        this.setShow();
    }

    navigationItem: {name: string, link: string}[] = [
        {
            name: "Расписание",
            link: "timetable",
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

    &__filterTable {
        position: absolute;
        left: -20px;
        width: 50px;
        height: 28px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background-color: $orange;
        border-radius: 50px;
        transition: 0.3s;
        cursor: pointer;
        user-select: none;
        padding-right: 10px;

        &:hover {
            left: -10px;
            box-shadow: 0 10px 10px rgba(218, 165, 32, 0.3);
        }

        &:hover > &Icons {
            transform: rotate(360deg);
        }

        &Icons {
            transition: 0.3s;
            transform: rotate(180deg);
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
