<template lang="pug">
include ../lib/pugDeps.pug
+b.CoachPage
    +e.H1.title Тренер
    template(v-if="!loadingCoach")
        +e.coachWrap
            +e.IMG.coach(src="https://sivator.com/uploads/posts/2017-08/1501737653_urodru20170803sheste_01.jpg")
            +e.coachName-wrap
                +e.coachName {{coach.first_name}} <br> {{coach.middle_name}} <br> {{coach.second_name}}
                +e.coachPosition {{coach.position}}
                +e.coachStyle {{coach.name}}
        +e.availableName Доступное рабочие время:
        +e.available(v-for="item in coach.availability") {{item.slot}}: {{item.from}} - {{item.to}}

    loading(:active.sync="loadingCoach")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";

@Component
export default class CoachPage extends Vue {
    @Action getCoach!: (id: number) => void;
    @Action getRecordCoach!: (id: number) => void;
    @Action initBaseTable!: () => void;

    @State(state => state.baseCoach.showCoach) coach!: any;
    @State(state => state.baseCoach.loading) loadingCoach!: boolean;
    @State(state => state.baseTable.listVenue) listVenue!: string[];
    @State(state => state.baseTable.loadedComponent) loadedComponent!: boolean;

    async created() {
        if (this.loadedComponent) {
            await this.initBaseTable();
        }

        const listVenueId = this.listVenue.map((item) => item["id"]);

        console.log(listVenueId);
        this.getCoach(parseInt(this.$route.params.id));
        this.getRecordCoach(parseInt(this.$route.params.id));
    }
}
</script>

<style lang="scss" scoped>
.CoachPage {
    &__title {
        text-align: center;
        margin: 30px 0;
        color: $orange
    }

    &__coach {
        width: 260px;

        &Wrap {
            display: flex;
            margin-bottom: 40px;
        }

        &Name {
            font-size: 24px;
            margin-bottom: 50px;

            &-wrap {
                margin: 10px 50px;
            }
        }

        &Style,
        &Position {
            font-size: 20px;
            margin-bottom: 10px;
        }


    }

    &__available {
        &Name {
            margin-bottom: 10px;
            font-size: 18px;
        }
    }
}
</style>
