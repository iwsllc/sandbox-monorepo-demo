import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import promisePlugin from 'eslint-plugin-promise'
import reactPlugin from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'

/**
 * Packages within the monorepo (that can be imported)
 */
const monoRepoPackages = [
  '@potatoes/lib-main',
  '@potatoes/lib-ui'
]

/**
 * These project paths are node specific projects and require the package
 * names above to be included in the n/no-extraneous-import rule.
 */
const monoRepoNodeProjects = [
  'apps/app',
  'packages/lib-main'
]

/**
 * And here's the actual configuration.
 */
export default [
  ...tseslint.config(

    // global ignores have a single prop `ignores`
    {
      ignores: ['**/node_modules/*', '**/dist/'] // global ignore with single ignore key
    },

    // applies to all files: Core ES Rules
    eslint.configs.recommended,

    // applies to all files: Core TS Rules
    ...tseslint.configs.recommended,

    /**
     * Stylistic rules factory. This generates styling rules with a few options.
     * For details, see: https://eslint.style/guide/config-presets#configuration-factory
     * For options, see: https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
     **/
    stylistic.configs.customize({
      braceStyle: '1tbs',
      commaDangle: 'never',
      indent: 2, // for tabs, use "tab"
      jsx: true,
      quotes: 'single',
      semi: false
    }),
    /**
     * Applies to all files: Additional plugins like: promise, stylistic, and react
     */
    {
      plugins: {
        promise: promisePlugin,
        react: reactPlugin
      },
      languageOptions: {
        ecmaVersion: 2023, // Targeted ES

        /**
        * Global variables to consider; we're just including all browser, node,
        * and es2023 ones. (like window, document, process, etc)
        */
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2023
        }
      },

      /**
      * Rules configuration; we start with the recommended and then follow with overrides.
      */
      rules: {
        ...promisePlugin.configs.recommended.rules,
        ...reactPlugin.configs.recommended.rules,
        ...reactPlugin.configs['jsx-runtime'].rules,

        // Overrides and additions
        'promise/always-return': ['error', { ignoreLastCallback: true }],

        // enable underscore ignore pattern for unused vars
        '@typescript-eslint/no-unused-vars': ['error', {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }]
      },

      settings: {
        react: {
          version: 'detect' // You can add this if you get a warning about the React version when you lint
        }
      }
    },

    // applies to only Node project files referenced above.
    {
      // Node rules
      files: monoRepoNodeProjects.map(path => `${path}/**/*`),

      plugins: {
        n: nodePlugin
      },

      rules: {
        ...nodePlugin.configs['flat/recommended'].rules,

        'n/no-extraneous-import': ['error', {
          allowModules: [...monoRepoPackages]
        }]
      }
    }
  )
]
