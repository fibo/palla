import typeScriptParser from '@typescript-eslint/parser'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import stylistic from '@stylistic/eslint-plugin'

const rules = {
  stylistic: {
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/arrow-spacing': ['error', { after: true, before: true }],
    '@stylistic/block-spacing': ['error', 'always'],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@stylistic/comma-dangle': ['error', 'only-multiline'],
    '@stylistic/comma-spacing': ['error', { after: true, before: false }],
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/function-call-spacing': ['error', 'never'],
    '@stylistic/generator-star-spacing': ['error', { after: true, before: false }],
    '@stylistic/indent': ['error', 2],
    '@stylistic/key-spacing': ['error', { afterColon: true, beforeColon: false, mode: 'strict' }],
    '@stylistic/keyword-spacing': ['error', { after: true, before: true }],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/member-delimiter-style': ['error', {
      multiline: { 'delimiter': 'none' },
      singleline: { 'delimiter': 'semi', 'requireLast': false }
    }],
    '@stylistic/no-mixed-spaces-and-tabs': 'error',
    '@stylistic/no-multi-spaces': ['error'],
    '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    '@stylistic/no-tabs': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/no-whitespace-before-property': 'error',
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/space-before-blocks': ['error', 'always'],
    '@stylistic/space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/type-annotation-spacing': 'error',
    '@stylistic/type-generic-spacing': 'error',
  },
}

const plugins = {
  importExport: {
    'simple-import-sort': simpleImportSortPlugin
  },
  stylistic: {
    '@stylistic': stylistic,
  }
}

export default [
  {
    ignores: [
      'public/',
    ]
  },

  // All JavaScript files.
  {
    files: ['eslint.config.js'],
    plugins: {
      ...plugins.importExport,
      ...plugins.stylistic
    },
    rules: {
      ...rules.stylistic
    }
  },

  // All TypeScript files.
  {
    files: ['**/*.ts'],
    languageOptions: { parser: typeScriptParser },
    plugins: {
      ...plugins.importExport,
      ...plugins.stylistic
    },
    rules: {
      ...rules.stylistic,
    },
  }
]
