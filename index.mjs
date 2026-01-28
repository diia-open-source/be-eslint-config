import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import prettierConfig from 'eslint-plugin-prettier/recommended'
import prettier from 'eslint-plugin-prettier'
import unicorn from 'eslint-plugin-unicorn'
import promise from 'eslint-plugin-promise'
import * as regex from 'eslint-plugin-regexp'
import security from 'eslint-plugin-security'
import n from 'eslint-plugin-n'
import vitest from '@vitest/eslint-plugin'
import diia from '@diia-inhouse/eslint-plugin'
import pluginImport from 'eslint-plugin-import'
import jsoncParser from 'jsonc-eslint-parser'
import boundaries from 'eslint-plugin-boundaries'

const serviceBoundariesParams = {
    settings: {
        elements: [
            {
                type: 'actionsTypes',
                pattern: 'src/actions/**/*.types.ts',
                mode: 'file',
                capture: ['version', 'actionName'],
            },
            {
                type: 'actions',
                pattern: 'src/actions/**/*.ts',
                mode: 'file',
                capture: ['version', 'actionName'],
            },
            {
                type: 'viewsTypes',
                pattern: 'src/views/*types.ts',
                mode: 'file',
            },
            {
                type: 'views',
                pattern: 'src/views/**',
            },
            {
                type: 'providersTypes',
                pattern: 'src/providers/**/*types.ts',
                mode: 'file',
                capture: ['providerName'],
            },
            {
                type: 'providers',
                pattern: 'src/providers/**',
                capture: ['providerName'],
            },
            {
                type: 'repositories',
                pattern: 'src/repositories/**',
            },
            {
                type: 'modelsTypes',
                pattern: 'src/models/*.types.ts',
                mode: 'file',
                capture: ['modelName'],
            },
            {
                type: 'models',
                pattern: 'src/models/*.ts',
                mode: 'file',
                capture: ['modelName'],
            },
            {
                type: 'servicesTypes',
                pattern: 'src/services/**/*types.ts',
                mode: 'file',
            },
            {
                type: 'services',
                pattern: 'src/services/**',
            },
            {
                type: 'configsTypes',
                pattern: 'src/configs/*types.ts',
                mode: 'file',
            },
            {
                type: 'configs',
                pattern: 'src/configs/**',
            },
            {
                type: 'locales',
                pattern: 'src/locales/**',
            },
            {
                type: 'depsTypes',
                pattern: 'src/deps/*types.ts',
                mode: 'file',
            },
            {
                type: 'deps',
                pattern: 'src/deps/**',
                mode: 'file',
            },
            {
                type: 'srcRoot',
                pattern: 'src/*',
                mode: 'file',
            },
            {
                type: 'tests',
                pattern: 'tests/**',
            },
            {
                type: 'configFiles',
                pattern: '*.{json,md,mjs,mts}',
                mode: 'full',
            },
            {
                type: 'generated',
                pattern: 'src/generated/**',
            },
        ],
    },
    rules: {
        elementTypes: {
            default: 'disallow',
            rules: [
                { from: ['actions'], allow: ['services', 'views', 'generated', ['actionsTypes', { actionName: '${from.actionName}' }]] },
                { from: ['actionsTypes'], allow: ['generated'] },
                {
                    from: ['services'],
                    allow: ['services', 'servicesTypes', 'providers', 'providersTypes', 'repositories', 'modelsTypes', 'configsTypes'],
                },
                { from: ['providers'], allow: ['configsTypes', ['providersTypes', { providerName: '${from.providerName}' }]] },
                { from: ['views'], allow: ['viewsTypes', 'servicesTypes', 'modelsTypes', 'generated'] },
                { from: ['viewsTypes'], allow: ['locales'] },
                { from: ['repositories'], allow: ['models', 'configsTypes', 'modelsTypes'] },
                { from: ['models'], allow: [['modelsTypes', { modelName: '${from.modelName}' }]] },
                { from: ['tests'], allow: ['*'] },
                { from: ['servicesTypes'], allow: ['servicesTypes', 'modelsTypes'] },
                { from: ['srcRoot'], allow: ['srcRoot', 'depsTypes', 'configsTypes', 'deps', 'configs'] },
                { from: ['deps'], allow: ['depsTypes', 'configsTypes', 'models', 'viewsTypes', 'providers', 'services'] },
                { from: ['depsTypes'], allow: ['configsTypes', 'viewsTypes', 'providers'] },
                { from: ['configs'], allow: ['configsTypes'] },
                { from: ['configsTypes'], allow: ['configs'] },
            ],
        },
    },
}

/** @type {import('typescript-eslint').Config} */
export const serviceBoundariesConfig = [
    {
        plugins: {
            boundaries,
        },
        settings: {
            'boundaries/elements': serviceBoundariesParams.settings.elements,
        },
    },
    {
        rules: {
            ...boundaries.configs.strict.rules,
            'boundaries/element-types': ['error', serviceBoundariesParams.rules.elementTypes],
        },
    },
]

/** @type {import('typescript-eslint').Config} */
export default tseslint.config(
    {
        ignores: ['dist', 'node_modules', 'src/generated', 'coverage', 'migrations/sample-migration.ts'],
    },
    {
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json', './migrations/tsconfig.json', './tests/tsconfig.json'],
                ecmaVersion: 2022,
                sourceType: `module`,
            },
        },
        plugins: {
            prettier,
            n,
            '@typescript-eslint': tseslint.plugin,
            '@stylistic/js': stylistic,
            '@diia-inhouse': diia,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
    },
    js.configs.recommended,
    unicorn.configs['flat/all'],
    regex.configs['flat/recommended'],
    promise.configs['flat/recommended'],
    security.configs.recommended,
    pluginImport.flatConfigs.recommended,
    prettierConfig,
    ...tseslint.configs.recommended,
    {
        rules: {
            'prettier/prettier': 'error',

            'linebreak-style': ['error', 'unix'],
            'no-duplicate-imports': 'error',
            'no-redeclare': 'error',
            'no-implicit-coercion': 'error',
            'newline-before-return': ['error'],
            'no-cond-assign': ['error', 'always'],
            'no-console': 'error',
            'no-underscore-dangle': ['error', { allow: ['_id'] }],
            curly: ['error', 'all'],
            eqeqeq: ['error', 'always'],
            'spaced-comment': ['error', 'always'],
            'no-return-await': 'off',
            'class-methods-use-this': 'off',
            'lines-between-class-members': 'off',
            'consistent-return': ['off'],
            'object-curly-newline': ['off'],
            'sort-imports': 'off',

            'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],
            'n/no-missing-import': 'off',

            'import/newline-after-import': ['error'],
            'import/no-extraneous-dependencies': [
                'error',
                { devDependencies: ['**/tests/**', '**/vitest.*.{js,cjs,mjs,ts,cts,mts}', '**/migrations/**'] },
            ],
            'import/prefer-default-export': 'off',
            'import/no-unresolved': 'off',
            'import/named': 'off',
            'import/order': 'off',

            '@stylistic/js/comma-dangle': `off`,
            '@stylistic/js/space-before-blocks': `error`,
            '@stylistic/js/space-infix-ops': `error`,
            '@stylistic/js/eol-last': [`error`, `always`],
            '@stylistic/js/padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'return',
                },
                {
                    blankLine: 'always',
                    prev: ['const', 'let'],
                    next: '*',
                },
                {
                    blankLine: 'any',
                    prev: ['const', 'let'],
                    next: 'block-like',
                },
                {
                    blankLine: 'any',
                    prev: ['const', 'let'],
                    next: ['const', 'let'],
                },
                {
                    blankLine: 'always',
                    prev: 'block-like',
                    next: '*',
                },
                {
                    blankLine: 'never',
                    prev: 'case',
                    next: '*',
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'export',
                },
            ],

            '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as' }],
            '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': ['error'],
            '@typescript-eslint/return-await': ['error', 'always'],
            '@typescript-eslint/array-type': ['error'],
            '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
            '@typescript-eslint/no-inferrable-types': 'error',
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/typedef': 'off',

            '@diia-inhouse/logger-err-field': 'error',

            'unicorn/consistent-destructuring': 'error',
            'unicorn/custom-error-definition': 'error',
            'unicorn/no-nested-ternary': 'error',
            'unicorn/filename-case': ['error', { case: 'camelCase', ignore: ['^\\d+.*\\.ts$'] }],
            'unicorn/numeric-separators-style': ['error', { number: { onlyIfContainsSeparator: true } }],
            'unicorn/catch-error-name': ['error', { name: 'err' }],
            'unicorn/no-keyword-prefix': 'off',
            'unicorn/no-null': 'off',
            'regexp/no-obscure-range': 'off',
            'unicorn/no-anonymous-default-export': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/prefer-top-level-await': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-array-method-this-argument': 'off',
            'unicorn/no-array-callback-reference': 'off',
            'unicorn/prefer-spread': 'off',
            'unicorn/prefer-json-parse-buffer': 'off',
            'unicorn/require-post-message-target-origin': 'off',
            'unicorn/no-array-sort': 'off',

            'security/detect-object-injection': 'off',
            'security/detect-non-literal-fs-filename': 'error',
            'security/detect-non-literal-regexp': 'error',

            'no-restricted-syntax': [
                'warn',
                {
                    selector:
                        "ClassDeclaration:has(TSClassImplements[expression.name='TaskListener']) PropertyDefinition[key.name='isDelayed']",

                    message:
                        "'isDelayed' property is deprecated in TaskListener. The RabbitMQ plugin that supports delayed messages is deprecated and should be removed in the future",
                },
            ],
        },
    },
    {
        files: ['tests/**'],
        plugins: {
            vitest,
        },
        rules: {
            ...vitest.configs.recommended.rules,
            'vitest/no-conditional-in-test': 'error',
            'vitest/no-duplicate-hooks': 'error',
            'vitest/prefer-hooks-in-order': 'error',
            'vitest/prefer-hooks-on-top': 'error',
            'vitest/require-to-throw-message': 'error',
            'vitest/require-top-level-describe': 'error',
        },
    },
    {
        files: ['src/index.ts'],
        rules: {
            'prettier/prettier': 'off',
            'import/order': [
                'error',
                {
                    pathGroups: [
                        {
                            pattern: '@diia-inhouse/diia-app',
                            group: 'external',
                            position: 'after',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['package.json'],
        languageOptions: {
            parser: jsoncParser,
        },
        plugins: {
            '@diia-inhouse': diia,
        },
        rules: {
            '@typescript-eslint/return-await': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@diia-inhouse/no-service-word-in-package-json-name-field': 'error',
        },
    },
)
