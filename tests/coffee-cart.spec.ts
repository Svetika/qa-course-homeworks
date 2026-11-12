import { test, expect } from '@playwright/test';
import { addEspressoAndEspressoMacchiatoToCart, proceedToCheckout, addEspressoToCart } from './page-actions';


test.describe('Coffee Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.COFFEE_CART_ENV_LINK);
  });

  test('verify checkout form elements are presented', async ({ page }) => {
    // variables    
    const closeButton = page.locator('.close');
    const paymentForm = page.locator('[aria-label="Payment form"]');
    const nameInput = page.locator('[id="name"]');
    const emailInput = page.locator('[id="email"]');
    const promotionCheckbox = page.locator('[id="promotion"]');
    const promotionLabel = page.locator('[id="promotion-label"]');
    const submitPayment = page.locator('[id="submit-payment"]');

    await addEspressoAndEspressoMacchiatoToCart(page);
    await proceedToCheckout(page);
    
    await expect(closeButton).toBeVisible();
    await expect(paymentForm).toBeVisible();
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(promotionCheckbox).toBeVisible();
    await expect(promotionLabel).toBeVisible();
    await expect(submitPayment).toBeVisible();
  });

  test('verify number of items in cart is updated correctly', async ({ page }) => {
    // variables
    const cartPage = page.locator('[aria-label="Cart page"]');

    await expect(cartPage.filter({ hasText: 'cart (0)' })).toBeVisible();
    await addEspressoToCart(page);
    await expect(cartPage.filter({ hasText: 'cart (1)' })).toBeVisible();    
  });

});