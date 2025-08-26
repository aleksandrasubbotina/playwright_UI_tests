import { test } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage, Address } from '../pages/CheckoutPage';
import { generateRandomAddress } from '../utils/dataGenerator';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.navigateToPage();
    await productsPage.addItemToCart();
  });

  test('Complete checkout successfully', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await productsPage.clickCartIcon();
    await cartPage.expectPageToLoad();

    await cartPage.clickCheckout();
    await checkoutPage.expectPageToLoad();

    const address: Address = generateRandomAddress();

    await checkoutPage.fillCheckoutForm(address);
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderComplete();
  });
});
