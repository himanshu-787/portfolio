import { expect, test } from "@playwright/test";

test.describe("mobile layout", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile project only");

  const paths = ["/", "/about", "/skills", "/projects", "/projects/gridpinn", "/experience", "/blog", "/blog/physics-in-the-loss", "/contact"];

  for (const path of paths) {
    test(`no horizontal scroll on ${path}`, async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("menu button opens the navigation", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("link", { name: "Projects", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  });
});