import { expect, type Locator, type Page } from '@playwright/test';
import CartPage from './CartPage';

export default class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly productTitles: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.productTitles = page.locator('.inventory_item_name');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
        this.shoppingCartLink = page.getByTestId('shopping-cart-link');
    }

    async assertInventoryPageOpened() {
        await expect(this.page).toHaveURL(/.*inventory.html/);
        await expect(this.page.getByText('Products')).toBeVisible();
    }

    async getInventoryItemsCount(): Promise<number> {
        return this.inventoryItems.count();
    }

    async getProductTitles(): Promise<string[]> {
        return this.productTitles.allTextContents();
    }

    async addProductToCartByName(productName: string) {
        const productCard = this.getProductCardByName(productName);
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async addFirstItemToCart() {
        await this.inventoryItems
            .first()
            .getByRole('button', { name: 'Add to cart' })
            .click();
    }

    async removeProductFromCartByName(productName: string) {
        const productCard = this.getProductCardByName(productName);
        await productCard.getByRole('button', { name: 'Remove' }).click();
    }

    getProductByName(productName: string): Locator {
        return this.productTitles.filter({ hasText: productName });
    }

    getProductCardByName(productName: string): Locator {
        return this.inventoryItems.filter({ hasText: productName });
    }

    async openCart(): Promise<CartPage> {
        await this.shoppingCartLink.click();
        return new CartPage(this.page);
    }
}
