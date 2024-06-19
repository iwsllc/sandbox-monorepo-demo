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
  '@potatoes/lib-ui',
]

/**
 * These project paths are node specific projects and require the package
 * names above to be included in the n/no-extraneous-import rule.
 */
const monoRepoNodeProjects = [
  'apps/app',
  'packages/lib-main',
]

export default [
  ...tseslint.config(

    // global ignores have a single prop `ignores`
    {
      ignores: ['**/node_modules/*', '**/dist/'], // global ignore with single ignore key
    },

    // applies to all files: Core ES Rules
    eslint.configs.recommended,

    // applies to all files: Core TS Rules
    ...tseslint.configs.recommended,

    /**
     * Applies to all files: Additional plugins like: promise, stylistic, and react
     */
    {
      plugins: {
        'promise': promisePlugin,
        '@stylistic': stylistic,
        'react': reactPlugin,
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
          ...globals.es2023,
        },
      },

      /**
      * Rules configuration; we start with the recommended and then follow with overrides.
      */
      rules: {
        ...promisePlugin.configs.recommended.rules,
        ...stylistic.configs['recommended-flat'].rules,
        ...reactPlugin.configs.recommended.rules,
        ...reactPlugin.configs['jsx-runtime'].rules,

        // Overrides and additions

        '@typescript-eslint/no-unused-vars': ['error', {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        }],

        // uncomment for tabs instead of spaces
        // '@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
        // '@stylistic/indent': ['error', 'tab'],
        // '@stylistic/jsx-indent': ['error', 'tab'],
        // '@stylistic/jsx-indent-props': ['error', 'tab'],
      },

      settings: {
        react: {
          version: 'detect', // You can add this if you get a warning about the React version when you lint
        },
      },
    },

    // applies to only Node project files referenced above.
    {
      // Node rules
      files: monoRepoNodeProjects.map(path => `${path}/**/*`),
      // files: [],

      plugins: {
        n: nodePlugin,
      },

      rules: {
        ...nodePlugin.configs['flat/recommended'].rules,

        'n/no-extraneous-import': ['error', {
          allowModules: [...monoRepoPackages],
        }],
      },
    },
  ),
]
