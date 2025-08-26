import { Page, Locator, expect } from '@playwright/test';
import { step } from 'allure-js-commons';

export class BasePage {
  protected readonly uniqueElement: Locator;
  readonly name: string;

  constructor(
    protected page: Page,
    uniqueElement: Locator,
    name: string,
  ) {
    this.uniqueElement = uniqueElement; // used to verify that the page is loaded
    this.name = name; // page name for reporting
  }

  /**
   * Navigate to a page and wait for the unique element to be visible.
   * @param path - URL path to navigate to
   */
  async navigateToPage(path = '/') {
    await step(`Navigate to "${this.name}" page: ${path}`, async () => {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
      await this.expectPageToLoad();
    });
  }

  /**
   * Expect the page's unique element to be visible
   * @param timeout - defaults to 5000ms
   */
  async expectPageToLoad(timeout = 5000) {
    await step(`Verify "${this.name}" page is loaded`, async () => {
      await expect(this.uniqueElement).toBeVisible({ timeout });
    });
  }
}
