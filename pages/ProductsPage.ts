import { Page, expect, Locator } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page, page.locator('[data-test="inventory-list"]'), 'Products Page');
  }

  private cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  private inventoryItems = this.page.locator('[data-test="inventory-item"]');
  private itemNameLocator = '.inventory_item_name';
  private cartIcon = this.page.locator('[data-test="shopping-cart-link"]');

  async navigateToPage() {
    await step('Navigate to Product Page', async () => {
      await this.page.goto('/inventory.html');
      await this.expectPageToLoad();
    });
  }

  async getFirstProductName(): Promise<string> {
    return await step('Get first product name', async () => {
      const firstItem = this.inventoryItems.first();
      const nameLocator = firstItem.locator(this.itemNameLocator);
      await expect(nameLocator).toBeVisible();
      return await nameLocator.innerText();
    });
  }

  /**
   * Returns item card by product name
   */
  private getProductItem(name: string): Locator {
    return this.inventoryItems.filter({ hasText: name });
  }

  /**
   * Adds product to cart
   * @param itemName Optional: if not provided, adds the first product
   */
  async addItemToCart(itemName?: string) {
    await step(`Add item to cart${itemName ? `: ${itemName}` : ''}`, async () => {
      const nameToAdd = itemName ?? (await this.getFirstProductName());
      const button = this.getProductItem(nameToAdd).getByRole('button');
      await expect(button).toBeVisible();
      await button.click();
    });
  }

  async clickCartIcon() {
    await step('Click cart icon', async () => {
      await this.cartIcon.click();
    });
  }

  // Assertions

  async verifyProductsVisible() {
    await step('Verify products are visible', async () => {
      const count = await this.inventoryItems.count();
      expect(count).toBeGreaterThan(0);

      const firstItemName = this.inventoryItems.first().locator(this.itemNameLocator);
      await expect(firstItemName).toBeVisible();
    });
  }

  async verifyCartCount(count: number) {
    await step(`Verify cart count is ${count}`, async () => {
      await expect(this.cartBadge).toHaveText(String(count));
    });
  }
}
