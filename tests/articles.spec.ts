import { test, expect, } from '@playwright/test';
import { login, createArticles, logout, checkArticlesInYourFeed } from './functions';


test.describe('Articles tests', () => {
  test('verify the user can login, create 10 articles and check the articles are available in the Your feed (E2E', async ({ page }) => {
    // login with the article creator user
    await page.goto(process.env.ARTICLES_ENV_LINK);
    await login(page, process.env.ARTICLE_CREATOR_USER, process.env.ARTICLE_CREATOR_USER_PASSWORD);

    // create 10 articles
    const numberOfArticles = 10;
    await createArticles(page, numberOfArticles);

    // logout the article creator user
    await logout(page);

    // check the articles are available in the Your feed
    await login(page, process.env.ARTICLE_READER_USER, process.env.ARTICLE_READER_USER_PASSWORD);
    
    await checkArticlesInYourFeed(page, numberOfArticles);

    // logout the article reader user
    await logout(page);

    await login(page, process.env.ARTICLE_READER_USER, process.env.ARTICLE_READER_USER_PASSWORD);
    await checkArticlesInYourFeed(page, 1);
    await logout(page);
  });

});

