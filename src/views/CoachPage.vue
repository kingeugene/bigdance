<template lang="pug">
include ../lib/pugDeps.pug
+b.CoachPage
    template(v-if="!loadingCoach")
        div {{coach}}
    loading(:active.sync="loadingCoach")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";

@Component
export default class CoachPage extends Vue {
    @Action getCoach!: (id: number) => void;

    @State(state => state.baseCoach.showCoach) coach!: any;
    @State(state => state.baseCoach.loading) loadingCoach!: boolean;

    created() {
        this.getCoach(parseInt(this.$route.params.id));
    }
}
</script>

<style lang="scss" scoped>
.CoachPage {

}
</style>
