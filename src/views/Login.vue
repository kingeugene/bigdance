<template lang="pug">
include ../lib/pugDeps.pug
+b.Auth
    +e.FORM.form(@submit.prevent="submitForm")
        +e.H2.header Логин
        +e.subHeader заполните все поля
        +e.LABEL.label(for="Auth__login") Логин
        +e.INPUT.input#Auth__login(
            type="email"
            v-model="email"
        )
        +e.LABEL.label(for="Auth__password") Пароль
        +e.INPUT.input#Auth__password(
            type="password"
            v-model="password"
        )
        +e.BUTTON.button.btn.btn-success(
            type="submit"
        ) Вход
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation, Getter, Action } from "vuex-class";


@Component({

})
export default class Login extends Vue {
    email: string = "";
    password: string = "";

    @Action submitL!: (o: {email: string; password: string;}) => void;

    submitForm(): void {
        console.error(this.email);
        console.error(this.password);
        this.submitL({email: this.email, password: this.password});
    }
}
</script>

<style lang="scss" scoped>
.Auth {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 200px);

    &__subHeader {
        margin-bottom: 30px;
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__label {
        text-align: left;
    }

    &__input {
        padding: 5px 10px;
        margin-bottom: 20px;
    }

    &__button {
        padding: 10px 30px;
    }
}
</style>
