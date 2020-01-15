<template lang="pug">
include ../lib/pugDeps.pug
+b.CustomerAdd
    +e.H1.title Добавить клиента
    template(v-if="!loading")
        +e.FORM.form(@submit.prevent="submitForm")
            +e.formWrap
                +e.labelWrap
                    +e.LABEL.label(for="email") Номер карты*
                    +e.INPUT.input#email(type="text" v-model="emailAdd" required)

                +e.labelWrap
                    +e.LABEL.label(for="firstName") Фамилия*
                    +e.INPUT.input#firstName(v-model="firstNameAdd" required)

                +e.labelWrap
                    +e.LABEL.label(for="middleName") Отчество
                    +e.INPUT.input#middleName(v-model="middleNameAdd")

                +e.labelWrap
                    +e.LABEL.label(for="secondName") Имя*
                    +e.INPUT.input#secondName(v-model="secondNameAdd" required)

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
                    +e.LABEL.label(for="price") Прайс
                    +e.INPUT.input#price(type="number" v-model="priceAdd")

                +e.labelWrap
                    +e.LABEL.label(for="phones") Телефон
                    +e.INPUT.input#phones(type="tel" :maxlength="11" v-model="phonesAdd")

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

            +e.BUTTON.btn.btn.btn-success(type="submit") Отправить
    loading(:active.sync="loading")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State, Mutation, Action} from "vuex-class";

@Component({

})
export default class CustomerAdd extends Vue {
    sexOption: Array<any> = [
        {
            label: "Мужчина",
            code: "m",
        },
        {
            label: "Женщина",
            code: "f",
        },
    ];

    @State(state => state.customerAdd.email) email!: string;
    @Mutation setEmail!: (email: string) => void;

    @State(state => state.customerAdd.first_name) first_name!: string;
    @Mutation setFirstName!: (firstName: string) => void;

    @State(state => state.customerAdd.middle_name) middle_name!: string;
    @Mutation setMiddleName!: (middleName: string) => void;

    @State(state => state.customerAdd.second_name) second_name!: string;
    @Mutation setSecondName!: (secondName: string) => void;

    @State(state => state.customerAdd.birth_date) birth_date!: string;
    @Mutation setBirthDate!: (birthDate: string) => void;

    @State(state => state.customerAdd.sex) sex!: { label: string, code: string };
    @Mutation setSex!: (sex: { label: string, code: string }) => void;

    @State(state => state.customerAdd.document_id) document_id!: string;
    @Mutation setDocument!: (notes: string) => void;

    @State(state => state.customerAdd.notes) notes!: string;
    @Mutation setNotes!: (notes: string) => void;

    @State(state => state.customerAdd.switch_user) switch_user!: boolean;
    @Mutation setSwitchUser!: (switchUser: boolean) => void;

    @State(state => state.customerAdd.username) username!: string;
    @Mutation setUsername!: (username: string) => void;

    @State(state => state.customerAdd.password) password!: string;
    @Mutation setPassword!: (password: string) => void;

    @State(state => state.customerAdd.price) price!: string;
    @Mutation setPrice!: (price: string) => void;

    @State(state => state.customerAdd.phones) phones!: string;
    @Mutation setPhones!: (phones: string) => void;

    @State(state => state.customerAdd.loading) loading!: boolean;

    @Action submit!: () => void;

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

    get middleNameAdd(): string {
        return this.middle_name;
    }

    set middleNameAdd(middleName: string) {
        this.setMiddleName(middleName);
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

    get priceAdd(): string {
        return this.price;
    }

    set priceAdd(price: string) {
        this.setPrice(price);
    }

    get phonesAdd(): string {
        return this.phones;
    }

    set phonesAdd(phones: string) {
        this.setPhones(phones);
    }

    submitForm(): void {
        this.submit();
    }
}
</script>

<style lang="scss" scoped>
.CustomerAdd {
    padding: 30px 0;

    &__title {
        text-align: center;
        margin-bottom: 40px;
        color: $orange
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

    &__switch {
        margin: 0 10px;
    }

    #switchUserFalse {
        margin-right: 20px;
    }

}
</style>
