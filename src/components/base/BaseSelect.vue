<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseSelect(:class="{'is-error': error}")
    +e.group
        +e.LABEL.label(v-if="label" :for="id" :class="{'required': required}") {{label}}
        v-select(
            :id="id"
            :options="options"
            v-model="getData"
        )
    validation(
        v-if="formKey"
        :formKey="formKey"
        :field="name"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import vSelect from 'vue-select';
import "vue-select/src/scss/vue-select.scss";

let i: number = 0;

@Component({
    components: {
        validation: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseValidationError.vue"),
        vSelect,
    },
})
export default class BaseSelect extends Vue {
    @Prop({
        type: [
            String,
            Number,
            Object,
        ],
        default: "",
    }) value!: string | number | [] | {};
    @Prop({
        type: [
            String,
            Number,
            Object,
            Array,
        ],
        default: "",
    }) options!: string | number | [] | {};
    @Prop({type: String, default: ""}) name!: string;
    @Prop({type: Boolean, default: false}) required!: boolean;
    @Prop({type: String, default: ""}) formKey!: string;
    @Prop({type: String, default: ""}) label!: string;

    id: string = `BaseSelect-${i++}`;

    get error(): string {
        if (!this.formKey) {
            return "";
        }

        return this.$store.getters[`${this.formKey}/error`](this.name);
    }

    get getData(): string | number | [] | {} {
        return this.value;
    }

    set getData(val: string | number | [] | {}) {
        this.$emit("input", val);
    }
}
</script>

<style scoped lang="scss">
.BaseSelect {
    $root: &;
    width: 100%;
    margin: 16px 0;

    &__group {
        display: flex;
        flex-direction: column;
    }

    &__label {
        &.required {
            &:after {
                content: "*";
                margin-left: 2px;
            }
        }
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

}
</style>
