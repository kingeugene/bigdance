<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseLayout
    +e.BASEHEADER.header
    +e.MAIN.main
        +e.container.container: slot/
    +e.BASEFOOTER.footer
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import baseheader from "@/components/base/BaseHeader.vue";
import basefooter from "@/components/base/BaseFooter.vue";

@Component({
    components: {
        baseheader,
        basefooter,
    },
})
export default class BaseLayout extends Vue {
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
        padding: 60px 0;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        background-size: cover;
    }

    &__container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        padding-top: 30px;
    }
}
</style>
