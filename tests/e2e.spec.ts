import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import users from '../data/users';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutPage = new CheckoutPage(page);
});

test('verify e2e happy path', async ({ page }) => {
  const productName1 = 'Sauce Labs Fleece Jacket';
  const productName2 = 'Sauce Labs Bolt T-Shirt';
  await loginPage.login(users.VALID_USER.username, users.VALID_USER.password);

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();
  expect(await inventoryPage.getInventoryItemsCount()).toBeGreaterThan(0);
  await expect(inventoryPage.productTitles.first()).toBeVisible();

  expect(await inventoryPage.productTitles.allTextContents()).toContain(productName1);
  expect(await inventoryPage.productTitles.allTextContents()).toContain(productName2);

  inventoryPage.addPoductToCartByName(productName1);
  inventoryPage.addPoductToCartByName(productName2);
  
  await expect(cartPage.shoppingCartBadge).toBeVisible();
  expect(cartPage.shoppingCartBadge).toHaveText

  await cartPage.goToCart();
  await expect(page).toHaveURL(/cart.html/);
  await expect(page.getByText('Your Cart')).toBeVisible();

  const cartItems = cartPage.getItems();
  expect(await cartItems).toHaveCount(2);
  expect(await cartItems).toContainText([productName1, productName2]);
  cartPage.removeProductFromCartByName(productName2)
  expect(await cartItems).toHaveCount(1);
  expect(await cartItems).toContainText([productName1]);
  await expect(cartPage.shoppingCartBadge).toHaveText('1');

  await checkoutPage.navigate();
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();

  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.clickContinue();

  await expect(page).toHaveURL(/checkout-step-two.html/);
  await expect(page.getByText('Checkout: Overview')).toBeVisible();

  const overviewItems = checkoutPage.getItems();
  expect(await overviewItems).toHaveCount(1);
  expect(await overviewItems).toContainText([productName1]);

  await checkoutPage.clickFinish();
  await expect(page).toHaveURL(/checkout-complete.html/);
  await expect(page.getByText('Checkout: Complete!')).toBeVisible();
  await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();

});


