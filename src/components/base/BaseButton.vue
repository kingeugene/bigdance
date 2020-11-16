<template lang="pug">
include ../../lib/pugDeps.pug

+b.BUTTON.BaseButton(
    :type="type"
    @click="$emit('click')"
    :disabled="loading || disabled"
)
    +e.content(:class="{'is-hidden': loading}"):  slot/
    loading(v-if="loading" btnLoading)
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
    components: {
        loading: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseLoading.vue"),
    },
})
export default class BaseButton extends Vue {
    @Prop({type: Boolean, default: false}) loading!: boolean;
    @Prop({type: String, default: "default"}) theme!: string;
    @Prop({type: String, default: "m"}) size!: string;
    @Prop({type: Boolean, default: false}) icon!: boolean;
    @Prop({type: String, default: "button"}) type!: string;
    @Prop({type: Boolean, default: false}) noFloat!: boolean;
    @Prop({type: Boolean, default: false}) disabled!: boolean;
    @Prop({type: Boolean, default: false}) isAuth!: boolean;
    @Prop({type: Boolean, default: false}) noAnimation!: boolean;
    @Prop({type: Boolean, default: false}) noHover!: boolean;
    @Prop({type: Boolean, default: false}) animated!: boolean;
}
</script>

<style lang="scss">
.BaseButton {
    $root: &;

    position: relative;
    overflow: hidden;
    will-change: transform;
    display: block;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, .3);
    outline: none;
    min-width: 150px;
    @include font(14, $white);

    &:not(:last-child) {
        margin-right: 30px;
    }

    &:hover {
        opacity: 0.8;
    }
}
</style>
