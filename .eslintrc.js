module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: [
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:vue/vue3-recommended'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2020
    },
    rules: {
        quotes: ['error', 'single'],
        indent: ['error', 4],
        camelcase: 'off',
        'vue/multi-word-component-names': 0,
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prefer-const': 'off',
        'space-before-function-paren': 'off',
        'no-use-before-define': 'off'
    }
}
