<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseValidationError(:class="{'is-active': !!error}")
    +e.message {{error}}
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BaseValidationError extends Vue {
    @Prop({type: String, required: true}) formKey!: string;
    @Prop({type: String, required: true}) field!: string;

    get error(): string {
        return this.$store.getters[`${this.formKey}/error`](this.field);
    }
}
</script>
<style lang="scss">
.BaseValidationError {
    min-height: 19px;
    line-height: 1;
    overflow: hidden;
    @include Light($red, 12);

    &__message {
        padding: 1.5px 0;
        will-change: transform, opacity;
        opacity: 0;
        transition: transform .2s cubic-bezier(.44, .13, .31, 1.23), opacity .2s cubic-bezier(.44, .13, .31, 1.23);
        transform: translateY(-100%);
    }

    &.is-active & {
        &__message {
            opacity: 1;
            transform: translateY(1px);
        }
    }
}
</style>
