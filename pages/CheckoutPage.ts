import { type Locator, type Page } from '@playwright/test';

export default class CheckoutPage {


    readonly page: Page;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        const firstNameInput = this.page.getByPlaceholder('First Name');
        const lastNameInput = this.page.getByPlaceholder('Last Name');
        const postalCodeInput = this.page.getByPlaceholder('Zip/Postal Code');     
        await firstNameInput.fill(firstName);
        await lastNameInput.fill(lastName);
        await postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }   
    
    async getItems(): Promise<Locator> {
     return this.page.getByTestId('inventory-item');
    }

}