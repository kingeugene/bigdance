<template lang="pug">
include ../../lib/pugDeps.pug

+b.HEADER.header#header
    +e.Wrap
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
            +e.mobileBtn(v-if="token" @click="toggleBurger" :class="{'is-active': menuOpen}")
                +e.mobileBtnLine(v-for="item in 3")

    +e.mobileMenu(:class="{'menu-opened': menuOpen}")
        +e.mobileMenuWrap
            template(v-for="item in navigationItem")
                +e.mobileMenu-item(@click="changeRout(item.link)") {{item.name}}
            +e.mobileMenu-item(v-if="token" @click="logout()") Выйти

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

    toggleBurger() {
        this.menuOpen = !this.menuOpen;
    }

    changeRout(item: string) {
        this.$router.push(item).catch(err => {});
        this.toggleBurger();
    }

    navigationItem: {name: string, link: string}[] = [
        {
            name: "Расписание",
            link: "/",
        },
        {
            name: "Клиенты",
            link: "/customers",
        },
        {
            name: "Тренеры",
            link: "/trainers",
        },
        {
            name: "Справка",
            link: "/reference",
        },
        {
            name: "Настройки",
            link: "/settings",
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
    padding-left: 15px;
    transform: translateZ(0);
    background-color: $c-header;

    &__Wrap {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 20px;

        @include bp(m) {
            margin-left: 0;
        }
    }

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

    &__mobileBtn {
        position: relative;
        width: 40px;
        height: 26px;
        display: inline-block;
        cursor: pointer;
        transition: all .5s;
        text-align: left;

        @include bp(m) {
            display: none;
        }

        &Line {
            transition: top .15s .15s, transform .15s;

            &,
            &:before,
            &:after {
                background: $orange;
                position: absolute;
                height: 4px;
                width: 40px;
                border-radius: 4px;
                transition: all .25s;
            }

            &:first-child {
                top: 0;
            }

            &:nth-child(2) {
                top: 10px;
            }

            &:nth-child(3) {
                top: 20px;
            }
        }

        &.is-active & {
            &Line {
                &:first-child {
                    top: 10px;
                    transform: rotate(45deg);
                }

                &:nth-child(2),
                &:nth-child(3) {
                    top: 10px;
                    transform: rotate(-45deg);
                }
            }
        }
    }

    &__mobileMenu {
        position: fixed;
        height: 0;
        top: 60px;
        display: block;
        left: 0;
        right: 0;
        bottom: auto;
        overflow: hidden;
        padding: 0 48px 0;
        transition: all 0.5s ease-out, background 1s ease-out;
        background: inherit;
        transition-delay: 0.2s;

        &Wrap {
            position: relative;
            transition: height .3s ease-in-out;
            padding: 24px 24px 100px;

        }

        &.menu-opened {
            height: calc(100vh - 60px);
            transition-delay: .25s;
            overflow-y: auto;

            #{$root}__mobileMenu {
                &-item {
                    transform: scale(1) translateY(0px);
                    opacity: 1;

                    @for $i from 1 through $menuItems {
                        &:nth-child(#{$i}) {
                            transition-delay: #{0.07 * $i+0.5}s;
                        }
                    }
                }
            }
        }

        &-item {
            border-bottom: 1px solid $orange;
            margin-top: 5px;
            transform: scale(1.15) translateY(-30px);
            margin-bottom: 30px;
            padding-bottom: 5px;
            opacity: 0;
            transition: transform 0.5s $cubic, opacity 0.6s $cubic;
            @include Semibold(white, 16);

            @for $i from 1 through $menuItems {
                &:nth-child(#{$i}) {
                    transition-delay: #{0.56 - ($i * 0.07)}s;
                }
            }
        }
    }


}
</style>
