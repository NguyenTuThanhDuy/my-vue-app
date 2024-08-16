import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    console.log("Go to Profile page");
    await page.goto("/profile");
    await page.waitForLoadState("domcontentloaded");
    await page.screenshot({ path: "screenshot.png" });
  });

  test("main navigation", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL("http://localhost:4173/profile");
  });

  test("Profile page has expected h1", async ({ page }) => {
    await expect(page.locator("//div//h1")).toBeVisible();
    await expect(page.getByText("Test")).toBeVisible();
  });

  test("Profile page has expected div", async ({ page }) => {
    // Then, check if the text "Profile" is contained within a specific div
    const divWithText = page.locator("//div[contains(text(), 'Profile')]");
    await expect(divWithText).toBeVisible();
    await expect(divWithText).toContainText("Profile");
  });
});
