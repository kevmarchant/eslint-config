# eslint-config-kevlar

Shareable ESLint 10 + Prettier flat config for TypeScript, React 19 and Next.js 16 projects.

Import it, compose it, done. The rules live in this package — there are no files to copy and no setup command to run. Upgrade by bumping the version.

## Install

Pick the line for your project type. ESLint, Prettier and TypeScript stay your project's own dependencies (they are peers); everything else comes with the package.

```bash
# TypeScript / Node library
npm install --save-dev eslint-config-kevlar eslint prettier typescript

# React or Next.js app (react / react-dom / next are your app's own deps)
npm install --save-dev eslint-config-kevlar eslint prettier typescript
```

pnpm and yarn work the same way (`pnpm add -D ...`, `yarn add -D ...`).

## Usage

Create `eslint.config.mjs` in your project root.

### TypeScript / Node

```js
import kevlar from 'eslint-config-kevlar';

export default kevlar;
```

### React

```js
import kevlar from 'eslint-config-kevlar';
import react from 'eslint-config-kevlar/react';

export default [...kevlar, ...react];
```

### Next.js

```js
import kevlar from 'eslint-config-kevlar';
import next from 'eslint-config-kevlar/next';

export default [...kevlar, ...next];
```

The `next` entry includes the React rules, so you do not need to add `./react` as well.

### Prettier

Add one key to your `package.json` — no `.prettierrc` file needed:

```json
{
  "prettier": "eslint-config-kevlar/prettier"
}
```

## Entry points

| Import                          | What it provides                                                        |
| ------------------------------- | ----------------------------------------------------------------------- |
| `eslint-config-kevlar`          | Base: TypeScript (recommended + strict), Vitest test rules, Prettier    |
| `eslint-config-kevlar/react`    | React rules (`@eslint-react`) + React 19 Hooks/Compiler rules           |
| `eslint-config-kevlar/next`     | Everything in `/react` plus Next.js core-web-vitals + Server Components |
| `eslint-config-kevlar/prettier` | The Prettier options, for the `package.json` `prettier` key             |

## Rules at a glance

- No `any` (`@typescript-eslint/no-explicit-any`), no non-null assertions
- Explicit function return types (expressions and typed expressions exempt)
- Unused variables must be prefixed with `_`
- Single quotes, semicolons required, no trailing commas, newline at end of file
- Prettier-enforced formatting, `printWidth` 180, 2-space indentation
- Vitest: no focused (`it.only`) or disabled (`it.skip`) tests in committed code
- React 19: rules of hooks, exhaustive deps and the React Compiler rule set
- Next.js: Core Web Vitals rules and React Server Components checks

## Extending and overriding

Append your own flat-config objects after the spread:

```js
import kevlar from 'eslint-config-kevlar';

export default [
  ...kevlar,
  {
    rules: {
      'no-console': 'error'
    }
  }
];
```

## Compatibility

| Tool       | Supported range       |
| ---------- | --------------------- |
| eslint     | `^9.0.0 \|\| ^10.0.0` |
| prettier   | `^3.0.0`              |
| typescript | `>=5.9.0 <6.1.0`      |

## Migrating from v2

- Stop running `npx eslint-config-kevlar` — there is no setup/scaffold command anymore.
- Replace your generated `eslint.config.mjs` with the three-line stub above for your project type.
- Move Prettier to the `package.json` key shown above. An existing `.prettierrc` still works if you prefer to keep one; the package key is just the no-file option.
- The React layer now uses `@eslint-react` (the previous `eslint-plugin-react` does not install on ESLint 10). Rule names under React change accordingly; the previous `react/prop-types` and `react/react-in-jsx-scope` toggles are no longer needed.

## License

ISC
