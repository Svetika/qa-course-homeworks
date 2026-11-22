import { test, expect, Page } from '@playwright/test';


// prepare data for parameterized test
const feedbackData = [
  // Dataset with all fields filled
  {
    id: 1,
    mandatoryFields: {
      name: 'Test User 1',
      email: 'testuser1@gm.com',
      message: 'This is a test feedback message.',
    },    
    fillOptionalFields: async function (page: Page) {
      await page.locator('input[type="file"]').setInputFiles('files/test_file.jpg');
      await page.getByRole('checkbox', { name: 'Надіслати копію звернення мені на email' }).click();
      await page.getByRole('button', { name: 'Надіслати' }).click();
      await expect(page.getByRole('button', { name: 'Надіслати ще одне' })).toBeVisible();
    }
  },
  // Dataset with only required fields filled
  {
    id: 2,
    mandatoryFields: {
      name: 'Test User 2',
      email: 'testuser2@gm.com',
      message: 'This is another test feedback message.'
    },
    fillOptionalFields: async function (page: Page) {
      await page.getByRole('button', { name: 'Надіслати' }).click();
      await expect(page.getByRole('button', { name: 'Надіслати ще одне' })).toBeVisible();
    }
  },
  // Dataset with only optional fields filled
  {
    id: 3,
    fillOptionalFields: async function (page: Page) {
      await page.locator('input[type="file"]').setInputFiles('files/test_file.jpg');
      await page.getByRole('checkbox', { name: 'Надіслати копію звернення мені на email' }).click();
      await page.getByRole('button', { name: 'Надіслати' }).click();
      await expect(page.locator('text=name обов\'язкове поле')).toBeVisible();
      await expect(page.locator('text=email некоректний email')).toBeVisible();
      await expect(page.locator('text=message обов\'язкове поле')).toBeVisible();
    }
  }
];

    for (const data of feedbackData) {
  test(`Feedback form: submit feedback for dataset ${data.id}`, async ({ page }) => {
    // open the feedback form page
    await page.goto(process.env.ENV_LINK);
    await expect(page.locator('text=Зворотний зв\'язок')).toBeVisible();

    // fill the mandatory fields if present
    if (data.mandatoryFields) {
      await page.getByPlaceholder('Як до вас звертатися?').fill(data.mandatoryFields.name);
      await page.getByPlaceholder('you@example.com').fill(data.mandatoryFields.email);
      await page.getByPlaceholder('Опишіть питання якомога детальніше…').fill(data.mandatoryFields.message);
    }

    // fill the optional fields if present
    if (data.fillOptionalFields) {
      await data.fillOptionalFields(page);
    }

    // submit the feedback form and verify the success message
    
  });
}

