import { test as base } from '../fixtures/auth';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
export const test = base.extend<{
    cartWithOneItem: CartPage;
}>(
    {
        cartWithOneItem: async ({ loggedInPage }, use) => {
            const inventoryPage = new InventoryPage(loggedInPage);
            const cartPage = new CartPage(loggedInPage);
            await inventoryPage.addFirstItemToCart();
            await inventoryPage.openCart();
            await use(cartPage);
        }
    }
);

export { expect } from '../fixtures/auth';