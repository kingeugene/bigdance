<template lang="pug">
include ../../lib/pugDeps.pug

+b.HEADER.header#header
    .d-flex.align-items-center.container
        +e.logo(@click="$router.push('/')") BIG Dance
        +e.navigation
            template(v-for="item in navigationItem")
                +e.navigationItem(@click="$router.push(`/${item.link}`)") {{item.name}}


</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseHeader extends Vue {
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

    &__logo {
        display: flex;
        flex-grow: 1;
        cursor: pointer;
        transition: 0.3s;
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
