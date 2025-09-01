#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const eslintConfigContent = `import js from '@eslint/js';
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
`;

const prettierConfigContent = {
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 180,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  arrowParens: 'always',
  bracketSpacing: true,
  proseWrap: 'never',
  bracketSameLine: true,
  singleAttributePerLine: false
};

function checkAndInstallDependencies(targetRoot) {
  const requiredDeps = {
    'eslint': '^9.34.0',
    'prettier': '^3.6.2',
    'typescript': '^5.9.2',
    '@eslint/js': '^9.34.0',
    '@typescript-eslint/eslint-plugin': '^8.41.0',
    '@typescript-eslint/parser': '^8.41.0',
    'eslint-config-prettier': '^10.1.8',
    'eslint-plugin-prettier': '^5.5.4',
    'eslint-plugin-react': '^7.37.5',
    'eslint-plugin-vitest': '^0.5.4',
    'globals': '^16.3.0'
  };
  
  const packageJsonPath = path.join(targetRoot, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('⚠️  No package.json found. Skipping dependency check.');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const allDeps = {
    ...packageJson.dependencies || {},
    ...packageJson.devDependencies || {}
  };
  
  const missingDeps = [];
  
  for (const [dep, version] of Object.entries(requiredDeps)) {
    if (!allDeps[dep]) {
      missingDeps.push(`${dep}@${version}`);
    }
  }
  
  if (missingDeps.length > 0) {
    console.log('📦 Installing missing peer dependencies:', missingDeps.join(', '));
    
    // Detect package manager from lock files
    let packageManager = 'npm';
    if (fs.existsSync(path.join(targetRoot, 'pnpm-lock.yaml'))) {
      packageManager = 'pnpm';
    } else if (fs.existsSync(path.join(targetRoot, 'yarn.lock'))) {
      packageManager = 'yarn';
    } else if (fs.existsSync(path.join(targetRoot, 'package-lock.json'))) {
      packageManager = 'npm';
    }
    
    let installCmd;
    
    if (packageManager === 'yarn') {
      installCmd = `yarn add -D ${missingDeps.map(dep => `"${dep}"`).join(' ')}`;
    } else if (packageManager === 'pnpm') {
      installCmd = `pnpm add -D ${missingDeps.map(dep => `"${dep}"`).join(' ')}`;
    } else {
      installCmd = `npm install --save-dev ${missingDeps.map(dep => `"${dep}"`).join(' ')}`;
    }
    
    try {
      execSync(installCmd, { 
        cwd: targetRoot, 
        stdio: 'inherit'
      });
      console.log('✅ Dependencies installed successfully!');
    } catch (error) {
      console.log('⚠️  Failed to install dependencies automatically.');
      console.log('Please run manually:', installCmd);
    }
  }
}

function setup() {
  const targetRoot = process.cwd();
  
  console.log('🚀 Setting up ESLint and Prettier configuration...\n');
  
  checkAndInstallDependencies(targetRoot);

  const eslintConfigPath = path.join(targetRoot, 'eslint.config.mjs');
  const prettierConfigPath = path.join(targetRoot, '.prettierrc');

  let created = [];
  let skipped = [];

  if (!fs.existsSync(eslintConfigPath)) {
    fs.writeFileSync(eslintConfigPath, eslintConfigContent);
    created.push('eslint.config.mjs');
  } else {
    skipped.push('eslint.config.mjs (already exists)');
  }

  if (!fs.existsSync(prettierConfigPath)) {
    fs.writeFileSync(prettierConfigPath, JSON.stringify(prettierConfigContent, null, 2) + '\n');
    created.push('.prettierrc');
  } else {
    skipped.push('.prettierrc (already exists)');
  }

  if (created.length > 0) {
    console.log('✅ Created config files:');
    created.forEach(file => console.log(`   - ${file}`));
  }
  
  if (skipped.length > 0) {
    console.log('ℹ️  Skipped files:');
    skipped.forEach(file => console.log(`   - ${file}`));
  }

  if (created.length === 0 && skipped.length > 0) {
    console.log('\n✨ All config files already exist!');
  } else if (created.length > 0) {
    console.log('\n✨ Setup complete! Your ESLint and Prettier configs are ready.');
  }
}

setup();