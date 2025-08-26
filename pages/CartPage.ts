import { BasePage } from './BasePage';
import { expect, Page, Locator } from '@playwright/test';
import { step } from 'allure-js-commons';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page, page.locator('[data-test="title"]').filter({ hasText: 'Your Cart' }), 'Cart Page');
  }

  private cartItems = this.page.locator('[data-test="inventory-item"]');
  private checkoutButton = this.page.locator('[data-test="checkout"]');

  /**
   * Returns a cart item locator by product name
   */
  private getCartItem(itemName: string): Locator {
    return this.cartItems.filter({ hasText: itemName });
  }

  /**
   * Removes an item from the cart
   * @param itemName Optional: if not provided, removes the first item
   */
  async removeItem(itemName?: string) {
    await step(`Remove item from cart${itemName ? `: ${itemName}` : ' (first item)'}`, async () => {
      const item = itemName ? this.getCartItem(itemName) : this.cartItems.first();

      const removeButton = item.getByRole('button', { name: /Remove/i });
      await expect(removeButton).toBeVisible();
      await removeButton.click();
    });
  }

  async verifyCartIsEmpty() {
    await step('Verify the cart is empty', async () => {
      await expect(this.cartItems).toHaveCount(0);
    });
  }

  async clickCheckout() {
    await step('Click checkout button', async () => {
      await expect(this.checkoutButton).toBeVisible();
      await this.checkoutButton.click();
    });
  }
}
