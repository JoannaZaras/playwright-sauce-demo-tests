import { test, expect } from '../fixtures/auth';
import InventoryPage from '../pages/InventoryPage';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ loggedInPage }) => {
    inventoryPage = new InventoryPage(loggedInPage);
});

test('verify inventory items are displayed after login', async ({ loggedInPage }) => {
    await expect(loggedInPage).toHaveURL(/inventory.html/);
    await expect(loggedInPage.getByText('Products')).toBeVisible();
    const itemsCount = await inventoryPage.getInventoryItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
    await expect(inventoryPage.productTitles.first()).toBeVisible();
});

test('verify adding and removing items from cart', async () => {
    const productName = 'Sauce Labs Backpack';
    await inventoryPage.addPoductToCartByName(productName);
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    await inventoryPage.removeProductFromCartByName(productName);
    await expect(inventoryPage.shoppingCartBadge).toBeHidden();
});

test('verify product titles', async () => {
    const productTitles = await inventoryPage.getProductTitles();
    expect(productTitles).toContain('Sauce Labs Backpack');
    expect(productTitles).toContain('Sauce Labs Bike Light');
    expect(productTitles).toContain('Sauce Labs Bolt T-Shirt');
}
);

test('verify getProductByName returns correct product', async () => {
    const productName = 'Sauce Labs Bike Light';
    const productLocator = await inventoryPage.getProductByName(productName);
    await expect(productLocator).toBeVisible();
    await expect(productLocator).toContainText(productName);
});
test('verify getProductCardByName returns correct product card', async () => {
    const productName = 'Sauce Labs Bolt T-Shirt';
    const productCardLocator = await inventoryPage.getProductCardByName(productName);
    await expect(productCardLocator).toBeVisible();
    await expect(productCardLocator).toContainText(productName);
});
