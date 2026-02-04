import { test as base, type Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import users from '../data/users';

export const test = base.extend<{
  loggedInPage: Page;
}>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(
      users.VALID_USER.username,
      users.VALID_USER.password
    );

    await use(page);
  },
});

export { expect } from '@playwright/test';
