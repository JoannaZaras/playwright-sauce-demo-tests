import { expect, type Locator, type Page } from '@playwright/test';

export default class CheckoutPage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly checkoutItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.checkoutItems = page.getByTestId('inventory-item');
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
  }

  // -------- Overview --------

  async assertOverviewItems(expectedProductNames: string[]) {
    await expect(this.checkoutItems).toHaveCount(expectedProductNames.length);

    for (const name of expectedProductNames) {
      await expect(this.checkoutItems).toContainText(name);
    }
  }

  // -------- Completion --------

  async clickFinish() {
    await this.finishButton.click();
  }

  async assertCheckoutComplete() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
    await expect(this.page.getByText('Checkout: Complete!')).toBeVisible();
    await expect(this.page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
  }
}
