import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { users } from '../fixtures/users';
import messages from '../fixtures/messages.json';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Tests', () => {
  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.navigateToPage();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await productsPage.expectPageToLoad();
  });

  test('Invalid login shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToPage();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await loginPage.expectError(messages.login.invalidCredentials);
  });
});
