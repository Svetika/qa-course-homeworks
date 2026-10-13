import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.ENV_LINK);
  });

  test('new user can register', async ({ page }) => {
    // Prepare random username for registration
    function randomNumber() {
      return Math.floor(Math.random() * 1000);
    }

    const username = 'Svitla' + randomNumber();

    // Register a new user
    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(username + '@test.com');
    await page.getByTestId('auth-password').fill(process.env.USER_PASSWORD);
    await page.getByTestId('register-confirm-password').fill(process.env.USER_PASSWORD);
    await page.locator('label').filter({ hasText: 'A colleague recommended it' }).locator('span').click();      
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    // Verify user is logged in
    await expect(page.getByTestId('nav-profile')).toBeVisible();
    await page.getByTestId('nav-profile').click();
    await expect(page.getByTestId('profile-username')).toContainText(username);
  });

  test('user with existing email cannot register', async ({ page }) => {
    // Prepare random username for registration
    function randomNumber() {
      return Math.floor(Math.random() * 1000);
    }

    const username = 'Svitla' + randomNumber();

    // Register a new user
    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(username + '@test.com');
    await page.getByTestId('auth-password').fill(process.env.USER_PASSWORD);
    await page.getByTestId('register-confirm-password').fill(process.env.USER_PASSWORD);
    await page.locator('label').filter({ hasText: 'A colleague recommended it' }).locator('span').click();      
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    // Log out
    await page.getByTestId('nav-profile').click();
    await page.getByRole('link', { name: 'Edit profile' }).click();
    await page.getByTestId('logout-button').click();

    // Attempt to register with the same email
    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(username + '@test.com');
    await page.getByTestId('auth-password').fill(process.env.USER_PASSWORD);
    await page.getByTestId('register-confirm-password').fill(process.env.USER_PASSWORD);
    await page.locator('label').filter({ hasText: 'A colleague recommended it' }).locator('span').click();      
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    // Verify error message for existing email
    await expect(page.getByText('body email або username')).toBeVisible();
  });

  test('user cannot register with invalid email', async ({ page }) => {    
    // Attempt to register with an invalid email
    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('auth-username').fill('test username');
    await page.getByTestId('auth-email').fill('invalid-email');
    await page.getByTestId('auth-password').fill(process.env.USER_PASSWORD);
    await page.getByTestId('register-confirm-password').fill(process.env.USER_PASSWORD);
    await page.locator('label').filter({ hasText: 'A colleague recommended it' }).locator('span').click();      
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();
    
    // Verify error message for invalid email
    await expect(page.getByTestId('auth-form').getByText('Password', { exact: true })).toBeVisible();
  });

  test('existing user can sign in', async ({ page }) => {
    // Prepare random username for registration
    function randomNumber() {
      return Math.floor(Math.random() * 1000);
    }

    const username = 'Svitla' + randomNumber();

    // Register a new user
    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(username + '@test.com');
    await page.getByTestId('auth-password').fill(process.env.USER_PASSWORD);
    await page.getByTestId('register-confirm-password').fill(process.env.USER_PASSWORD);
    await page.locator('label').filter({ hasText: 'A colleague recommended it' }).locator('span').click();      
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    // Log out after registration
    await page.getByTestId('nav-profile').click();
    await page.getByRole('link', { name: 'Edit profile' }).click();
    await page.getByTestId('logout-button').click();

    // Log in with the newly registered user
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').fill(username + '@test.com');
    await page.getByTestId('auth-password').fill(process.env.USER_PASSWORD);
    await page.getByTestId('auth-submit').click();
    await expect(page.getByTestId('nav-profile')).toBeVisible();
    await page.getByTestId('nav-profile').click();
    await expect(page.getByTestId('profile-username')).toContainText(username);
  });

  test('existing user cannot sign in with incorrect password', async ({ page }) => {
    // Prepare random username for registration
    function randomNumber() {
      return Math.floor(Math.random() * 1000);
    }

    const username = 'Svitla' + randomNumber();

    // Register a new user
    await page.getByTestId('nav-sign-up').click();
    await page.getByTestId('auth-username').fill(username);
    await page.getByTestId('auth-email').fill(username + '@test.com');
    await page.getByTestId('auth-password').fill(process.env.USER_PASSWORD);
    await page.getByTestId('register-confirm-password').fill(process.env.USER_PASSWORD);
    await page.locator('label').filter({ hasText: 'A colleague recommended it' }).locator('span').click();      
    await page.getByTestId('register-terms').check();
    await page.getByTestId('auth-submit').click();

    // Log out after registration
    await page.getByTestId('nav-profile').click();
    await page.getByRole('link', { name: 'Edit profile' }).click();
    await page.getByTestId('logout-button').click();

    // Attempt to log in with incorrect password
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').fill(username + '@test.com');
    await page.getByTestId('auth-password').fill('incorrect_password');
    await page.getByTestId('auth-submit').click();

    // Verify error message for incorrect password
    await expect(page.getByText('email or password неправильні')).toBeVisible();
  });

  test('non-existing user cannot sign in', async ({ page }) => {
    // Prepare random username for registration
    function randomNumber() {
      return Math.floor(Math.random() * 1000);
    }

    const username = 'Svitla' + randomNumber();

    // Attempt to log in with a non-existing user
    await page.getByTestId('nav-sign-in').click();
    await page.getByTestId('auth-email').fill(username + '@test.com');
    await page.getByTestId('auth-password').fill('incorrect_password');
    await page.getByTestId('auth-submit').click();

    // Verify error message for a non-existing user
    await expect(page.getByText('email or password неправильні')).toBeVisible();
  });

});