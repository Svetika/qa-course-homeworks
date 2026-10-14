import { test, expect } from '@playwright/test';

test.describe('Coffee Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.ENV_LINK);
  });

  test('verify page header elements are presented on the page', async ({ page }) => {
    await expect(page.locator('[aria-label="Menu page"]')).toBeVisible();
    await expect(page.locator('[aria-label="Cart page"]')).toBeVisible();
    await expect(page.locator('[aria-label="GitHub page"]')).toBeVisible();
    await expect(page.locator('[aria-label="Proceed to checkout"]')).toBeVisible();
  });

  test('verify page elements are presented on the page', async ({ page }) => {
    await expect(page.locator('[aria-label="Espresso"]')).toBeVisible();
    await expect(page.locator('[aria-label="Espresso Macchiato"]')).toBeVisible();
    await expect(page.locator('[aria-label="Cappuccino"]')).toBeVisible();
    await expect(page.locator('[aria-label="Mocha"]')).toBeVisible();
    await expect(page.locator('[aria-label="Flat White"]')).toBeVisible();
    await expect(page.locator('[aria-label="Americano"]')).toBeVisible();
    await expect(page.locator('[aria-label="Cafe Latte"]')).toBeVisible();
    await expect(page.locator('[aria-label="Espresso Con Panna"]')).toBeVisible();
    await expect(page.locator('[aria-label="Cafe Breve"]')).toBeVisible();
  });  

  test('verify checkout form elements are presented', async ({ page }) => {
    await page.locator('[aria-label="Espresso"]').click();
    await page.locator('[aria-label="Espresso Macchiato"]').click();
    await page.locator('[aria-label="Proceed to checkout"]').click();
    await expect(page.locator('.close')).toBeVisible();
    await expect(page.locator('[aria-label="Payment form"]')).toBeVisible();
    await expect(page.locator('[id="name"]')).toBeVisible();
    await expect(page.locator('[id="email"]')).toBeVisible();
    await expect(page.locator('[id="promotion"]')).toBeVisible();
    await expect(page.locator('[id="promotion-label"]')).toBeVisible();
    await expect(page.locator('[id="submit-payment"]')).toBeVisible();
  });

  test('verify checkout form values are filled correctly', async ({ page }) => {
    await page.locator('[aria-label="Espresso"]').click();
    await page.locator('[aria-label="Proceed to checkout"]').click();
    await page.locator('[id="name"]').fill('test');
    await page.locator('[id="email"]').fill('test@test.com');
    await page.locator('[id="promotion"]').check();
    await expect(page.locator('[id="name"]')).toHaveValue('test');
    await expect(page.locator('[id="email"]')).toHaveValue('test@test.com');
    await expect(page.locator('[id="promotion"]')).toBeChecked();
  });

  test('verify number of items in cart is updated correctly', async ({ page }) => {
    await expect(page.locator('[aria-label="Cart page"]').filter({ hasText: 'cart (0)' })).toBeVisible();
    await page.locator('[aria-label="Espresso"]').click();
    await expect(page.locator('[aria-label="Cart page"]').filter({ hasText: 'cart (1)' })).toBeVisible();
  });

});