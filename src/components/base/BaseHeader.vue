<template lang="pug">
include ../../lib/pugDeps.pug

+b.HEADER.header#header(:class="{'menu-opened': menuOpen}")
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
            template(v-if="token" v-for="item in navigationItem")
                +e.navigationItem(@click="$router.push(item.link).catch(err => {})") {{item.name}}
            +e.navigationItem(v-if="token" @click="logout()") Выйти
            +e.navigationItem(v-if="!token") Логин
        +e.menuBurger(v-if="token")
            +e.burger-container(@click="changeBurger")
                +e.burger
                    +e.burgerBtn.topBar
                    +e.burgerBtn.btmBar
            +e.menu
                template(v-for="item in navigationItem")
                    +e.menu-item(@click="$router.push(item.link).catch(err => {})") {{item.name}}
                +e.menu-item(v-if="token" @click="logout()") Выйти
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State, Mutation } from "vuex-class";
import {} from "vuex";

@Component
export default class BaseHeader extends Vue {
    menuOpen: boolean = false;

    @State(state => state.baseTable.show) showFilter!: boolean;
    @State(state => state.login.token) token!: string;

    @Mutation setShow!: () => void;

    @Action logout!: () => void;

    changeShow(): void {
        this.setShow();
    }

    changeBurger() {
        this.menuOpen = !this.menuOpen;
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
        display: none;

        @include bp(m) {
            display: flex;
        }

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

    &__menu {
        position: relative;
        display: block;
        padding: 0 48px 0;
        list-style: none;

        &-item {
            border-bottom: 1px solid #333;
            margin-top: 5px;
            transform: scale(1.15) translateY(0px);
            opacity: 0;
            transition: transform 0.5s $cubic, opacity 0.6s $cubic;

            @for $i from 1 through $menuItems {
                &:nth-child(#{$i}) {
                    transition-delay: #{0.56 - ($i * 0.07)}s;
                }
            }
        }

        &Burger {
            @include bp(m) {
                display: none;
            }
        }
    }

    &__burger {
        width: 18px;
        height: 8px;
        position: relative;
        display: block;
        margin: -4px auto 0;
        top: 50%;

            &-container {
                position: relative;
                display: inline-block;
                height: 50px;
                width: 50px;
                cursor: pointer;
                transform: rotate(0deg);
                transition: all 0.3s $cubic;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
            }

            &Btn {
                width: 100%;
                height: 1px;
                display: block;
                position: relative;
                background: #FFF;
                transition: all 0.3s $cubic;
                transition-delay: 0s;

                &.topBar {
                    transform: translateY(0px) rotate(0deg);
                }

                &.btmBar {
                    transform: translateY(6px) rotate(0deg);
                }
            }
    }

    &.menu-opened {
        height: 100%;
        background-color: #000;
        transition: all 0.3s ease-in, background 0.5s ease-in;
        transition-delay: 0.25s;

        #{$root}__burger {
            &Btn {
                transition: all 0.4s $cubic;
                transition-delay: 0.2s;

                &.topBar {
                    transform: translateY(4px) rotate(45deg);
                }

                &.btmBar {
                    transform: translateY(3px) rotate(-45deg);
                }
            }

            &-container {
                transform: rotate(90deg);
            }
        }

        #{$root}__menu {
            &-item {
                transform: scale(1) translateY(0px);
                opacity: 1;

                @for $i from 1 through $menuItems {
                    &:nth-child(#{$i}) {
                        transition-delay: #{0.07 * $i+0.2}s;
                    }
                }
            }
        }
    }
}
</style>
