import { Translator, Validator } from "@/store/lib/vuex-form/form";
import fecha from "fecha";

export const custom = (func: Validator) => (value, fields, rootState, rootGetters) => {
    return func(value, fields, rootState, rootGetters);
};

export const required = (canBeZero = false): Validator => (value) => {
    if (value === ""
        || (!canBeZero && value == 0)
        || value === undefined
        || value === null
        || value === false
        || Object.entries(value).length === 0 && value.constructor === Object) {
        return "Поле обязательное"
    }
};

export const length = (length: number): Validator => (value) => {
    if (value.length !== length) {
        return `Длина должна быть ${length}`;
    }
};

export const minLength = (min: number): Validator => (value) => {
    if (value.length < min) {
        return `Минимальная Длина должна быть ${min}`;
    }
};

export const maxLength = (max: number): Validator => (value) => {
    if (value && value.length > max) {
        return `Максимальная Длина должна быть ${max}`;
    }
};

export const minValue = (min: number | string): Validator => (value: string) => {
    if (Number(value) < min) {
        return `Минимальное значение должна быть ${min}`;
    }
};

export const maxValue = (max: number): Validator => (value: string) => {
    if (Number(value) > max) {
        return `Максимальная значение должна быть ${max}`;
    }
};

export const digits = (): Validator => (value: string) => {
    if (!/^[0-9]*$/.test(value)) {
        return "Должно быть числом"
    }
};

export const alpha = (): Validator => (value: string) => {
    if (!/^[a-zA-Z]*$/.test(value)) {
        return "Только буквы";
    }
};

export const alphanumeric = (): Validator => (value: string) => {
    if (!/^[a-zA-Z0-9_]*$/.test(value)) {
        return "Только числа и буквы";
    }
};

export const float = (): Validator => (value: string) => {
    if (!/^\d+((\.|,)\d+)?$/.test(value)) {
        return "Only numbers is allowed";
    }
};

export const email = (): Validator => (value: string) => {
    // eslint-disable-next-line max-len
    if (!/^(([^<>()[\]\\!`.,;:\s@"]+(\.[^<>()[\]\\!`.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)) {
        return "Email is not valid";
    }
};

export const password = (): Validator => (value: string) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+=.,;:'"`(){}?!@#$%^<>&№*/~\]\\])(?=.{8,})/.test(value)) {
        return "Пароль не валидный";
    }
};

export const when = (condition: (value, fields, rootState, rootGetters) => boolean, func: Validator) =>
    (value, fields, rootState, rootGetters) => {
        if (condition(value, fields, rootState, rootGetters)) {
            return func(value, fields, rootState, rootGetters);
        }
    };

export const dateMoreThan = (diff: number, compareWith: number | string, translate?: Translator): Validator => (value: number, fields) => {
    const parsedValue = new Date(value).getTime();

    if (typeof compareWith === "number") {
        const date = new Date(compareWith + diff);
        const label = fecha.format(date, "YYYY.MM.DD");

        return (parsedValue - compareWith <= diff)
            ? `Date must be more than ${label}`
            : "";
    } else {
        const parsedStart = new Date(fields[compareWith]).getTime();
        return parsedValue - parsedStart <= diff
            ? `Date must be more than, ${typeof translate === "function" ? translate() : compareWith})`
            : "";
    }
};
