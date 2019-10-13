<template lang="pug">
include ../lib/pugDeps.pug

+b.Welcome
    +e.iconWrap
        +e.IMG.icon(src="../assets/logo.png")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.Welcome {
    &__icon {
        width: 100%;
        max-width: 600px;
        margin: 100px;

        &Wrap {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
