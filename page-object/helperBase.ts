import { Page } from '@playwright/test';

export class HelperBase{
  readonly page: Page;

  constructor(page: Page){
    this.page = page;
  }

  async handleConsentPopUp(){
    await this.page.waitForLoadState('domcontentloaded');
    const consentFrame = this.page.frameLocator('[title="SP Consent Message"]');
    await consentFrame.getByTitle('Akkoord').click();    
  }
}