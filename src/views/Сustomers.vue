<template lang="pug">
include ../lib/pugDeps.pug
+b.Clients
    template(v-if="!loading")
        +e.btnAddWrap
            +e.btnAdd.btn.btn-success(@click="$router.push('/customers/add')") Добавить клиента
        vue-good-table(
            :columns="columns"
            :rows="customers"
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
            name="delete-customer"
            height="260"
            width="500"
            adaptive
        )
            +e.H4.modalDeleteTitle Вы действительно хотите </br> Удалить Клиента
            +e.modalDelete-btnWrap
                +e.modalDelete-btnCancel(@click="$modal.hide('delete-customer')") Отмена
                +e.modalDelete-btnOk(@click="deleteRow") Да
    loading(:active.sync="loading")

    +e.VMODAL.modalDetails(
        name="change-customer"
        height="auto"
        width="85%"
        adaptive
    )
        +e.FORM.form(@submit.prevent="submitChangeCustomer")
            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="email") Email*
                    +e.INPUT.input#email(type="email" v-model="changeCustomer.email" required)

                +e.labelWrap
                    +e.LABEL.label(for="firstName") Фамилия*
                    +e.INPUT.input#firstName(v-model="changeCustomer.first_name" required)

                +e.labelWrap
                    +e.LABEL.label(for="middleName") Отчество
                    +e.INPUT.input#middleName(v-model="changeCustomer.middle_name")

                +e.labelWrap
                    +e.LABEL.label(for="secondName") Имя*
                    +e.INPUT.input#secondName(v-model="changeCustomer.second_name" required)

            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="birthDate") Дата Рождения
                    +e.INPUT.input#birthDate(v-model="changeCustomer.birth_date" placeholder="YYYY-MM-DD")

                +e.labelWrap
                    +e.LABEL.label(for="sex") Пол
                    +e.V-SELECT.select#sex(
                        :options="sexOption"
                        v-model="changeCustomer.sex"
                    )

                +e.labelWrap
                    +e.LABEL.label(for="document") Документ
                    +e.INPUT.input#document(v-model="changeCustomer.document_id")

                +e.labelWrap
                    +e.LABEL.label(for="notes") Заметки
                    +e.TEXTAREA.textarea#notes(v-model="changeCustomer.notes")

            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="price") Прайс
                    +e.INPUT.input#price(type="number" v-model="changeCustomer.price")


            +e.BUTTON.btn.btn.btn-success(type="submit") Отправить


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

    sexOption: Array<any> = [ "m", "f" ];

    changeCustomer: {
        account_id: number,
        birth_date: string,
        document_id: string,
        email: string,
        first_name: string,
        id: number,
        middle_name: string | null,
        notes: string,
        originalIndex: number,
        person_id: number,
        phones: Array<string>,
        photo: null,
        price: number,
        second_name: string,
        sex: string | {},
        user_id: number | null,
        vgt_id: number,
    } = {
        account_id: 1,
        birth_date: "",
        document_id: "",
        email: "",
        first_name: "",
        id: 1,
        middle_name: null,
        notes: "",
        originalIndex: 0,
        person_id: 1,
        phones: ["0991190"],
        photo: null,
        price: 1,
        second_name: "",
        sex: "",
        user_id: null,
        vgt_id: 0,
    };

    @State(state => state.baseTable.loadedComponent) loadedComponent!: boolean;
    @State(state => state.baseTable.loading) loading!: boolean;
    @State(state => state.baseTable.loadedCustomer) loadedCustomer!: boolean;
    @State(state => state.baseTable.customers) customers!: string[];

    @Action allClients!: () => void;
    @Action customerDelete!: (id: number) => void;
    @Action customerUpdate!: ({}: any) => void;

    onRowClick(params: any) {
        if (params.event.target.classList[0] !== "Clients__iconEdit") {
        }
    }

    edit(item: any): void {
        this.changeCustomer = item.row;
        this.$modal.show('change-customer');
    }

    showModalDelete(id: number): void {
        this.$modal.show('delete-customer');
        this.numDeleteRow = id;
    }

    deleteRow(): void {
        this.customerDelete(this.numDeleteRow);
        this.$modal.hide('delete-customer');
    }

    submitChangeCustomer(): void {
        delete this.changeCustomer.user_id;
        delete this.changeCustomer.vgt_id;
        delete this.changeCustomer.originalIndex;
        delete this.changeCustomer.account_id;
        delete this.changeCustomer.person_id;
        delete this.changeCustomer.photo;

        this.$modal.hide('change-customer');
        this.customerUpdate(this.changeCustomer);
    }

    created() {
        if (this.loadedComponent && !this.loadedCustomer) {
            this.allClients();
        }
    }

}


</script>

<style lang="scss" scoped>
.Clients {
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

    &__form {
        width: 100%;

        &Wrap {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }
    }

    &__label {
        display: block;

        &Wrap {
            max-width: 200px;
            width: 100%;

            &:not(:last-child) {
                margin-right: 60px;
            }
        }
    }

    &__input,
    &__select,
    &__textarea {
        width: 100%;
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
