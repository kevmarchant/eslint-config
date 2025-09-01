import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import vitestPlugin from 'eslint-plugin-vitest';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/pnpm-lock.yaml',
      '**/.pnpm/**',
      '**/.next/**'
    ]
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2022
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettierPlugin,
      react: reactPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...typescript.configs.strict.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'eol-last': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'no-trailing-spaces': 'error',
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off'
    }
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    plugins: {
      vitest: vitestPlugin
    },
    rules: {
      'vitest/no-disabled-tests': 'error',
      'vitest/no-focused-tests': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'prettier/prettier': 'error'
    }
  }
];