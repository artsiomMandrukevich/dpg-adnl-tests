import { test, expect } from '@playwright/test';
import { PageManager } from '../page-object/pageManager';

test.beforeEach(async ({ page }) => {
  await page.goto('/');  
});

test('perform logIn to the website', async({page}) => {
  const pm = new PageManager(page);

  // Sign in to website by email and password
  const email = "testlastnametestfirstname322@gmail.com";
  const pw = "wiAu,MXVTJmXZ,9";
  const expectedUserName = "Test Account";
  await pm.onHomePage().logInToSite(email, pw);
  
  // Verify that the actual first name and last name from the menu is the expected value
  const actualUserName = await pm.onHomePage().getActualUserNameFromNavigationMenu();
  expect(actualUserName).toBe(expectedUserName);
})

test('search for an article', async({page}) => {
  const pm = new PageManager(page);

  // Search an article by title from home page
  const expectedArticle = "4 x Weekendtips voor Schiedam";
  await pm.onHomePage().searchArticle(expectedArticle);

  // Verify that the first article from the search results matches the searched title
  const actualArticle = await pm.onHomePage().getArticleFromSearchResult();
  expect(actualArticle).toBe(expectedArticle); 
})

