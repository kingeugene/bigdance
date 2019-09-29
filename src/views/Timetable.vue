<template lang="pug">
include ../lib/pugDeps.pug

+b.Timetable
  h1 Расписание
  +e.filter
    +e.studios
      +e.BUTTON.studiosBtn(
        v-for="item in studios"
        :class="`is-${item.color}`"
      ) {{ item.name }}
  basetable(
    :numHalls="2"
    :startTime="510"
    :endTime="1320"
    :gapTime="30"
    :colorTable="colorTable"
  )


</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import basetable from "@/components/base/BaseTable.vue";

@Component({
  components: {
    basetable,
  },
})
export default class Timetable extends Vue {
studios: {name: string, color: string}[] = [
        {
          name: "Студия Подол",
          color: "orange",
        },
        {
          name: "Студия Театральная",
          color: "violet",
        },
        {
          name: "Студия Институт физкультуры",
          color: "blue",
        },
];

get colorTable(): string {
  return "orange";
}

}
</script>

<style lang="scss" scoped>
.Timetable {
  &__filter {
    margin-top: 30px;
  }

  &__studios {
    &Btn {
      border: none;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      box-shadow: 0 10px 10px rgba(0, 0, 0, .3);
      @include font(14, $white);

      &:not(:last-child) {
        margin-right: 30px;
      }

      &:hover {
        opacity: 0.8;
      }

      &.is-orange {
        background: $orange;
      }

      &.is-violet {
        background: $violet;
      }

      &.is-blue {
        background: $blue;
      }
    }
  }
}
</style>
