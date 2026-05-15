# Playwright SauceDemo Tests

Small end-to-end UI test automation project for SauceDemo using Playwright and TypeScript.

## Purpose

The project was created as a reference and learning project for comparing different UI automation approaches and frameworks:

- Playwright
- Selenium WebDriver
- Selenide

The same demo application is used across repositories to make framework comparison easier.

## Application under test

- SauceDemo
- https://www.saucedemo.com

## Tech stack

- Playwright
- TypeScript
- Node.js
- Playwright HTML Report

## Test scenarios

Covered scenarios include:

- successful login
- unsuccessful login
- adding product to cart
- removing product from cart
- checkout flow

## Project structure

```text
pages/       - Page Object classes
tests/       - test specifications
fixtures/    - reusable fixtures
test-data/   - test users and input data
```

## Design notes

The project uses:

- Page Object Model (POM)
- Playwright fixtures
- reusable test data
- semantic Playwright locators (`getByRole`, `getByText`)
- asynchronous Playwright API with TypeScript

Example:

```ts
const inventoryPage = await loginPage.loginAsStandardUser();

await inventoryPage.addBackpackToCart();

const cartPage = await inventoryPage.openCart();
```

## Running tests

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open Playwright report:

```bash
npm run report
```

## Notes

The project is intentionally small and focused on readability, maintainability and comparison between automation frameworks rather than building a large enterprise framework.
