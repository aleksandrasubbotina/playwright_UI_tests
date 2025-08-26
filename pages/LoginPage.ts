import { expect, Page } from '@playwright/test';
import { step } from 'allure-js-commons';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });
  readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage = this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page, page.locator('[id="login_button_container"]'), 'Login');
  }

  async login(username: string, password: string) {
    await step(`Login`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }

  async expectError(expectedMessage: string) {
    await step(`Verify error message: ${expectedMessage}`, async () => {
      await this.errorMessage.waitFor({ state: 'visible' });
      await expect(this.errorMessage).toContainText(expectedMessage);
    });
  }
}
