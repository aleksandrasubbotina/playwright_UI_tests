import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.navigateToPage();
    await productsPage.addItemToCart();
    await productsPage.clickCartIcon();
  });

  test('Remove item from cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.expectPageToLoad();

    await cartPage.removeItem();
    await cartPage.verifyCartIsEmpty();
  });
});
