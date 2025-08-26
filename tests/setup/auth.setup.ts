import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../fixtures/users';
import fs from 'fs';
import path from 'path';
import { ProductsPage } from '../../pages/ProductsPage';

test('Setup login session', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.navigateToPage();
  await loginPage.login(users.validUser.username, users.validUser.password);
  await productsPage.expectPageToLoad();

  const storagePath = path.resolve(__dirname, '../storage/loggedInState.json');
  fs.mkdirSync(path.dirname(storagePath), { recursive: true });

  await page.context().storageState({ path: storagePath });
  console.log('Logged-in storage state saved at:', storagePath);
});
