import { test, expect } from '../fixtures/inventory';


test('verify inventory items are displayed after login', async ({ inventoryPage }) => {
    await inventoryPage.assertInventoryPageOpened();
    await expect(inventoryPage.productTitles.first()).toBeVisible();
    const itemsCount = await inventoryPage.getInventoryItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
});

test('verify adding and removing items from cart', async ({ inventoryPage }) => {
    const productName = 'Sauce Labs Backpack';

    await inventoryPage.addProductToCartByName(productName);
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    expect(await inventoryPage.shoppingCartBadge.textContent()).toBe('1');

    await inventoryPage.removeProductFromCartByName(productName);
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
});

test('verify product titles', async ({ inventoryPage }) => {
    const productTitles = await inventoryPage.getProductTitles();
    expect(productTitles).toContain('Sauce Labs Backpack');
    expect(productTitles).toContain('Sauce Labs Bike Light');
    expect(productTitles).toContain('Sauce Labs Bolt T-Shirt');
});

test('verify getProductByName returns correct product', async ({ inventoryPage }) => {
    const productName = 'Sauce Labs Bike Light';
    const productLocator = await inventoryPage.getProductByName(productName);
    await expect(productLocator).toBeVisible();
    await expect(productLocator).toContainText(productName);
});

test('verify getProductCardByName returns correct product card', async ({ inventoryPage }) => {
    const productName = 'Sauce Labs Bolt T-Shirt';
    const productCardLocator = await inventoryPage.getProductCardByName(productName);
    await expect(productCardLocator).toBeVisible();
    await expect(productCardLocator).toContainText(productName);
});

test('verify opening cart navigates to cart page', async ({ inventoryPage }) => {
    const cartPage = await inventoryPage.openCart();
    await cartPage.assertCartPageOpened();
});