import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class HomePage extends HelperBase{
    constructor(page: Page){
        super(page);
    }

  async logInToSite(userName: string, password: string){
    // Handle the consent message
    await this.handleConsentPopUp();

    // Click the profile link
    const profileLink = this.page.locator('.primary-nav__profile a');
    await profileLink.click();

    // Wait for the navigation to complete
    await this.page.waitForLoadState('domcontentloaded');

    // Fill out email and click Next button
    this.fillInputAndSubmit('#sel-identify-form', '#username', userName);

    // Fill out password and click Log In button
    this.fillInputAndSubmit('#sel-login-form', '#password', password);
  }

  async searchArticle(articleTitle){
    // Handle the consent message
    await this.handleConsentPopUp();

    // Click the "Search" icon in the primary navigation
    const searchIcon = this.page.locator('.primary-nav .primary-nav__list-item--search a');
    await searchIcon.click();

    // Fill out the article title into the search input
    const searchInput = this.page.getByPlaceholder('Zoek op trefwoord, titel of auteur');
    await searchInput.fill(articleTitle);

    // Click the "Search" button after it becomes available
    const searchButton = this.page.getByRole('button', {name:"zoek"})
    await searchButton.locator('[disabled]').waitFor({state: 'detached'});
    await searchButton.click();
  }

  async getActualUserNameFromNavigationMenu(){
    // Click the profile link to verify login
    const profileButton = this.page.locator('.primary-nav__profile-button');
    await profileButton.click();

    // Wait for the navigation to complete
    await this.page.waitForLoadState('domcontentloaded');

    // Return  the actual first name and last name from the menu
    const actualNameFromMenu = await this.page.locator('.menu__popover-link-item-prefix').textContent();
    return actualNameFromMenu
  }

  async getArticleFromSearchResult(){
    // Get the first article from the search results matches the searched title
    const searchResults = this.page.locator('div[class^="search_teaserList"] a article p');
    const actualArticleTitle = await searchResults.first().textContent();
    return actualArticleTitle;
  }

  private async fillInputAndSubmit(formLocator, fieldLocator, value){
    // Fill out field, click submit button
    const inputForm = this.page.locator(formLocator);
    await inputForm.locator(fieldLocator).pressSequentially(value, {delay: 100});
    await inputForm.locator('button[type="submit"]').click();
  }
}