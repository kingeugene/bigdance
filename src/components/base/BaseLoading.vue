<template lang="pug">
include ../../lib/pugDeps.pug

+b.Loading(:class="{'is-button': btnLoading}")
    +e.circle._1
    +e.circle._2
    +e.circle._3
    +e.circle._4
    +e.circle._5
    +e.circle._6
    +e.circle._7
    +e.circle._8
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class BaseLoading extends Vue {
    @Prop({type: Boolean, default: false}) btnLoading!: boolean;
}
</script>

<style scoped lang="scss">
@keyframes bounce_circle {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0.3);
    }
}

.Loading {
    $root: &;
    position: relative;

    &.is-button {
        position: absolute;
        top: calc(50% - 16px);
        left: calc(50% - 16px);
        width: 32px;
        height: 32px;

        #{$root}__circle {
            background-color: $white;
            width: 7px;
            height: 7px;

            &_1 {
                top: 12px;
            }

            &_2 {
                left: 3px;
                top: 3px;
            }

            &_3 {
                left: 12px;
            }

            &_4 {
                right :3px;
                top: 3px;
            }

            &_5 {
                top: 12px;
            }

            &_6 {
                right: 3px;
                bottom: 3px;
            }

            &_7 {
                left: 12px;
            }

            &_8 {
                left: 3px;
                bottom: 3px;
            }
        }
    }

    &:not(.is-button) {
        width: 39px;
        height: 39px;
        margin: 3rem auto;

        #{$root}__circle {
            background-color: #4aa657;
            width: 9px;
            height: 9px;
        }
    }

    &__circle {
        position: absolute;
        transform: scale(0.3);
        border-radius: 6px;
        animation-name: bounce_circle;
        animation-duration: 0.668s;
        animation-iteration-count: infinite;
        animation-direction: normal;

        &_1 {
            left: 0;
            top: 16px;
            animation-delay: 0.248s;
        }

        &_2 {
            left: 4px;
            top: 4px;
            animation-delay: 0.334s;
        }

        &_3 {
            top: 0;
            left: 16px;
            animation-delay: 0.42s;
        }

        &_4 {
            right :4px;
            top: 4px;
            animation-delay: 0.506s;
        }

        &_5 {
            right: 0;
            top: 16px;
            animation-delay: 0.592s;
        }

        &_6 {
            right: 4px;
            bottom: 4px;
            animation-delay: 0.668s;
        }

        &_7 {
            left: 16px;
            bottom: 0;
            animation-delay: 0.754s;
        }

        &_8 {
            left: 4px;
            bottom: 4px;
            animation-delay: 0.84s;
        }
    }
}
</style>
