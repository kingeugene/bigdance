<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseFooter
    .container.d-flex.align-items-center.h-100
        +e.copyright © Big Dance 2017-2019

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseFooter extends Vue {

}
</script>

<style lang="scss" scoped>
.BaseFooter {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: $h-Footer;
    background-color: $c-footer;

    &__copyright {
        @include font(14, $grey);
    }
}
</style>
