import next from '@next/eslint-plugin-next';
import react from '@eslint-react/eslint-plugin';
import reactConfig from './react.mjs';

export default [
  ...reactConfig,
  next.configs['core-web-vitals'],
  react.configs.rsc,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off'
    }
  }
];
