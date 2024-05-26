import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
import { randomInt } from 'crypto';

export class PodcastPage extends HelperBase{
  constructor(page: Page){
    super(page);
  }

  async openFirstPodcast(){
    // Handle the consent message
    await this.handleConsentPopUp();

    // Wait until the podcast list is loaded on the page
    const firstPodcastFromList = this.page.locator('a[data-category="teaser"]').first();
    await firstPodcastFromList.waitFor({ state: 'visible' });
    
    // Choose the first podcast from the podcast list
    await firstPodcastFromList.click();
  }

  async clickPodcastPlayerButton(nameOfButton: string){
    // Click button in the player
    const podcastFrame = this.page.frameLocator('.page-content iframe');
    await podcastFrame.getByTitle(nameOfButton).first().click();
    
    // Wait until the state changes to playing/pausing
    await this.page.waitForTimeout(1000);
  } 

  async getPlayerButtonStates(){
    // Locate the navigation menu within the podcast player iframe
    const podcastNavigationMenu = this.page.frameLocator('.page-content iframe').locator('div[dir="ltr"]');

    // Get the visibility state of play and pause buttons
    const isPauseButtonVisible = await podcastNavigationMenu.getByRole('button', { name: 'Pause' }).isVisible();
    const isPlayButtonVisible = await podcastNavigationMenu.getByRole('button', { name: 'Play' }).isVisible();
    const buttonsState = {
      Pause: isPauseButtonVisible,
      Play: isPlayButtonVisible
    };
    return buttonsState
  }

  async openRandomPodcastReturnTitle(){
    // Handle the consent message
    await this.handleConsentPopUp();

    // Wait until podcast list is loaded on the page
    const podcastSelector = 'div[data-testid="section"] a[data-category="teaser"][data-type="audio-item"]';
    await this.page.waitForSelector(podcastSelector);

    // Choose a random podcast
    const randomPodcast = await this.getRandomPodcastIndex(podcastSelector);

    // Get the title of the random podcast
    let randomPodcastTitle = await randomPodcast.locator('span',{hasText: "Afl."}).first().textContent();
    if (!randomPodcastTitle) {
      throw new Error('Failed to retrieve the title of the selected podcast');
    }

    // Navigate to the random podcast page, wait for the content to load
    await randomPodcast.click();
    await this.page.waitForSelector(".page-content iframe");

    return randomPodcastTitle;
  }

  private async getRandomPodcastIndex(podcastSelector: string){
    // Get number of all podcasts
    const podcastList = this.page.locator(podcastSelector);
    const podcastListLength = await podcastList.count();
    if (podcastListLength === 0) {
      throw new Error('No podcasts found on the page');
    }

    // Choose a random podcast
    const randomPodcastIndex  = randomInt(0, podcastListLength - 1);
    const randomPodcast = podcastList.nth(randomPodcastIndex);

    // Retugn a random podcast index
    return randomPodcast;
  }
}