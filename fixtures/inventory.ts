import { test as base, expect as pwExpect } from './auth';
import InventoryPage from '../pages/InventoryPage';

export const test = base.extend<{
  inventoryPage: InventoryPage;
}>({
  inventoryPage: async ({ loggedInPage }, use) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await use(inventoryPage);
  },
});

// Forward expect from base fixture
export const expect = pwExpect;
