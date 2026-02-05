import { test, expect } from '../fixtures/cart';

test('verify adding item to cart reflects in cart page', async ({ cartWithOneItem }) => {
    const cartItemsCount = await cartWithOneItem.getCartItemsCount();
    expect(cartItemsCount).toBe(1);
});

test('verify removing item from cart', async ({ cartWithOneItem }) => {
    expect(await cartWithOneItem.getFirstCartItem()).toBeVisible();
    await cartWithOneItem.removeFirstCartItem();
    await expect(cartWithOneItem.shoppingCartBadge).toBeHidden();
}
);