import { test } from '@playwright/test';
import { allPages, expectBothRegisters } from './helpers';

test.describe('register parity', () => {
  for (const page of allPages) {
    test(`${page} has both register content divs`, async ({ page: p }) => {
      await p.goto(page);
      await expectBothRegisters(p);
    });
  }
});
