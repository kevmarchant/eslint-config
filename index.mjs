import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import vitest from '@vitest/eslint-plugin';
import globals from 'globals';

const styleRules = {
  semi: ['error', 'always'],
  'comma-dangle': ['error', 'never'],
  'eol-last': ['error', 'always'],
  quotes: ['error', 'single', { avoidEscape: true }],
  'no-trailing-spaces': 'error',
  'prettier/prettier': 'error'
};

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/coverage/**', '**/*.d.ts', '**/pnpm-lock.yaml', '**/.pnpm/**', '**/.next/**']
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    extends: [js.configs.recommended, tseslint.configs.recommended, tseslint.configs.strict, prettierConfig],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.node,
        ...globals.es2025
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...styleRules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true, allowTypedFunctionExpressions: true }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off'
    }
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    plugins: { vitest },
    rules: {
      'vitest/no-disabled-tests': 'error',
      'vitest/no-focused-tests': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: styleRules
  }
);
