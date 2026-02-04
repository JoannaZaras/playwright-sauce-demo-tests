import { type Locator, type Page } from '@playwright/test';

export default class LoginPage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }
    
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}