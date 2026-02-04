import { type Locator, type Page } from '@playwright/test';
export default class InventoryPage {




    readonly productTitles: Locator;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.productTitles = page.locator('.inventory_item_name');
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartBadge = page.getByTestId('shopping-cart-badge'); 
    }


    async getInventoryItemsCount(): Promise<number> {
        return this.productTitles.count();
    }

    async getProductTitles(): Promise<string[]> {
        return this.productTitles.allTextContents();
    }

    async getInventoryItems(): Promise<Locator> {
        return this.inventoryItems;
    }

    addPoductToCartByName = async (productName: string) => {
        const productCardLocator = await this.getProductCardByName(productName);
        const addToCartButton = productCardLocator.getByRole('button', { name: 'Add to cart' });
        await addToCartButton.click();
    }
    async removeProductFromCartByName(productName: string) {
        const productCardLocator = await this.getProductCardByName(productName);
        const removeButton = productCardLocator.getByRole('button', { name: 'Remove' });
        await removeButton.click();
    }

    async getProductByName(productName: string): Promise<Locator> {
        return this.productTitles.filter({ hasText: productName });
    }

    async getProductCardByName(productName: string): Promise<Locator> {
        return this.inventoryItems.filter({ hasText: productName });
    }

}
