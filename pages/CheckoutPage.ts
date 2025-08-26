import { BasePage } from './BasePage';
import { expect, Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import messages from '../fixtures/messages.json';

export interface Address {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage extends BasePage {
  private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  private readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  private readonly continueButton = this.page.locator('[data-test="continue"]');
  private readonly finishButton = this.page.locator('[data-test="finish"]');
  private readonly confirmationHeader = this.page.locator('.complete-header');

  constructor(page: Page) {
    super(page, page.locator('[data-test="firstName"]'), 'Checkout Page');
  }

  async fillCheckoutForm(address: Address) {
    await step('Fill checkout form', async () => {
      await this.firstNameInput.fill(address.firstName);
      await this.lastNameInput.fill(address.lastName);
      await this.postalCodeInput.fill(address.postalCode);
      await this.continueButton.click();
    });
  }

  async finishCheckout() {
    await step('Finish checkout', async () => {
      await this.finishButton.click();
    });
  }

  async verifyOrderComplete() {
    await step('Verify order completion', async () => {
      await expect(this.confirmationHeader).toHaveText(messages.checkout.orderComplete);
    });
  }
}
