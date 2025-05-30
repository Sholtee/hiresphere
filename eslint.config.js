/*
 * File: eslint.config.js
 * Project: HireSphere
 *
 * Author: Denes Solti
 */
import vue from 'eslint-plugin-vue';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin-js';

export default [
  eslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    plugins: {
      stylistic
    },
    rules: {
      'no-var': ['error'],

      'vue/multi-word-component-names': 'off',

      'stylistic/array-bracket-spacing': ['error', 'never'],
      'stylistic/arrow-spacing': ['error', {
        before: true,
        after: true
      }],
      'stylistic/block-spacing': ['error', 'never'],
      'stylistic/comma-dangle': ['error', 'never'],
      'stylistic/brace-style': ['error', '1tbs', {
        allowSingleLine: false
      }],
      'stylistic/comma-spacing': ['error', {
        before: false,
        after: true
      }],
      'stylistic/comma-style': ['error', 'last'],
      'stylistic/computed-property-spacing': ['error', 'never'],
      'stylistic/dot-location': ['error', 'property'],
      'stylistic/eol-last': ['error', 'never'],
      'stylistic/function-call-spacing': ['error', 'never'],
      'stylistic/indent': ['error', 2, {
        SwitchCase: 1
      }],
      'stylistic/key-spacing': ['error', {
        afterColon: true,
        beforeColon: false,
        mode: 'strict'
      }],
      'stylistic/keyword-spacing': ['error', {
        after: true,
        before: true
      }],
      'stylistic/line-comment-position': ['error', {
        position: 'above'
      }],
      'stylistic/linebreak-style': ['error', 'windows'],
      'stylistic/max-len': ['error', {
        code: 120,
        ignoreComments: false,
        ignoreTrailingComments: false,
        ignoreStrings: false
      }],
      'stylistic/max-statements-per-line': ['error', {
        max: 1
      }],
      'stylistic/multiline-comment-style': ['error', 'starred-block'],
      'stylistic/new-parens': ['error', 'always'],
      'stylistic/no-confusing-arrow': ['error'],
      'stylistic/no-extra-semi': ['error'],
      'stylistic/no-mixed-spaces-and-tabs': ['error'],
      'stylistic/no-multi-spaces': ['error'],
      'stylistic/no-multiple-empty-lines': ['error', {
        max: 1,
        maxEOF: 0
      }],
      'stylistic/no-tabs': ['error'],
      'stylistic/no-trailing-spaces': ['error'],
      'stylistic/object-curly-spacing': ['error', 'never'],
      'stylistic/no-whitespace-before-property': ['error'],
      'stylistic/nonblock-statement-body-position': ['error', 'below'],
      'stylistic/object-curly-newline': ['error', {
        ObjectExpression: {
          multiline: true,
          minProperties: 1
        },
        ObjectPattern: {
          multiline: true,
          minProperties: 8
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 2
        }
      }],
      'stylistic/quote-props': ['error', 'consistent-as-needed'],
      'stylistic/rest-spread-spacing': ['error', 'never'],
      'stylistic/semi': ['error', 'always'],
      'stylistic/semi-spacing': ['error', {
        before: false
      }],
      'stylistic/semi-style': ['error', 'last'],
      'stylistic/space-before-blocks': ['error', 'always'],
      'stylistic/space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }],
      'stylistic/space-in-parens': ['error', 'never'],
      'stylistic/space-infix-ops': ['error'],
      'stylistic/space-unary-ops': ['error', {
        words: true,
        nonwords: false
      }],
      'stylistic/switch-colon-spacing': ['error', {
        after: true,
        before: false
      }],
      'stylistic/template-curly-spacing': ['error', 'never'],
      'stylistic/yield-star-spacing': ['error', 'after']
    }
  },
  {
    languageOptions: {
      globals: {
        console: 'readonly',
        CustomEvent: 'readonly',
        document: 'readonly',
        EventTarget: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        URLSearchParams: 'readonly',
        window: 'readonly'
      }
    }
  }
];