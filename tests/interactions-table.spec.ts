import { test, expect } from '@playwright/test';

test.describe('Interactions table tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.ENV_LINK);
  });

  test('verify elements can be sorted by the "Тест" column', async ({ page }) => {
    // Натиснути на заголовок колонки "Тест" для сортування елементів
    await page.locator('xpath=//*[@data-testid="interactions-sort-name"]').click();

    // Отримати кількість рядків через count().
    const rows = page.locator('xpath=//table//tr');
 
    // Отримати конкретний рядок через nth()
    await expect(rows.nth(1)).toHaveAttribute('data-testid', 'interactions-table-row-2');
    await expect(rows.nth(2)).toHaveAttribute('data-testid', 'interactions-table-row-3');
    await expect(rows.nth(3)).toHaveAttribute('data-testid', 'interactions-table-row-4');
    await expect(rows.nth(4)).toHaveAttribute('data-testid', 'interactions-table-row-1');
  });

  test('verify elements can be checked and "checked" count is updated accordingly', async ({ page }) => {
    // Перевірити, що початковий лічильник вибраних елементів дорівнює 0
    await expect(page.locator('xpath=//*[@data-testid="interactions-selected-count"]')).toContainText('0');

    // Натиснути на чекбокс першого рядка для вибору елемента
    await page.locator('xpath=//*[@data-testid="interactions-row-select-1"]').click();

    // Перевірити, що лічильник вибраних елементів оновився
    await expect(page.locator('xpath=//*[@data-testid="interactions-selected-count"]')).toContainText('1');
  });

});