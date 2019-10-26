module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ['plugin:vue/recommended', 'standard'],
    globals: {},
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'semi': ['error', 'always'],
        'indent': ['error', 4],
        'space-before-function-paren': 0,
        'no-trailing-spaces': 2,
        'vue/html-indent': [1, 4],
        'vue/html-self-closing': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue/multiline-html-element-content-newline': 0
    }
};
