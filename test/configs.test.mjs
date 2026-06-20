import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';

const here = path.dirname(fileURLToPath(import.meta.url));
const fixturesRoot = path.join(here, 'fixtures');

const lintFixture = async (fixture, file) => {
  const eslint = new ESLint({ cwd: path.join(fixturesRoot, fixture) });
  const results = await eslint.lintFiles([file]);
  return results.flatMap((result) => result.messages.map((message) => message.ruleId));
};

test('base config flags explicit any', async () => {
  const ruleIds = await lintFixture('base', 'bad.ts');
  assert.ok(ruleIds.includes('@typescript-eslint/no-explicit-any'));
});

test('base config accepts clean source', async () => {
  const ruleIds = await lintFixture('base', 'good.ts');
  assert.deepEqual(ruleIds, []);
});

test('base config flags focused vitest tests', async () => {
  const ruleIds = await lintFixture('base', 'focused.test.ts');
  assert.ok(ruleIds.includes('vitest/no-focused-tests'));
});

test('react config flags conditional hook calls', async () => {
  const ruleIds = await lintFixture('react', 'bad.tsx');
  assert.ok(ruleIds.includes('react-hooks/rules-of-hooks'));
});

test('react config accepts a clean component', async () => {
  const ruleIds = await lintFixture('react', 'good.tsx');
  assert.deepEqual(ruleIds, []);
});

test('next config flags img element usage', async () => {
  const ruleIds = await lintFixture('next', 'bad.tsx');
  assert.ok(ruleIds.includes('@next/next/no-img-element'));
});

test('next config accepts a clean component', async () => {
  const ruleIds = await lintFixture('next', 'good.tsx');
  assert.deepEqual(ruleIds, []);
});
