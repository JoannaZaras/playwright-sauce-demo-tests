import { type Locator, type Page } from '@playwright/test';
export default class CartPage {


    readonly page: Page;

    readonly shoppingCartBadge: Locator;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.inventoryItems = page.locator('.cart_item');
    }
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }

    async goToCart() {
        await this.shoppingCartBadge.click();
    }    
    
    async getItems(): Promise<Locator> {
      return this.page.getByTestId('inventory-item');
    }
    removeProductFromCartByName = async (productName: string) => {
      const productLocator = this.inventoryItems.filter({ hasText: productName });
      const removeButton = productLocator.getByRole('button', { name: 'Remove' });
      await removeButton.click();
    }

}
