import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
});

test('verify page elements are presented on the page - part 1', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Menu page' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'cart (0)' })).toBeVisible();
  await expect(page.getByRole('listitem').filter({ hasText: 'github' })).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
});

test('verify page elements are presented on the page - part 2', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Espresso $' })).toBeVisible();
  await expect(page.locator('[data-test="Espresso"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Espresso Macchiato $' })).toBeVisible();
  await expect(page.locator('[data-test="Espresso_Macchiato"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cappuccino $' })).toBeVisible();
  await expect(page.locator('[data-test="Cappuccino"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mocha $' })).toBeVisible();
  await expect(page.locator('[data-test="Mocha"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Flat White $' })).toBeVisible();
  await expect(page.locator('[data-test="Flat_White"]')).toBeVisible();
});

test('verify page elements are presented on the page - part 3', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Americano $' })).toBeVisible();
  await expect(page.locator('[data-test="Americano"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cafe Latte $' })).toBeVisible();
  await expect(page.locator('[data-test="Cafe_Latte"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Espresso Con Panna $' })).toBeVisible();
  await expect(page.locator('[data-test="Espresso_Con Panna"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cafe Breve $' })).toBeVisible();
  await expect(page.locator('[data-test="Cafe_Breve"]')).toBeVisible();
});

test('verify checkout form elements are presented', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.getByText('Payment details×We will send')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();
  await expect(page.getByText('We will send you a payment')).toBeVisible();
  await expect(page.getByText('Name')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  await expect(page.getByText('Email', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
});

test('verify checkout form values are filled correctly', async ({ page }) => {
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');
  await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
  await expect(page.getByRole('form', { name: 'Payment form' })).toContainText('Name');
  await expect(page.getByRole('form', { name: 'Payment form' })).toContainText('Email');
  await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('test');
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('test@test.com');
  await expect(page.getByRole('checkbox', { name: 'Promotion checkbox' })).toBeChecked();
});

test('verify number of items in cart is updated correctly', async ({ page }) => {
  await expect(page.getByRole('listitem').filter({ hasText: 'cart (0)' })).toBeVisible();
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.getByRole('listitem').filter({ hasText: 'cart (1)' })).toBeVisible();
});