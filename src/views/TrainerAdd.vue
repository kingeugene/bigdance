<template lang="pug">
include ../lib/pugDeps.pug
+b.TrainersAdd
    +e.H1.title Добавить тренера
    template(v-if="loadedInit")
        +e.FORM.form(@submit.prevent="submitForm")
            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="email") Номер карты*
                    +e.INPUT.input#email(type="text" v-model="emailAdd" required)

                +e.labelWrap
                    +e.LABEL.label(for="firstName") Фамилия*
                    +e.INPUT.input#firstName(v-model="firstNameAdd" required)

                +e.labelWrap
                    +e.LABEL.label(for="secondName") Имя*
                    +e.INPUT.input#secondName(v-model="secondNameAdd" required)

                +e.labelWrap
                    +e.LABEL.label(for="photo") Фото
                    +e.INPUT.input#photo(accept="image/*" @change="uploadFile" type="file")
            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="birthDate") Дата Рождения
                    +e.INPUT.input#birthDate(v-model="birthDateAdd" placeholder="YYYY-MM-DD")

                +e.labelWrap
                    +e.LABEL.label(for="sex") Пол
                    +e.V-SELECT.select#sex(
                        :options="sexOption"
                        v-model="selectSex"
                    )

                +e.labelWrap
                    +e.LABEL.label(for="document") Документ
                    +e.INPUT.input#document(v-model="documentAdd")

                +e.labelWrap
                    +e.LABEL.label(for="notes") Заметки
                    +e.TEXTAREA.textarea#notes(v-model="notesAdd")

            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="position") Должность
                    +e.INPUT.input#position(v-model="positionAdd")

                +e.labelWrap
                    +e.LABEL.label(for="wage") Зарплата
                    +e.INPUT.input#wage(type="number" v-model="wageAdd")

                +e.labelWrap
                    +e.LABEL.label(for="price") Прайс
                    +e.INPUT.input#price(type="number" v-model="priceAdd")

                +e.labelWrap
                    +e.LABEL.label(for="phones") Телефон
                    +e.INPUT.input#phones(type="tel" :maxlength="11" v-model="phonesAdd")

            +e.formWrap
                +e.labelWrap
                    +e.label(for="switchUserAdd") Доступ к сайту
                    +e.LABEL(for="switchUserFalse") Нет
                        +e.INPUT.switch#switchUserFalse(type="radio" :value="false" v-model="switchUserAdd")
                    +e.LABEL(for="switchUserTrue") Да
                        +e.INPUT.switch#switchUserTrue(type="radio" :value="true" v-model="switchUserAdd")

                template(v-if="switch_user")
                    +e.labelWrap
                        +e.LABEL.label(for="username") Логин
                        +e.INPUT.input#username(v-model="usernameAdd")

                    +e.labelWrap
                        +e.LABEL.label(for="password") Пароль
                        +e.INPUT.input#password(type="password" v-model="passwordAdd")

                +e.labelWrap
                    +e.LABEL.label(for="styleId") Тип танца
                    +e.V-SELECT.select#styleId(
                        :options="activityStyle"
                        v-model="styleIdAdd"
                    )
            +e.formWrap
                +e.V-SELECT.select#styleId(
                    multiple
                    :options="availabilityDayOption"
                    v-model="setAvailabilityDay"
                )

                +e.availabilityList(v-for="(item, index) in setAvailabilityDay" :key="index")
                    +e.availabilityWrap
                        +e.availabilityName {{item.label}}
                        +e.LABEL(for="switchUserFalse") C
                            +e.INPUT.switch(v-model="setAvailabilityDay[index].from" )
                        +e.LABEL(for="switchUserTrue") Дo
                            +e.INPUT.switch(v-model="setAvailabilityDay[index].to" )
            +e.BUTTON.btn.btn.btn-success(type="submit") Отправить
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";

@Component({

})
export default class TrainersAdd extends Vue {
    sexOption: Array<{label: string, code: string}> = [
        {
            label: "Мужчина",
            code: "m",
        },
        {
            label: "Женщина",
            code: "f",
        },
    ];

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

    setAvailabilityDay: Array<{label: string, slot: string, from: string, to: string}> = [];

    @State(state => state.trainersAdd.email) email!: string;
    @Mutation setEmail!: (email: string) => void;

    @State(state => state.trainersAdd.first_name) first_name!: string;
    @Mutation setFirstName!: (firstName: string) => void;

    @State(state => state.trainersAdd.second_name) second_name!: string;
    @Mutation setSecondName!: (secondName: string) => void;

    @State(state => state.trainersAdd.birth_date) birth_date!: string;
    @Mutation setBirthDate!: (birthDate: string) => void;

    @State(state => state.trainersAdd.sex) sex!: { label: string, code: string };
    @Mutation setSex!: (sex: { label: string, code: string }) => void;

    @State(state => state.trainersAdd.document_id) document_id!: string;
    @Mutation setDocument!: (notes: string) => void;

    @State(state => state.trainersAdd.notes) notes!: string;
    @Mutation setNotes!: (notes: string) => void;

    @State(state => state.trainersAdd.switch_user) switch_user!: boolean;
    @Mutation setSwitchUser!: (switchUser: boolean) => void;

    @State(state => state.trainersAdd.username) username!: string;
    @Mutation setUsername!: (username: string) => void;

    @State(state => state.trainersAdd.password) password!: string;
    @Mutation setPassword!: (password: string) => void;

    @State(state => state.trainersAdd.position) position!: string;
    @Mutation setPosition!: (position: string) => void;

    @State(state => state.trainersAdd.wage) wage!: string;
    @Mutation setWage!: (wage: string) => void;

    @State(state => state.trainersAdd.price) price!: string;
    @Mutation setPrice!: (price: string) => void;

    @State(state => state.trainersAdd.style_id) style_id!: {};
    @Mutation setStyleId!: (style_id: {}) => void;

    @State(state => state.trainersAdd.availability) availability!: string;

    @State(state => state.trainersAdd.phones) phones!: string;
    @Mutation setPhones!: (phones: string) => void;

    @State(state => state.trainersAdd.photo) photo!: any;
    @Mutation setPhotoTrainers!: (phones: any) => void;

    @State(state => state.trainersAdd.activityStyle) activityStyle!: [];
    @State(state => state.baseTable.loadedInit) loadedInit!: boolean;

    @Mutation setAvailability!: (availability: {slot: string, from: string, to: string}[] ) => void;

    @Action submitTrainers!: () => void;
    @Action initBaseTable!: () => void;

    get emailAdd(): string {
        return this.email;
    }

    set emailAdd(email: string) {
        this.setEmail(email);
    }

    get firstNameAdd(): string {
        return this.first_name;
    }

    set firstNameAdd(firstName: string) {
        this.setFirstName(firstName);
    }

    get secondNameAdd(): string {
        return this.second_name;
    }

    set secondNameAdd(secondName: string) {
        this.setSecondName(secondName);
    }

    get birthDateAdd(): string {
        return this.birth_date;
    }

    set birthDateAdd(birthDate: string) {
        this.setBirthDate(birthDate);
    }

    get selectSex(): { label: string, code: string } {
        return this.sex;
    }

    set selectSex(sex: { label: string, code: string }) {
        this.setSex(sex);
    }

    get documentAdd(): string {
        return this.document_id;
    }

    set documentAdd(document: string) {
        this.setDocument(document);
    }

    get notesAdd(): string {
        return this.notes;
    }

    set notesAdd(notes: string) {
        this.setNotes(notes);
    }

    get switchUserAdd(): boolean {
        return this.switch_user;
    }

    set switchUserAdd(switchUser: boolean) {
        this.setSwitchUser(switchUser);
    }

    get usernameAdd(): string {
        return this.username;
    }

    set usernameAdd(username: string) {
        this.setUsername(username);
    }

    get passwordAdd(): string {
        return this.password;
    }

    set passwordAdd(password: string) {
        this.setPassword(password);
    }

    get positionAdd(): string {
        return this.position;
    }

    set positionAdd(position: string) {
        this.setPosition(position);
    }

    get wageAdd(): string {
        return this.wage;
    }

    set wageAdd(wage: string) {
        this.setWage(wage);
    }

    get priceAdd(): string {
        return this.price;
    }

    set priceAdd(price: string) {
        this.setPrice(price);
    }

    get styleIdAdd(): {} {
        return this.style_id;
    }

    set styleIdAdd(styleId: {}) {
        this.setStyleId(styleId);
    }

    get phonesAdd(): string {
        return this.phones;
    }

    set phonesAdd(phones: string) {
        this.setPhones(phones);
    }

    uploadFile(event) {
        this.setPhotoTrainers(event.target.files[0])
    }

    submitForm(): void {
        const availability = this.setAvailabilityDay.map((item) => {
           delete item.label;
           return item;
        });

        this.setAvailability(availability);

        this.submitTrainers();
    }

    created() {
        if (!this.loadedInit) {
            this.initBaseTable();
        }
    }
}
</script>

<style lang="scss" scoped>
.TrainersAdd {
    padding: 30px 0;

    &__title {
        text-align: center;
        margin-bottom: 40px;
        color: $orange;
    }

    &__form {
        margin: 0 -60px;
        padding: 40px 60px;
        box-shadow: 0 7px 60px rgba(0,0,0,0.06);
        border-radius: 50px;

        &Wrap {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            @include bp(m) {
                margin-bottom: 40px;
            }
        }
    }

    &__label {
        display: block;

        &Wrap {
            width: 100%;

            @include bp(m) {
                max-width: 200px;
            }

            &:not(:last-child) {
                @include bp(m) {
                    margin-right: 60px;
                }
            }
        }
    }

    &__input,
    &__select,
    &__textarea {
        width: 100%;
    }

    &__switch {
        margin: 0 10px;
    }

    #switchUserFalse {
        margin-right: 20px;
    }

}
</style>
