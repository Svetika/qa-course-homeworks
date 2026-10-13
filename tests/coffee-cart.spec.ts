import { test, expect } from '@playwright/test';

test.describe('Coffee Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.ENV_LINK);
  });

  test('verify page header elements are presented on the page', async ({ page }) => {
    await expect(page.locator('[data-test="Menu page"]')).toBeVisible();
    await expect(page.locator('[data-test="Cart page"]')).toBeVisible();
    await expect(page.locator('[data-test="GitHub page"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  });

  test('verify page elements are presented on the page', async ({ page }) => {
    await expect(page.locator('[data-test="Espresso"]')).toBeVisible();
    await expect(page.locator('[data-test="Espresso_Macchiato"]')).toBeVisible();
    await expect(page.locator('[data-test="Cappuccino"]')).toBeVisible();
    await expect(page.locator('[data-test="Mocha"]')).toBeVisible();
    await expect(page.locator('[data-test="Flat_White"]')).toBeVisible();
    await expect(page.locator('[data-test="Americano"]')).toBeVisible();
    await expect(page.locator('[data-test="Cafe_Latte"]')).toBeVisible();
    await expect(page.locator('[data-test="Espresso_Con Panna"]')).toBeVisible();
    await expect(page.locator('[data-test="Cafe_Breve"]')).toBeVisible();
  });  

  test('verify checkout form elements are presented', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('text=Payment details×We will send')).toBeVisible();
    await expect(page.locator('role=heading[name="Payment details"]')).toBeVisible();
    await expect(page.locator('text=We will send you a payment')).toBeVisible();
    await expect(page.locator('text=Name')).toBeVisible();
    await expect(page.locator('role=textbox[name="Name"]')).toBeVisible();
    await expect(page.locator('text=Email')).toBeVisible();
    await expect(page.locator('role=textbox[name="Email"]')).toBeVisible();
    await expect(page.locator('role=checkbox[name="Promotion checkbox"]')).toBeVisible();
    await expect(page.locator('role=button[name="Submit"]')).toBeVisible();
  });

  test('verify checkout form values are filled correctly', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('role=textbox[name="Name"]').fill('test');
    await page.locator('role=textbox[name="Email"]').fill('test@test.com');
    await page.locator('role=checkbox[name="Promotion checkbox"]').check();
    await expect(page.locator('role=form[name="Payment form"]')).toContainText('Name');
    await expect(page.locator('role=form[name="Payment form"]')).toContainText('Email');
    await expect(page.locator('role=textbox[name="Name"]')).toHaveValue('test');
    await expect(page.locator('role=textbox[name="Email"]')).toHaveValue('test@test.com');
    await expect(page.locator('role=checkbox[name="Promotion checkbox"]')).toBeChecked();
  });

  test('verify number of items in cart is updated correctly', async ({ page }) => {
    await expect(page.locator('role=listitem').filter({ hasText: 'cart (0)' })).toBeVisible();
    await page.locator('[data-test="Espresso"]').click();
    await expect(page.locator('role=listitem').filter({ hasText: 'cart (1)' })).toBeVisible();
  });

});