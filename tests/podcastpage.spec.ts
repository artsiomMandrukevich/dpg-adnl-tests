import { test, expect} from '@playwright/test';
import { PageManager } from '../page-object/pageManager';

test.beforeEach(async ({ page }) => {
  await page.goto('/podcasts');
});

test('user can listen to podcast', async ({ page }) => {
  const pm = new PageManager(page);

  // Open first podcast from the page
  await pm.onPodcastPage().openFirstPodcast();

  // Click "Play" in the player
  await pm.onPodcastPage().clickPodcastPlayerButton("Play");

  // Verify that the "Play" button is changed to "Pause" button in the player
  const buttonsStateAfterPlay = await pm.onPodcastPage().getPlayerButtonStates();
  expect(buttonsStateAfterPlay.Play).toBeFalsy();
  expect(buttonsStateAfterPlay.Pause).toBeTruthy();

  // Click "Pause" in the player
  await pm.onPodcastPage().clickPodcastPlayerButton("Pause");

  // Verify that the "Pause" button is changed to "Play" button in the player
  const buttonsStateAfterPause = await pm.onPodcastPage().getPlayerButtonStates();
  expect(buttonsStateAfterPause.Play).toBeTruthy();
  expect(buttonsStateAfterPause.Pause).toBeFalsy();
});

test('Open random podcast and check that correct podcast is opened', async({page}) => {
  const pm = new PageManager(page);

  // Open random podcast, get podcast title
  const randomPodcastTitle = await pm.onPodcastPage().openRandomPodcastReturnTitle();
 
  // Get the title of the current random podcast page
  const pageRandomPodcastTitle = await page.title();
    
  // Validate that the title of the random podcast contains the title of the current random podcast page
  expect(randomPodcastTitle).toContain(pageRandomPodcastTitle);
})  

