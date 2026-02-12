import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import users from '../data/users';

let loginPage: LoginPage;
const VALID_USER = users.VALID_USER;
const INVALID_USER = users.INVALID_USER;
const LOCKED_OUT_USER = users.LOCKED_OUT_USER;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loginPage.navigate();

});

test('verify user can login with valid credentials', async () => {
    await loginPage.login(VALID_USER.username, VALID_USER.password);
    await expect(loginPage.page).toHaveURL(/inventory.html/);
    await expect(loginPage.page.getByText('Products')).toBeVisible();
});

test('should show error for invalid password', async () => {
    await loginPage.login(INVALID_USER.username, INVALID_USER.password);
    await loginPage.assertErrorMessage('Username and password do not match any user');
});

test('should show error when username is empty', async () => {
    await loginPage.login('', VALID_USER.password);
    await loginPage.assertErrorMessage('Username is required');
});

test('should show error when password is empty', async () => {
    await loginPage.login(VALID_USER.username, '');
    await loginPage.assertErrorMessage('Password is required');
});

test('should show error for locked user', async () => {
    await loginPage.login(LOCKED_OUT_USER.username, LOCKED_OUT_USER.password);
    await loginPage.assertErrorMessage('Sorry, this user has been locked out.');
});
