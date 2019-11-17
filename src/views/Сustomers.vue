<template lang="pug">
include ../lib/pugDeps.pug
+b.Clients
    vue-good-table(
        :columns="columns"
        :rows="rows"
        :search-options="optionSearch"
        styleClass="vgt-table bordered"
        :pagination-options="optionPagination"
        @on-row-click="onRowClick"
        :line-numbers="true"
        row-style-class="Clients__row"
        max-height="600px"
        theme="black-rhino"
    )
        template(slot="table-row" slot-scope="props")
            +e.iconWrap.SPAN(v-if="props.column.field == 'action'")
                +e.iconEdit.I.fa.fa-edit(@click.prevent="edit(props)" title="Редактировать")
                +e.iconEdit.I.fa.fa-trash(@click.prevent="showModalDelete(props.row.id)" title="Удалить")

    +e.VMODAL.modalDelete(
        name="delete-coach"
        height="260"
        width="500"
        adaptive
    )
        +e.H4.modalDeleteTitle Вы действительно хотите </br> Удалить Тренера
        +e.modalDelete-btnWrap
            +e.modalDelete-btnCancel(@click="$modal.hide('delete-coach')") Отмена
            +e.modalDelete-btnOk(@click="deleteRow") Да

    +e.VMODAL.modalDetails(
        name="details-coach"
        height="auto"
        width="85%"
        adaptive
    )
        +e.modalDetails-info
            .d-flex
                +e.IMG.modalDetails-infoIcon(src="../assets/coach.jpeg")
                div
                    +e.modalDetails-infoTitle Левицкий <br> Александр <br> Леонидович
                    +e.modalDetails-infoBottom Главный Тренер <br> Бальные танцы
            div
                div Доступное свободное время
                div Пн: 09:00 - 21:00
                div Вт: 09:00 - 21:00
                div Ср: 09:00 - 21:00
                div Чт: 09:00 - 21:00
                div Пт: 09:00 - 21:00
                div Сб: 09:00 - 21:00
                div Вс: 09:00 - 21:00

        div
            +e.modalDetails-table
                +e.modalDetails-tableTitle Ближайшие записи
                +e.modalDetails-tableBtn Просмотреть все записи
            vue-good-table(
                :columns="columns2"
                :rows="rows2"
                :search-options="optionSearch"
                styleClass="vgt-table bordered"
                :pagination-options="optionPagination"
                max-height="400px"
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
    numDeleteRow: number = 0;
    optionSearch: object = {
        enabled: true,
    };

    optionPagination: object = {
        enabled: true,
        perPage: 20,
        nextLabel: 'Вперед',
        prevLabel: 'Назад',
        rowsPerPageLabel: 'Количество страниц',
        ofLabel: 'из',
        allLabel: 'Все',
    };

    @State(state => state.baseClients.columns) columns!: any[];
    @State(state => state.baseClients.rows) rows!: any[];
    @State(state => state.baseClients.columns2) columns2!: any[];
    @State(state => state.baseClients.rows2) rows2!: any[];

    @Mutation deleteRows!: (id: number) => void;

    onRowClick(params: any) {
        if (params.event.target.classList[0] !== "Clients__iconEdit") {
            this.$modal.show('details-coach');
        }
        console.error(params);
    }

    edit(name: any): void {
        console.error(name);
    }

    showModalDelete(id: number): void {
        this.$modal.show('delete-coach');
        this.numDeleteRow = id;
    }

    deleteRow(): void {
        this.deleteRows(this.numDeleteRow);
        this.$modal.hide('delete-coach');
    }

}


</script>

<style lang="scss" scoped>
.Clients {
    padding: 30px 0;

    &__icon {
        &Wrap {
            display: flex;
            justify-content: space-around;
        }

        &Edit {
            font-size: 20px;
            cursor: pointer;
            transition: .3s;

            &:hover {
                color: green;
                transform: translateY(-2px);
            }
        }
    }

    &__modalDelete {
        &Title {
            text-align: center;
            line-height: 36px;
        }

        &-btn {
            &Wrap {
                display: flex;
                align-items: center;
                justify-content: space-around;
            }

            &Cancel,
            &Ok {
                padding: 10px 30px;
                transition: .3s;
                cursor: pointer;
                color: #fff;
                width: 120px;
                text-align: center;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
                }
            }

            &Cancel {
                background: red;
            }

            &Ok {
                background: green;
            }
        }
    }
}
</style>
<style lang="scss">
.Clients {
    &__row {
        transition: .3s;

        &:hover {
            background: #f9f9f9;
        }
    }

    &__modalDelete {
        .v--modal {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 40px 20px;
        }
    }

    &__modalDetails {
        .v--modal {
            padding: 30px;
            display: flex;
        }

        &-info {
            margin-right: 50px;

            &Icon {
                height: 240px;
                object-fit: contain;
                margin: 0 40px 40px 0;
            }

            &Title {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 50px;
            }

        }

        &-table {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;

            &Title {
                font-size: 18px;
                font-weight: bold;
            }

            &Btn {
                padding: 10px 30px;
                background: green;
                border-radius: 50px;
                color: white;
                transition: .3s;
                cursor: pointer;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
                }
            }
        }
    }
}
</style>
