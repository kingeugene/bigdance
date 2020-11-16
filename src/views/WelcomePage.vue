<template lang="pug">
include ../lib/pugDeps.pug

+b.WelcomePage
    FilterCalendar/
    Calendar/
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Action, Mutation, State} from "vuex-class";
import {throttle} from "lodash";

import Record from "@/components/Calendar.vue";
import {daysWeek} from "@/constants";

@Component({
    components: {
        FilterCalendar: () => import(/* webpackChunkName: "components" */ "@/components/FilterCalendar.vue"),
        Calendar: () => import(/* webpackChunkName: "components" */ "@/components/Calendar.vue"),
    },
    data: () => {
        return {
            daysWeek
        }
    }
})
export default class WelcomePage extends Vue {

}
</script>

<style lang="scss" scoped>
.WelcomePage {
    $root: &;
    display: flex;
    height: calc(100vh - 60px);
    overflow: hidden;
}
</style>
