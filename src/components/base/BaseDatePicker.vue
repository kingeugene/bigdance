<template lang="pug">
include ../../lib/pugDeps.pug

+b.BaseDatePicker
    +e.group
        +e.LABEL.label.col-form-label(v-if="label" :for="id" :class="{'required': required}") {{label}}
        DatePicker(
            lang="ru"
            v-model="getDate"
            valueType="format"
            clearable
            :first-day-of-week="7"
            width="100%"
            :format="format"
        )
    validation(
        v-if="formKey"
        :formKey="formKey"
        :field="name"
    )
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import DatePicker from "vue2-datepicker";

let i: number = 0;

@Component({
    components: {
        validation: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseValidationError.vue"),
        DatePicker,
    },
})
export default class BaseDatePicker extends Vue {
    @Prop({
        type: [
            String,
            Number,
            Object,
            Array,
        ],
        default: "",
    }) value!: string | number | [] | {};
    @Prop({type: String, default: ""}) label!: string;
    @Prop({type: String, default: ""}) name!: string;
    @Prop({type: String, default: ""}) formKey!: string;
    @Prop({type: String, default: "YYYY-MM-DD"}) format!: string;
    @Prop({type: Boolean, default: false}) disabled!: boolean;
    @Prop({type: Boolean, default: false}) required!: boolean;

    id: string = `BaseDate-${i++}`;

    get getDate(): string | number | [] | {} {
        return this.value;
    }

    set getDate(val: string | number | [] | {}) {
        this.$emit("input", val);
    }
}
</script>

<style scoped lang="scss">
.BaseDatePicker {
    $root: &;
    width: 100%;
    position: relative;

    &__group {
        display: flex;
        flex-direction: column;
    }

    &__label {
        padding-left: 0;
        padding-top: 0;

        &.required {
            &:after {
                content: "*";
                margin-left: 2px;
            }
        }
    }
}
</style>
