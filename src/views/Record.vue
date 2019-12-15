<template lang="pug">
include ../lib/pugDeps.pug
+b.Record
    template(v-if="!recordLoading")
        +e.label Клиент
        +e.data(v-for="item in record.clients") {{item.first_name}} {{item.second_name}}

        +e.label Тренер
        +e.data(v-for="item in record.coaches") {{item.first_name}} {{item.second_name}}

        +e.label Дата
        +e.data {{record.date}}

    loading(:active.sync="recordLoading")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";

@Component
export default class Record extends Vue {
    @Action initChooseRecord!: (id: string) => void;

    @State(state => state.record.chooseRecord) record!: {};
    @State(state => state.record.recordLoading) recordLoading!: boolean;

    created() {
        this.initChooseRecord(this.$route.params.id);
    }
}
</script>

<style lang="scss" scoped>
.Record {

}
</style>
