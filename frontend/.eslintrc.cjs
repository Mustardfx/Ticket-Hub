module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // можно использовать any
    "@typescript-eslint/no-unused-vars": "warn", // неиспользуемые переменные = предупреждение
    "vue/multi-word-component-names": "off", // можно компоненты с 1 словом
    "vue/block-lang": "off", // не требует везде lang="ts"

    "no-console": "warn", // консоль можно, но предупреждение
    "no-debugger": "warn", // debugger можно, но предупреждение
  },
}
