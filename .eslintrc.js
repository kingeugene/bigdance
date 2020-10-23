const notify = process.env.NODE_ENV !== "production" ? "off" : "off";

module.exports = {
    root: true,
    env: { node: true },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "@vue/typescript",
    ],
    plugins: ["typescript"],
    rules: {
        "no-console": [
            notify,
            {
                allow: [
                    "warn",
                    "error",
                ],
            },
        ],
        "no-debugger": notify,
        "array-element-newline": notify,
        "array-bracket-newline": notify,
        "no-empty": [
            "error",
            { "allowEmptyCatch": true },
        ],
        "max-len": [
            notify,
            { "code": 150 },
        ],
        "indent": [
            notify,
            4,
            { "SwitchCase": 1 },
        ],
        semi: [
            notify,
            "always",
        ],
        "no-implicit-dependencies": 0,
        "comma-dangle": [
            notify,
            {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "never",
                exports: "never",
                functions: "ignore",
            },
        ],
        "prefer-const": 0,
        "prefer-spread": 0,
        "no-prototype-builtins": 0,
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
};
