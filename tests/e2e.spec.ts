import { test, expect } from '../fixtures/auth';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

test('happy path E2E', async ({ loggedInPage }) => {
  const product1 = 'Sauce Labs Fleece Jacket';
  const product2 = 'Sauce Labs Bolt T-Shirt';

  // --- Inventory ---
  const inventoryPage = new InventoryPage(loggedInPage);

  // Assert inventory loaded
  await expect(loggedInPage).toHaveURL(/inventory.html/);
  await expect(loggedInPage.getByText('Products')).toBeVisible();

  const titles = await inventoryPage.getProductTitles();
  expect(titles).toContain(product1);
  expect(titles).toContain(product2);

  // Add items to cart
  await inventoryPage.addProductToCartByName(product1);
  await inventoryPage.addProductToCartByName(product2);
  await expect(inventoryPage.shoppingCartBadge).toHaveText('2');

  // --- Cart ---
  await inventoryPage.openCart();
  const cartPage = new CartPage(loggedInPage); // instantiate directly in test
  await cartPage.assertCartPageOpened();

  expect(await cartPage.getCartItemsCount()).toBe(2);
  await cartPage.assertCartContainsProducts([product1, product2]);

  await cartPage.removeProductFromCartByName(product2);
  expect(await cartPage.getCartItemsCount()).toBe(1);
  await cartPage.assertCartContainsProducts([product1]);

  // --- Checkout ---
  const checkoutPage = new CheckoutPage(loggedInPage); // instantiate in test, no fixture
  await checkoutPage.navigate();
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.continueToOverview();

  await checkoutPage.assertOverviewItems([product1]);

  await checkoutPage.clickFinish();
  await checkoutPage.assertCheckoutComplete();
});
