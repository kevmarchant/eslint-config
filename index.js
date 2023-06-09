module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['next/core-web-vitals', 'eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': ['error', 'never'],
    'quotes': ['error', 'single'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'consistent',
        jsxSingleQuote: false,
        arrowParens: 'avoid',
        printWidth: 140,
        trailingComma: 'none',
        bracketSpacing: true
      }
    ]
  },
  ignorePatterns: ['**/build/*.*']
};
