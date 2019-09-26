<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseLayout
    +e.BASEHEADER.header
    +e.MAIN.main
        +e.container: slot/
    +e.BASEFOOTER.footer
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseHeader extends Vue {
}
</script>

<style scoped>

</style>
