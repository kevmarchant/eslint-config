import react from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  react.configs['recommended-typescript'],
  reactHooks.configs.flat['recommended-latest']
];
