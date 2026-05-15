import { expect, type Locator, type Page } from '@playwright/test';
import CheckoutPage from './CheckoutPage';

export default class CartPage {

    readonly page: Page;
    readonly shoppingCartBadge: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async navigate() {
        await this.page.goto('/cart.html');
    }
    async clickCheckout(): Promise<CheckoutPage> {
  await this.checkoutButton.click();
  return new CheckoutPage(this.page);
} 

    async assertCartPageOpened() {
        await expect(this.page).toHaveURL(/cart.html/);
        await expect(this.page.getByText('Your Cart')).toBeVisible();
    }

    getCartItems(): Locator {
        return this.cartItems;
    }

    async getCartItemsCount(): Promise<number> {
        return this.cartItems.count();
    }

    getFirstCartItem(): Locator {
        return this.cartItems.first();
    }

    cartItemByName(productName: string): Locator {
        return this.cartItems.filter({ hasText: productName });
    }

    async assertCartContainsProducts(productNames: string[]) {
        await expect(this.cartItems).toHaveCount(productNames.length);
        await expect(this.cartItems).toContainText(productNames);
    }


    async removeProductFromCartByName(productName: string) {
        const product = this.cartItemByName(productName);
        await product.getByRole('button', { name: 'Remove' }).click();
    }

    async removeFirstCartItem() {
        await this.getFirstCartItem()
            .getByRole('button', { name: 'Remove' })
            .click();
    }

    async assertCartIsEmpty() {
        await expect(this.cartItems).toHaveCount(0);
        await expect(this.shoppingCartBadge).toBeHidden();
    }
}
