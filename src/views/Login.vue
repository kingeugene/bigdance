<template lang="pug">
include ../lib/pugDeps.pug

+b.Auth
    +e.FORM.form(@submit.prevent="submit" novalidate="novalidate")
        +e.H2.header Логин
        +e.subHeader заполните все поля
        baseinput(
            :formKey="formKey"
            label="Логин"
            name="name"
            v-model="name"
        )
        baseinput(
            :formKey="formKey"
            label="Пароль"
            name="password"
            v-model="password"
        )
        +e.valid {{ validLogin }}
        +e.BUTTON.button.btn.btn-success(type="submit") Вход
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Action, State} from "vuex-class";
import {mapFieldsToComputed} from "@/store/lib/vuex-form";

@Component({
    components: {
        baseinput: () => import(/* webpackChunkName: "components" */ "@/components/base/BaseInput.vue"),
    },
    computed: mapFieldsToComputed("loginForm", [
        "name",
        "password",
    ]),
})
export default class Login extends Vue {
    formKey = "loginForm";

    @State(state => state.login.validLogin) validLogin!: string;

    @Action("loginForm/submit") submit!: () => void;
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
