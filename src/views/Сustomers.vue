<template lang="pug">
include ../lib/pugDeps.pug
+b.Clients
    vue-good-table(
        :columns="columns"
        :rows="rows"
        :fixed-header="true"
        :search-options="optionSearch"
    )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from "vuex-class";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';



@Component({
    components: {
        VueGoodTable,
    }
})
export default class Customers extends Vue {
optionSearch: object = {
    enabled: true,
    externalQuery: this.searchTerm,
};
searchTerm:string = '';

@State(state => state.baseClients.columns) columns!: any[];
@State(state => state.baseClients.rows) rows!: any[];

}
</script>

<style lang="scss" scoped>

</style>
