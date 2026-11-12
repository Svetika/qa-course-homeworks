import { Page, expect } from '@playwright/test';

export async function addEspressoAndEspressoMacchiatoToCart(page: Page) {
  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Espresso Macchiato"]').click();
}

export async function proceedToCheckout(page: Page) {
  await page.locator('[aria-label="Proceed to checkout"]').click();
}

export async function addEspressoToCart(page: Page) {
    await page.locator('[aria-label="Espresso"]').click();
}