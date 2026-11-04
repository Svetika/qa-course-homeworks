import { test, expect } from '@playwright/test';

test.describe('Coffee Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.COFFEE_CART_ENV_LINK);
  });

  test('verify page header elements are presented on the page', async ({ page }) => {
    //variables
    const menuPage = page.locator('[aria-label="Menu page"]');
    const cartPage = page.locator('[aria-label="Cart page"]');
    const gitHubPage = page.locator('[aria-label="GitHub page"]');
    const proceedToCheckout = page.locator('[aria-label="Proceed to checkout"]');

    await expect(menuPage).toBeVisible();
    await expect(cartPage).toBeVisible();
    await expect(gitHubPage).toBeVisible();
    await expect(proceedToCheckout).toBeVisible();
  });

  test('verify page elements are presented on the page', async ({ page }) => {
    // variables
    const espresso = page.locator('[aria-label="Espresso"]');
    const espressoMacchiato = page.locator('[aria-label="Espresso Macchiato"]');
    const cappuccino = page.locator('[aria-label="Cappuccino"]');
    const mocha = page.locator('[aria-label="Mocha"]');
    const flatWhite = page.locator('[aria-label="Flat White"]');
    const americano = page.locator('[aria-label="Americano"]');
    const cafeLatte = page.locator('[aria-label="Cafe Latte"]');
    const espressoConPanna = page.locator('[aria-label="Espresso Con Panna"]');
    const cafeBreve = page.locator('[aria-label="Cafe Breve"]');

    await expect(espresso).toBeVisible();
    await expect(espressoMacchiato).toBeVisible();
    await expect(cappuccino).toBeVisible();
    await expect(mocha).toBeVisible();
    await expect(flatWhite).toBeVisible();
    await expect(americano).toBeVisible();
    await expect(cafeLatte).toBeVisible();
    await expect(espressoConPanna).toBeVisible();
    await expect(cafeBreve).toBeVisible();
  });  

  test('verify checkout form elements are presented', async ({ page }) => {
    // variables
    const espresso = page.locator('[aria-label="Espresso"]');
    const espressoMacchiato = page.locator('[aria-label="Espresso Macchiato"]');
    const proceedToCheckout = page.locator('[aria-label="Proceed to checkout"]');
    const closeButton = page.locator('.close');
    const paymentForm = page.locator('[aria-label="Payment form"]');
    const nameInput = page.locator('[id="name"]');
    const emailInput = page.locator('[id="email"]');
    const promotionCheckbox = page.locator('[id="promotion"]');
    const promotionLabel = page.locator('[id="promotion-label"]');
    const submitPayment = page.locator('[id="submit-payment"]');

    await espresso.click();
    await espressoMacchiato.click();
    await proceedToCheckout.click();
    await expect(closeButton).toBeVisible();
    await expect(paymentForm).toBeVisible();
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(promotionCheckbox).toBeVisible();
    await expect(promotionLabel).toBeVisible();
    await expect(submitPayment).toBeVisible();
  });

  test('verify checkout form values are filled correctly', async ({ page }) => {
    // variables
    const espresso = page.locator('[aria-label="Espresso"]');
    const proceedToCheckout = page.locator('[aria-label="Proceed to checkout"]');
    const nameInput = page.locator('[id="name"]');
    const emailInput = page.locator('[id="email"]');
    const promotionCheckbox = page.locator('[id="promotion"]'); 

    await espresso.click();
    await proceedToCheckout.click();
    await nameInput.fill('test');
    await emailInput.fill('test@test.com');
    await promotionCheckbox.check();
    await expect(nameInput).toHaveValue('test');
    await expect(emailInput).toHaveValue('test@test.com');
    await expect(promotionCheckbox).toBeChecked();
  });

  test('verify number of items in cart is updated correctly', async ({ page }) => {
    //variables
    const cartPage = page.locator('[aria-label="Cart page"]'); 
    const espresso = page.locator('[aria-label="Espresso"]');

    await expect(cartPage.filter({ hasText: 'cart (0)' })).toBeVisible();
    await espresso.click();
    await expect(cartPage.filter({ hasText: 'cart (1)' })).toBeVisible();
  });

});