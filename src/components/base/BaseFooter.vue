<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseFooter
    | sdfksdljfksdjf

</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseFooter extends Vue {

}
</script>

<style lang="scss" scoped>
.BaseFooter {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 50px 20px 74px;
}
</style>
