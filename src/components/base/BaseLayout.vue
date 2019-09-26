<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseLayout
    +e.BASEHEADER.header
    +e.MAIN.main
        +e.container: slot/
    +e.BASEFOOTER.footer
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import baseheader from "../../components/base/BaseHeader";
import basefooter from "../../components/base/BaseFooter";

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
        padding-top: 60px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        background-size: cover;
    }

    &__container {
        padding-left: 15px;
        padding-right: 15px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>
