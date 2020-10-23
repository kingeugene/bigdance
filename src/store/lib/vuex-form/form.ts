import { ActionContext, Commit, Dispatch, Module } from "vuex";
// @ts-ignore
import { Map, Set } from "immutable";
import { isString, debounce, isFunction, isArray } from "lodash";

type FieldTypes = String | Number | Boolean | Object;

export type Translator = () => string;

export type Validator = (
    value,
    fields: Hash<any>,
    rootState: any,
    rootGetters: any,
) => void | string;

export function mapFieldsToComputed(formKey: string, fields: string[]) {
    return fields.reduce((acc, field) => {
        acc[field] = {
            get() {
                return this.$store.getters[`${formKey}/field`](field);
            },
            set(value) {
                this.$store.dispatch(`${formKey}/changeField`, {value, field});

                return value;
            },
        };

        return acc;
    }, {});
}

export interface HookContext {
    value: any;
    commit: Commit;
    dispatch: Dispatch;
    fields: Hash<any>;
    rootState: any;
    state: any;
    rootGetters: any;
    meta: any;
}

export interface FieldConfig {
    type: StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor;
    validators?: Validator[];
    interceptor?(ctx: HookContext): any;
    hooks?: {
        updated?(ctx: HookContext): any;
    };
}

type FieldsHash<TField> = { [K in keyof TField]: FieldConfig };
export type DefaultValues = {[field: string]: any};

interface FormOptions<TField> {
    fields: FieldsHash<TField>;
    defaultValues?: DefaultValues;
    debounce?: number | boolean;
    onSubmit(ctx: ActionContext<FormState<TField>, any>, payload: any): void;
}

type FieldsState<TFields, K extends keyof TFields = keyof TFields> = Map<
    K,
    TFields[K]
>;
type ErrorsState<TFields> = Map<keyof TFields, string[]>;

export interface FormState<TFields> {
    submited: boolean;
    valid: boolean;
    fetchStatus: FetchStatus;
    touched: Set<keyof TFields>;
    fields: FieldsState<TFields>;
    errors: ErrorsState<TFields>;
}

export interface SubmitMeta {
    validate?: boolean;
    validateOnly?: string[];
}

export class Form<TFields = any> implements Module<FormState<TFields>, any> {
    readonly fields: FieldsHash<TFields>;
    readonly defaultValues: DefaultValues | undefined;
    readonly onSubmit: (
        context: ActionContext<FormState<TFields>, any>,
        payload: any
    ) => void;

    public namespaced = true;
    public state: FormState<TFields>;

    private debouncedFieldValidators!: Hash<(dispatch: Dispatch) => any>;

    constructor(private options: FormOptions<TFields>) {
        this.fields = this.options.fields;
        this.defaultValues = this.options.defaultValues;
        this.onSubmit = this.options.onSubmit;
        this.state = this.getDefaultState();

        if (typeof this.options.debounce === "boolean" && !this.options.debounce) {
            return;
        }

        this.options.debounce = this.options.debounce || 300;

        Object.keys(this.fields).forEach(field => {
            if (!this.fields[field].hooks) {
                this.fields[field].hooks = {};
            }
        });

        this.debouncedFieldValidators = Object.keys(this.fields).reduce((acc, key) => {
            acc[key] = debounce(
                dispatch => {
                    dispatch("validate", { field: key });
                },
                this.options.debounce as number
            );

            return acc;
        }, {});
    }

    get mutations() {
        const self = this;
        type State = FormState<TFields>;

        return {
            setFetchStatus(state: State, status: FetchStatus) {
                state.fetchStatus = status;
            },
            setSubmited(state: State, submited: boolean) {
                state.submited = submited;
            },
            reset(state: State, params: { clearFields: boolean }) {
                state.submited = false;
                state.valid = false;

                state.errors = state.errors.clear();
                state.fetchStatus = "init";
                state.touched = state.touched.clear();

                if (params && params.clearFields) {
                    state.fields = self.generateFields();
                }
            },
            resetFields(state: State, params: { fields: string[] }) {
                state.fields = state.fields.merge(self.generateFields(params.fields));
            },
            setErrors(state: State, { errors }) {
                const map = Map(errors)
                    .filter((value, key) => state.fields.has(key as keyof TFields) || key === "form");

                state.errors = state.errors.merge(map) as ErrorsState<TFields>;
            },
            setFieldValue(state: State, { field, value, trusted }) {
                state.fields = state.fields.set(field, value);

                if (!state.touched.has(field) && trusted) {
                    state.touched = state.touched.add(field);
                }
            },
            setData(state: State, { fields }) {
                if (Object.keys(fields).some(k => !state.fields.has(k as keyof TFields))) {
                    throw new Error(
                        "You can't set fields that don't exist in config"
                    );
                }

                state.fields = state.fields.merge(fields);
            },
        };
    }

    get getters() {
        type State = FormState<TFields>;
        const self = this;

        return {
            loading(state: State) {
                return state.fetchStatus === "loading";
            },
            isValid: (state: State) => (validateOnly: string[] = []) => {
                return !state.errors.some(
                    (e, field) =>
                        validateOnly.length !== 0
                            ? validateOnly.includes(field as string) && e.length !== 0
                            : e.length !== 0
                );
            },
            dirty: (state: State) => {
                return state.touched.size !== 0;
            },
            field: (state: State) => (field: keyof TFields) => {
                return state.fields.get(field);
            },
            allFields: (state: State) => {
                return state.fields.toObject();
            },
            error: (state: State) => (field: keyof TFields) => {
                return (state.errors.get(field) || [])[0];
            },
            errorsByValidators: (state: State, getters: any, ) => (fields: string[] = []) => {
                const values = fields.map(field => ({
                    value: getters.field(field),
                    field,
                }));
                const errors = values.map(({field, value}) => {
                    return {
                        field,
                        errors: self.validateField(
                            field,
                            value,
                            state.fields.toObject(),
                            state,
                            getters
                        ),
                    };
                });

                return errors;
            },
        };
    }

    get actions() {
        const self = this;

        return {
            async setData({ commit, state, dispatch }, { fields, validate }) {
                commit("setData", { fields });

                if (validate) {
                    const validateFields = isArray(validate)
                        ? validate
                        : Object.keys(fields);

                    for (let field of validateFields) {
                        await dispatch("validate", { field });
                    }
                }

                return Promise.resolve();
            },
            changeField(
                { commit, state, dispatch, rootState, rootGetters },
                { field, value, trusted, noInterceptors, noValidate, meta, clearErrors }
            ) {
                if (isString(value)) {
                    value = value.trim();
                }

                if (self.fields[field].interceptor && !noInterceptors) {
                    value = self.fields[field].interceptor({
                        value,
                        commit,
                        fields: state.fields.toObject(),
                        state,
                        rootState,
                        rootGetters,
                        dispatch,
                        meta,
                    });
                }

                commit("setFieldValue", { field, value, trusted });

                if (self.fields[field].hooks.updated) {
                    self.fields[field].hooks.updated({
                        value,
                        commit,
                        fields: state.fields.toObject(),
                        state,
                        rootState,
                        rootGetters,
                        dispatch,
                        meta,
                    });
                }

                if (noValidate) {
                    return;
                }

                if (clearErrors) {
                    this.clearErrors(commit, { field });
                }

                self.debouncedFieldValidators[field](dispatch);
            },
            runInterceptor({state, getters, commit, dispatch, rootState, rootGetters}, payload) {
                let { field, meta } = payload || {} as any;

                if (!field) {
                    throw new Error(
                        "Field is required for runInterceptor action"
                    );
                }

                const value = self.fields[field].interceptor({
                    value: getters.field(field),
                    commit,
                    fields: state.fields.toObject(),
                    state,
                    rootState,
                    rootGetters,
                    dispatch,
                    meta,
                });

                commit("setFieldValue", { field, value });
            },
            async validate({ commit, state, getters, rootState, rootGetters }, { field }) {
                const value = getters.field(field);
                const errors = self.validateField(
                    field,
                    value,
                    state.fields.toObject(),
                    rootState,
                    rootGetters
                );

                if (typeof getters.error(field) === "undefined" && errors.length === 0) {
                    return;
                }

                commit("setErrors", {
                    errors: { [field]: errors, form: [] },
                });
            },
            async validateAll(
                { commit, dispatch, state },
                params
            ) {
                const { validateOnly } = params || {} as any;
                const fields = state.fields;

                if ((validateOnly || []).some(f => !fields.has(f))) {
                    throw new Error(
                        "validateOnly should contain only existing fields"
                    );
                }

                await Promise.all(
                    fields
                        .filter(
                            (f, field) =>
                                (validateOnly || []).length !== 0
                                    ? validateOnly.includes(field)
                                    : true
                        )
                        .map((f, field) => dispatch("validate", { field }))
                );
            },
            async submit(
                ctx,
                params: { payload: any; meta: SubmitMeta }
            ) {
                const { meta, payload } = params || {} as any;

                if (!ctx.state.submited) {
                    ctx.commit("setSubmited", true);
                }

                const validate = meta && ('validate' in meta) ? meta.validate : true;

                if (validate) {
                    await ctx.dispatch("validateAll", {
                        validateOnly: meta && meta.validateOnly,
                    });
                }

                const isValid = ctx.getters.isValid(meta && meta.validateOnly);

                if (validate && !isValid) {
                    return;
                }

                await self.onSubmit(ctx, payload);
            },
            clearErrors({ commit } , { field }) {
                commit("setErrors", {
                    errors: { [field]: [], form: [] },
                });
            },
        };
    }

    private getDefaultState(): FormState<TFields> {
        return {
            submited: false,
            fetchStatus: "init",
            touched: Set(),
            valid: false,
            fields: this.generateFields(),
            errors: Map(),
        };
    }

    private generateFields(fields?: string[]): FieldsState<TFields> {
        const fieldsToGenerate = fields ? fields : Object.keys(this.fields);

        return fieldsToGenerate.reduce(
            (acc, fieldName) => {
                const field = this.fields[fieldName];
                const defaultValue = this.defaultValues && this.defaultValues[fieldName] || this.getFieldDefaultValue(field.type);

                return acc.set(fieldName as any, defaultValue as any);
            },
            Map() as FieldsState<TFields>
        );
    }

    private getFieldDefaultValue(type: FieldTypes): string | number | boolean {
        if (!type) {
            throw new Error("Type is required");
        }

        return (type as any)();
    }

    private validateField(
        field: string,
        value: any,
        fields: Hash<any>,
        rootState: any,
        rootGetters: any
    ): string[] {
        const fieldConfig = this.fields[field];
        const validators = (fieldConfig || {}).validators;

        if (!validators) {
            return [];
        }

        for (const validator of (validators || [])) {
            if (!isFunction(validator)) {
                throw new Error("Validator should be function.");
            }

            let result;

            try {
                result = validator(value, fields, rootState, rootGetters);
            } catch (e) {
                console.error(e);
            }

            if (result) {
                if (!isString(result)) {
                    throw new Error(
                        "Validator should return string if invalid."
                    );
                }

                return [result];
            }
        }

        return [];
    }
}

export function createForm<TFields>(name: string, config): Form<TFields> {
    window.FORMS.push(name);

    return new Form(config);
}
