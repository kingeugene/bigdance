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

<style scoped>

</style>
