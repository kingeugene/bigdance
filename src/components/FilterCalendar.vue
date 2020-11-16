<template lang="pug">
include ../lib/pugDeps.pug
+e.FilterCalendar(v-if="showFilter")
    +e.studios
        +e.BASEBUTTON(
            v-for="item in listVenue"
            :key="item.id"
            :style="{background:  item.color}"
            @click="handleSwitchVenue(item.id)"
        ) {{ item.name }}
    datepicker(label="Дата" v-model="dateTime")
    baseselect(
        label="Выбрать тренера"
        :options="coach"
        v-model="selectedCoach"
    )
    baseselect(
        label="Выбрать клиента"
        :options="clients"
        v-model="selectedCustomer"
    )
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Mutation, State} from "vuex-class";
import {mapFieldsToComputed} from "@/store/lib/vuex-form";

@Component({
    components: {
        basebutton: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseButton.vue"),
        baseselect: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseSelect.vue"),
        datepicker: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseDatePicker.vue"),
    },
    computed: mapFieldsToComputed("filterTable", [
        "dateTime",
        "selectedCoach",
        "selectedCustomer",
    ]),
})
export default class FilterCalendar extends Vue {
    @State(state => state.calendar.show) showFilter!: boolean;
    @State(state => state.calendar.listVenue) listVenue!: string[];
    @State(state => state.calendar.allCoach) coach!: string[];
    @State(state => state.calendar.allClients) clients!: string[];
    @State(state => state.calendar.currentVenue) currentVenue!: number;

    @Mutation setCurrentVenue!: (id: number) => void;

    handleSwitchVenue(venueId: number): void {
        if (this.currentVenue === venueId) {
            return;
        }

        this.setCurrentVenue(venueId);
    }
}

</script>

<style lang="scss" scoped>
.FilterCalendar {
    min-width: 250px;
    margin: 20px;
}
</style>
