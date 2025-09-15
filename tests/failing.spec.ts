import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Demo failing test @demo-fail', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToPage();
  await loginPage.expectNonExistingElementToBeVisible();
});
