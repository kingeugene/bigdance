<template lang="pug">
include ../lib/pugDeps.pug
+b.Coach
    template(v-if="!loading")
        +e.btnAddWrap
            +e.btnAdd.btn.btn-success(@click="$router.push('/trainers/add')") Добавить тренера
        vue-good-table(
            :columns="columns"
            :rows="coach"
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
    loading(:active.sync="loading")

    +e.VMODAL.modalDetails(
        name="change-coach"
        height="auto"
        width="85%"
        adaptive
    )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation, Action } from "vuex-class";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

@Component({
    components: {
        VueGoodTable,
    }
})
export default class Trainers extends Vue {
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

    columns: any = [
        {
            label: 'Имя',
            field: 'first_name',
            filterable: true,
        },
        {
            label: 'Фамилия',
            field: 'second_name',
            filterable: true,
        },
        {
            label: 'Телефон',
            field: 'phones',
            filterable: true,
        },
        {
            label: 'Ставка',
            field: 'price',
        },
        {
            label: 'Ред',
            field: 'action',
        },
    ];

    // changeCustomer: {
    //     account_id: number
    //     availability: []
    //     birth_date: string
    //     document_id: string
    //     email: string
    //     first_name: string
    //     id: number
    //     middle_name: string
    //     notes: string
    //     originalIndex: number
    //     person_id: number
    //     phones: []
    //     photo: string | null
    //     position: number
    //     price: number
    //     second_name: string
    //     sex: string
    //     style_id: number
    //     user_id: number
    //     vgt_id: number
    //     wage: number
    // } = {
    //
    // }

    @State(state => state.baseClients.columns2) columns2!: any[];
    @State(state => state.baseClients.rows2) rows2!: any[];
    @State(state => state.baseTable.loadedComponent) loadedComponent!: boolean;
    @State(state => state.baseTable.loadedCoach) loadedCoach!: boolean;
    @State(state => state.baseTable.loading) loading!: boolean;

    @State(state => state.baseTable.coach) coach!: string[];

    @Action allCoach!: () => void;
    @Action coachDelete!: (id: number) => void;

    @Mutation deleteRows!: (id: number) => void;

    onRowClick(params: any) {
        if (params.event.target.classList[0] !== "Coach__iconEdit") {
            this.$modal.show('details-coach');
        }
    }

    edit(props: any): void {
        console.error(props.row);
    }

    showModalDelete(id: number): void {
        this.$modal.show('delete-coach');
        this.numDeleteRow = id;
    }

    deleteRow(): void {
        this.coachDelete(this.numDeleteRow);
        this.$modal.hide('delete-coach');
    }

    submitChangeCoach(): void {
        // delete this.changeCustomer.user_id;
        // delete this.changeCustomer.vgt_id;
        // delete this.changeCustomer.originalIndex;
        // delete this.changeCustomer.account_id;
        // delete this.changeCustomer.person_id;
        // delete this.changeCustomer.photo;
    }

    created() {
        if (this.loadedComponent && !this.loadedCoach) {
            this.allCoach();
        }
    }

}


</script>

<style lang="scss" scoped>
.Coach {
    padding: 30px 0;

    &__btnAdd {
        &Wrap {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 30px;
        }
    }

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
.Coach {
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
