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
        +e.FORM.form(@submit.prevent="submitChangeCoach")
            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="email") Номер карты**
                    +e.INPUT.input#email(type="text" v-model="changeCoach.email" required)

                +e.labelWrap
                    +e.LABEL.label(for="firstName") Фамилия*
                    +e.INPUT.input#firstName(v-model="changeCoach.first_name" required)

                +e.labelWrap
                    +e.LABEL.label(for="secondName") Имя*
                    +e.INPUT.input#secondName(v-model="changeCoach.second_name" required)

            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="birthDate") Дата Рождения
                    +e.INPUT.input#birthDate(v-model="changeCoach.birth_date" placeholder="YYYY-MM-DD")

                +e.labelWrap
                    +e.LABEL.label(for="sex") Пол
                    +e.V-SELECT.select#sex(
                        :options="sexOption"
                        v-model="changeCoach.sex"
                    )

                +e.labelWrap
                    +e.LABEL.label(for="document") Документ
                    +e.INPUT.input#document(v-model="changeCoach.document_id")

                +e.labelWrap
                    +e.LABEL.label(for="notes") Заметки
                    +e.TEXTAREA.textarea#notes(v-model="changeCoach.notes")
            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="position") Документ
                    +e.INPUT.input#position(v-model="changeCoach.position")

                +e.labelWrap
                    +e.LABEL.label(for="wage") Зарплата
                    +e.INPUT.input#wage(type="number" v-model="changeCoach.wage")

                +e.labelWrap
                    +e.LABEL.label(for="price") Прайс
                    +e.INPUT.input#price(type="number" v-model="changeCoach.price")

                +e.labelWrap
                    +e.LABEL.label(for="styleId") Тип танца
                    +e.V-SELECT.select#styleId(
                        :options="activityStyle"
                        v-model="changeCoach.style_id"
                    )
            +e.formWrap
                +e.V-SELECT.select#styleId(
                    label="slot"
                    multiple
                    :options="availabilityDayOption"
                    v-model="changeCoach.availability"
                )

                +e.availabilityList(v-for="(item, index) in changeCoach.availability" :key="index")
                    +e.availabilityWrap
                        +e.availabilityName {{item.slot}}
                        +e.LABEL(for="switchUserFalse") C
                            +e.INPUT.switch(v-model="changeCoach.availability[index].from" )
                        +e.LABEL(for="switchUserTrue") Дo
                            +e.INPUT.switch(v-model="changeCoach.availability[index].to" )


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

    changeCoach: {
        account_id: number
        availability: []
        birth_date: string
        document_id: string
        email: string
        first_name: string
        id: number
        notes: string
        originalIndex: number
        person_id: number
        phones: []
        photo: string | null
        position: string
        price: number
        second_name: string
        sex: string
        style_id: number
        user_id: number
        vgt_id: number
        wage: number
    } = {
        person_id: 0,
        position: "",
        wage: 0,
        price: 0,
        style_id: 1,
        id: 1,
        user_id: 1,
        email: "",
        first_name: "",
        second_name: "Alexander",
        account_id: 1,
        birth_date: "1999-10-10",
        sex: "f",
        photo: null,
        document_id: "kasjhdihasd",
        notes: "Bla Bla Bla",
        phones: [],
        availability: [],
        vgt_id: 0,
        originalIndex: 0,
    };

    sexOption: Array<any> = [ "m", "f" ];

    availabilityDayOption: Array<{label: string, slot: string, from: string, to: string}> = [
        {
            label: "Понедельник",
            slot: "monday",
            from: "",
            to: "",
        },
        {
            label: "Вторник",
            slot: "tuesday",
            from: "",
            to: "",
        },
        {
            label: "Среда",
            slot: "wednesday",
            from: "",
            to: "",
        },
        {
            label: "Четверг",
            slot: "thursday",
            from: "",
            to: "",
        },
        {
            label: "Пятницы",
            slot: "friday",
            from: "",
            to: "",
        },
        {
            label: "Суббота",
            slot: "saturday",
            from: "",
            to: "",
        },
        {
            label: "Воскресенье",
            slot: "sunday",
            from: "",
            to: "",
        },
    ];

    @State(state => state.baseTable.loadedComponent) loadedComponent!: boolean;
    @State(state => state.baseTable.loadedCoach) loadedCoach!: boolean;
    @State(state => state.baseTable.loading) loading!: boolean;

    @State(state => state.baseTable.coach) coach!: string[];
    @State(state => state.trainersAdd.activityStyle) activityStyle!: [];
    @State(state => state.trainersAdd.loadingStyle) loadingStyle!: boolean;

    @Action allCoach!: () => void;
    @Action activityStyleTrain!: () => void;
    @Action coachDelete!: (id: number) => void;
    @Action coachUpdate!: ({}: any) => void;

    @Mutation deleteRows!: (id: number) => void;

    onRowClick(params: any) {
        if (params.event.target.classList[0] !== "Coach__iconEdit") {
            this.$router.push(`/coach-page/${params.row.id}`)
        }
    }

    edit(item: any): void {
        this.changeCoach = item.row;
        this.$modal.show('change-coach');
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
        delete this.changeCoach.user_id;
        delete this.changeCoach.vgt_id;
        delete this.changeCoach.originalIndex;
        delete this.changeCoach.account_id;
        delete this.changeCoach.person_id;
        delete this.changeCoach.photo;

        this.$modal.hide('change-coach');
        this.coachUpdate(this.changeCoach);
    }

    created() {
        if (this.loadedComponent && !this.loadedCoach) {
            this.allCoach();
        }

        if (!this.loadingStyle) {
            this.activityStyleTrain();
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
