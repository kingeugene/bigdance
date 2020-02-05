<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseLayout
    +e.BASEHEADER.header
    +e.MAIN.main
        +e.container(:class="{'container': haveContainerClass}"): slot/
    loading(:active.sync="loading")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import baseheader from "@/components/base/BaseHeader.vue";
import {State} from "vuex-class";

@Component({
    components: {
        baseheader,
    },
})
export default class BaseLayout extends Vue {
    @State(state => state.profile.loading) loading!: boolean;

    get haveContainerClass(): boolean {
        switch (this.$route.name) {
            case "timetable":
            case "coach-page":
            case "customers-page":
                return false;
            default:
                return true;
        }
    }

    updated() {
        if(this.$route.name === "timetable") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }
}
</script>

<style lang="scss" scoped>
.BaseLayout {
    $root: &;

    display: flex;
    flex-direction: column;
    height: 100vh;
    padding-top: 60px;
    overflow-x: hidden;

    &__header {
        width: 100%;
        height: 60px;
    }

    &__main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        background-size: cover;
    }

    &__container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }
}
</style>
