
import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./example-base-page";

export class HomePage extends BasePage {
    readonly expect: HomePageAssertions;

    readonly _headerLocator: Locator;
    readonly _loggedInTextLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.expect = new HomePageAssertions(this);

        this._headerLocator = this.page.locator('h2');
        this._loggedInTextLocator = this.page.locator('"You are logged in"');
    }

    override async navigateTo(): Promise<void> {
        await super.navigateTo('/');
    }
}

class HomePageAssertions {
    constructor(readonly homePage: HomePage) {
    }

    async toHaveHeader(expected: string): Promise<void> {
        await expect(this.homePage._headerLocator).toHaveText(expected);
    }

    async toBeOnHomePage(): Promise<void> {
        await expect(this.homePage.page).toHaveURL('/welcome');
    }

    async toBeLoggedIn(): Promise<void> {
        await expect(this.homePage._loggedInTextLocator).toBeVisible();
    }
}