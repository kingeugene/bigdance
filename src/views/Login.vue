<template lang="pug">
include ../lib/pugDeps.pug
+b.Auth
    +e.FORM.form(@submit.prevent="submitForm({email: email, password: password})")
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
        +e.valid {{ validLogin }}
        +e.BUTTON.button.btn.btn-success(
            type="submit"
        ) Вход
            loading(
                :active.sync="isLoaded"
            )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation, Getter, Action } from "vuex-class";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

@Component({
    components: {
        Loading,
    }
})
export default class Login extends Vue {
    email: string = "";
    password: string = "";

    @State(state => state.login.validLogin) validLogin!: string;
    @State(state => state.login.status) isLoaded!: string;

    @Action submitForm!: (o: {email: string; password: string;}) => void;
}
</script>

<style lang="scss" scoped>
.Auth {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 40px);

    &__subHeader {
        margin-bottom: 30px;
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 50px;
        padding: 50px 80px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .4);
    }

    &__label {
        text-align: left;
    }

    &__input {
        padding: 5px 10px;
        margin-bottom: 20px;
    }

    &__button {
        margin-top: 10px;
        padding: 10px 30px;
    }

    &__valid {
        color: red;
    }
}
</style>
