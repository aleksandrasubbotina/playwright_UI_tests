import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Products Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.navigateToPage();
  });

  test('Verify products are displayed', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.verifyProductsVisible();
  });

  test('Add item to cart and verify cart count', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartCount = await productsPage.getCartCount();
    await productsPage.addItemToCart();
    await productsPage.verifyCartCount(cartCount + 1);
  });
});
