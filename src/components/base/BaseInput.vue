<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseInput(:class="{'is-error': error}")
    +e.group
        +e.LABEL.label(v-if="label" :for="id" :class="{'required': required}") {{label}}
        +e.INPUT.input(
            :id="id"
            ref="input"
            :value="value"
            @input="handleInput"
        )
    validation(
        v-if="formKey"
        :formKey="formKey"
        :field="name"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

let i: number = 0;

@Component({
    components: {
        validation: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseValidationError.vue"),
    },
})
export default class BaseInput extends Vue {
    @Prop({
        type: [
            String,
            Number,
            Object,
        ],
        default: "",
    }) value!: string | number | {};
    @Prop({type: String, default: ""}) name!: string;
    @Prop({type: Boolean, default: false}) required!: boolean;
    @Prop({type: String, default: ""}) formKey!: string;
    @Prop({type: String, default: ""}) label!: string;

    id: string = `BaseInputId-${i++}`;

    get error(): string {
        if (!this.formKey) {
            return "";
        }

        return this.$store.getters[`${this.formKey}/error`](this.name);
    }

    handleInput(event): void {
        let input = event.target.value.trim();

        this.$emit("input", input);
    }
}
</script>

<style scoped lang="scss">
.BaseInput {
    $root: &;
    width: 100%;

    &__group {
        display: flex;
        flex-direction: column;
    }

    &__input {

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
