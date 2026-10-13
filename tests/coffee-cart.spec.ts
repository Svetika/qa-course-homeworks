import { test, expect } from '@playwright/test';

test.describe('Coffee Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.ENV_LINK);
  });

  test('verify page header elements are presented on the page', async ({ page }) => {
    await expect(page.getByLabel('Menu page')).toBeVisible();
    await expect(page.getByLabel('Cart page')).toBeVisible();
    await expect(page.getByLabel('GitHub page')).toBeVisible();
    await expect(page.getByTestId('checkout')).toBeVisible();
  });

  test('verify page elements are presented on the page - part 2', async ({ page }) => {
    await expect(page.getByTestId('Espresso')).toBeVisible();
    await expect(page.getByTestId('Espresso_Macchiato')).toBeVisible();
    await expect(page.getByTestId('Cappuccino')).toBeVisible();
    await expect(page.getByTestId('Mocha')).toBeVisible();
    await expect(page.getByTestId('Flat_White')).toBeVisible();
    await expect(page.getByTestId('Americano')).toBeVisible();
    await expect(page.getByTestId('Cafe_Latte')).toBeVisible();
    await expect(page.getByTestId('Espresso_Con Panna')).toBeVisible();
    await expect(page.getByTestId('Cafe_Breve')).toBeVisible();
  });  

  test('verify checkout form elements are presented', async ({ page }) => {
    await page.getByTestId('Espresso').click();
    await page.getByTestId('Espresso_Macchiato').click();
    await page.getByTestId('checkout').click();
    await expect(page.getByText('Payment details×We will send')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();
    await expect(page.getByText('We will send you a payment')).toBeVisible();
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByText('Email', { exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Promotion checkbox' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });

  test('verify checkout form values are filled correctly', async ({ page }) => {
    await page.getByTestId('Espresso').click();
    await page.getByTestId('checkout').click();
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

});