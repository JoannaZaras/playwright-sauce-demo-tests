# ![Playwright](https://img.shields.io/badge/Playwright-1.37.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue) ![Node.js](https://img.shields.io/badge/Node.js-20.2.0-green)

# playwright-sauce-demo-tests

**Playwright + TypeScript tests for the Sauce Labs ecommerce demo page**  

This repository demonstrates practical **automation testing skills** using Playwright and TypeScript, including Page Object Model, fixtures, e2e flows, and reporting.

---

## Key Skills & Features Demonstrated

- **Playwright**: locators (`getByRole`, `getByPlaceholder`, `getByTestId`), test configuration, HTML reports  
- **TypeScript**: static typing, type safety, better code completion  
- **Page Object Model (POM)**: separation of page locators and test logic  
- **Fixtures**: reusable setup for login, inventory, and cart  
- **Data-driven testing**: separate test data (`data/users.ts`) for valid and invalid users  
- **Assertions & validations**: URL checks, visibility, content, and count assertions  
- **E2E testing**: full user journey from login → inventory → cart → checkout  
- **Test structure**: separate test files for each page, with happy and unhappy paths  

---

## Project Structure

* data/ - Test data, e.g., users with credentials
* pages/ - Page Objects: LoginPage, InventoryPage, CartPage, CheckoutPage
* fixtures/ - Playwright fixtures: auth, cart, inventory
* tests/ - Page-specific tests and E2E tests
* playwright.config.ts - Playwright configuration

---

## Installation

1. Ensure **Node.js** and **npm** are installed:

```
node --version
npm --version
```
2. Clone the repository:

```
git clone https://github.com/JoannaZaras/playwright-sauce-demo-tests.git
cd playwright-sauce-demo-tests
```

3. Install dependencies

```
npm install
```


---

## Running Tests

### Run all tests (headless by default):

```
npx playwright test
```
### Run tests in headed mode (browser visible):

```
npx playwright test --headed
```

### Generate and view HTML reports:

```
npx playwright show-report
```

## Notes

* __Fixtures__ handle repeated setup tasks such as logging in or pre-filling the cart.

* __E2E test__ demonstrates a complete user flow, while other tests focus on specific pages.

* The repo is structured to showcase practical Playwright automation skills in a clear and maintainable way.