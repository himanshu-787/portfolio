import { expect, test } from "@playwright/test";

test("shows validation errors on an empty form", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Message must be at least 10 characters.")).toBeVisible();
});

test("submits a valid message (API mocked)", async ({ page }) => {
  let body = "";
  await page.route("**/api/contact", async (route) => {
    body = route.request().postData() ?? "";
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Ada Lovelace");
  await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
  await page.getByLabel("Message", { exact: true }).fill("Hello, I would like to talk about an internship.");
  await page.waitForTimeout(2100); // the server ignores forms filled in under 2s; keep the test realistic
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Message sent.")).toBeVisible();
  expect(body).toContain("ada@example.com");
});

test("shows an error when the API fails (mocked)", async ({ page }) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 429, contentType: "application/json", body: JSON.stringify({ ok: false, error: "Too many messages." }) })
  );
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: true }).fill("Ada Lovelace");
  await page.getByLabel("Email", { exact: true }).fill("ada@example.com");
  await page.getByLabel("Message", { exact: true }).fill("Hello, I would like to talk about an internship.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Too many messages.")).toBeVisible();
});