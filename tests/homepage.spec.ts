import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("main navigation", async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL("http://localhost:4173/");
  });

  test("home page has expected toolbar title", async ({ page }) => {
    await expect(page.getByText("My Profile")).toBeVisible();
  });

  test("home page has expected scroll area", async ({ page }) => {
    await expect(page.getByTestId("test-scroll-area")).toBeVisible();
  });
});
