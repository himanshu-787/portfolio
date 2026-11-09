import { expect, test } from "@playwright/test";

const cards = 'a[href^="/projects/"]';

test("search narrows the project list", async ({ page }) => {
  await page.goto("/projects");
  await page.getByLabel("Search projects").fill("federated");
  await expect(page.locator(cards)).toHaveCount(2);
});

test("tag chip filters and resets", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "PyTorch", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(2);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(cards)).toHaveCount(6);
});

test("GridPINN case study renders equations and pending markers honestly", async ({ page }) => {
  await page.goto("/projects/gridpinn");
  await expect(page.locator(".katex").first()).toBeVisible();
  await expect(page.getByText("Pending").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
});

test("a project without a case study shows the notice", async ({ page }) => {
  await page.goto("/projects/aura");
  await expect(page.getByText("not published yet")).toBeVisible();
});