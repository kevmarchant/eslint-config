# eslint-config-kevlar

Modern ESLint and Prettier configuration for TypeScript, React, and Next.js projects using ESLint's flat config format.

## Quick Setup (Recommended)

Run this command in your project root:

```bash
npx eslint-config-kevlar
```

or with pnpm:

```bash
pnpm dlx eslint-config-kevlar
```

or with yarn:

```bash
yarn dlx eslint-config-kevlar
```

This will:

1. Install required dependencies (eslint, prettier, typescript) if missing
2. Create `eslint.config.mjs` with ESLint configuration
3. Create `.prettierrc` with Prettier configuration

That's it! Your project is now configured.

## Alternative: Install as Dependency

If you prefer to keep the config as a dependency:

```bash
npm install --save-dev eslint-config-kevlar
# or
yarn add -D eslint-config-kevlar
# or
pnpm add -D eslint-config-kevlar
```

Then run the setup:

```bash
npx eslint-config-kevlar
# or
yarn eslint-config-kevlar
# or
pnpm eslint-config-kevlar
```

## Manual Configuration

If you need to customize the configuration:

### ESLint Configuration

Create an `eslint.config.mjs` file in your project root:

```javascript
import kevlarConfig from 'eslint-config-kevlar';

export default kevlarConfig;
```

To customize rules:

```javascript
import kevlarConfig from 'eslint-config-kevlar';

export default [
  ...kevlarConfig,
  {
    rules: {
      // Your custom rules here
    }
  }
];
```

### Prettier Configuration

The `.prettierrc` file is automatically created during setup. If you need to recreate it manually:

```json
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 180,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf",
  "arrowParens": "always",
  "bracketSpacing": true,
  "proseWrap": "never",
  "bracketSameLine": true,
  "singleAttributePerLine": false
}
```

## Features

- **ESLint 9+ flat config format**
- **TypeScript strict mode** with no `any` types allowed
- **React and Next.js support**
- **Prettier integration** for consistent formatting
- **Vitest support** for test files
- **Automatic dependency installation**
- **Zero configuration needed**

## Rules Highlights

- No `any` types (`@typescript-eslint/no-explicit-any`: error)
- Semicolons required
- Single quotes preferred
- No trailing commas
- 180 character line width (Prettier)
- 2 space indentation
- Unused variables must be prefixed with underscore

## License

ISC
