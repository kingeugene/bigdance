<template lang="pug">
include ../../lib/pugDeps.pug

+b.HEADER.header#header
    | sakdfl;sdkl;djsfl;
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseHeader extends Vue {
}
</script>

<style lang="scss" scoped>
.header {
    $root: &;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    contain: layout size;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s, box-shadow 0.2s;
    padding-left: 15px;
    transform: translateZ(0);
    background-color: red;
}
</style>
