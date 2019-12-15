<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseLayout
    +e.BASEHEADER.header
    +e.MAIN.main
        +e.container(:class="{'container': haveContainerClass}"): slot/
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import baseheader from "@/components/base/BaseHeader.vue";
import basefooter from "@/components/base/BaseFooter.vue";

@Component({
    components: {
        baseheader,
    },
})
export default class BaseLayout extends Vue {
    get haveContainerClass(): boolean {
        switch (this.$route.name) {
            case "timetable":
                document.body.style.overflow = "hidden";
                return false;
            default:
                return true;
        }
    }

}
</script>

<style lang="scss" scoped>
.BaseLayout {
    $root: &;

    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;

    &__header {
        width: 100%;
        height: 60px;
    }

    &__main {
        padding-top: 80px;
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
