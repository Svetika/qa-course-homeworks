import { Page, expect } from '@playwright/test';

export async function login(page: Page, user: string, password: string): Promise<void> {
  await page.getByTestId('nav-sign-in').click();

  await page.getByTestId('auth-email').fill(user);
  await page.getByTestId('auth-password').fill(password);

  await page.getByTestId('auth-submit').click();

  await expect(page.getByText(user)).toBeVisible();
}

export async function createArticles(page: Page, numberOfArticles: number): Promise<void> {
    for (let i = 0; i < numberOfArticles; i++) {
        //await page.getByTestId('editor-title').waitFor({ state: 'visible' });

        await page.getByTestId('nav-new-article').click();

        await page.getByTestId('editor-title').fill(`Article title ${i+1}`);
        await page.getByTestId('editor-description').fill(`Article description ${i+1}`);
        await page.getByTestId('editor-body').fill(`Article body ${i+1}`);

        await page.getByTestId('editor-submit').click();
        await page.waitForURL(/\/article\//);
        await page.goto(process.env.ARTICLES_ENV_LINK + '/editor');
    }  
}

export async function logout(page: Page): Promise<void> {
  await page.getByTestId('nav-profile').click();
  await page.getByText('Edit profile').click();
  await page.getByTestId('logout-button').click();
}

export async function checkArticlesInYourFeed(page: Page, numberOfArticles: number): Promise<void> {
  await page.goto(process.env.ARTICLES_ENV_LINK);
  for (let i = 0; i < numberOfArticles; i++) {
    await expect(page.getByTestId(`article-preview-article-title-${i+1}`)).toBeVisible();
  }
}