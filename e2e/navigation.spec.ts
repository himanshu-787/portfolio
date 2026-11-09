import { expect, test } from "@playwright/test";

const routes: [string, string][] = [
  ["/", "Himanshu Yadav"],
  ["/about", "About me"],
  ["/skills", "Technical skills"],
  ["/projects", "Projects"],
  ["/projects/gridpinn", "GridPINN"],
  ["/research", "Research"],
  ["/experience", "Experience and achievements"],
  ["/blog", "Technical notes"],
  ["/blog/physics-in-the-loss", "Why put physics in the loss function?"],
  ["/resume", "Resume"],
  ["/contact", "Get in touch"],
  ["/assistant", "Ask about my work"],
];

for (const [path, heading] of routes) {
  test(`${path} loads with its heading`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBeLessThan(400);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  });
}

test("unknown route returns 404", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
});

test("every internal link on the home page resolves", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.$$eval('a[href^="/"]', (as) =>
    Array.from(new Set(as.map((a) => (a as HTMLAnchorElement).getAttribute("href") as string)))
  );
  expect(hrefs.length).toBeGreaterThan(5);
  for (const href of hrefs) {
    const res = await request.get(href);
    expect(res.status(), `broken link: ${href}`).toBeLessThan(400);
  }
});

test("external links open safely", async ({ page }) => {
  await page.goto("/");
  const rels = await page.$$eval('a[target="_blank"]', (as) => as.map((a) => a.getAttribute("rel") ?? ""));
  expect(rels.length).toBeGreaterThan(0);
  for (const rel of rels) expect(rel).toContain("noopener");
});