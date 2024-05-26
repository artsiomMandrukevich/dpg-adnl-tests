import { Page } from '@playwright/test';
import { HomePage } from './homePage';
import { PodcastPage } from './podcastPage';

export class PageManager{
    private readonly page: Page;
    private readonly homePage: HomePage;
    private readonly podcastPage: PodcastPage;

    constructor(page: Page){
        this.page = page;
        this.homePage = new HomePage(this.page);
        this.podcastPage = new PodcastPage(this.page);
    }

    onHomePage(){
        return this.homePage;
    }

    onPodcastPage(){
        return this.podcastPage;
    }
}