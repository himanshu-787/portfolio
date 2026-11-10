import { expect, test } from "@playwright/test";

test.beforeEach(({ isMobile }) => test.skip(isMobile, "desktop project only"));

test("robots.txt blocks /api and points to the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain("Disallow: /api/");
  expect(body).toContain("Sitemap:");
});

test("sitemap lists pages, projects and posts", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const body = await res.text();
  for (const path of ["/about", "/projects/gridpinn", "/blog/physics-in-the-loss"]) {
    expect(body).toContain(path);
  }
});

for (const path of ["/", "/about", "/projects/gridpinn", "/blog/physics-in-the-loss"]) {
  test(`${path} has title, description, canonical and Open Graph image`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    const expected = path === "/" ? /(:\d+)?\/?$/ : new RegExp(`${path}$`);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expected);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /.+/);
  });
}

test("the Open Graph image is served as a PNG", async ({ page, request }) => {
  await page.goto("/");
  const content = await page.locator('meta[property="og:image"]').getAttribute("content");
  const u = new URL(content!);
  const res = await request.get(u.pathname + u.search);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test("home page has valid Person JSON-LD", async ({ page }) => {
  await page.goto("/");
  const json = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(json!);
  expect(data["@type"]).toBe("Person");
  expect(data.name).toBe("Himanshu Yadav");
});

test("blog post has BlogPosting JSON-LD", async ({ page }) => {
  await page.goto("/blog/physics-in-the-loss");
  const json = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(JSON.parse(json!)["@type"]).toBe("BlogPosting");
});

test("security headers are present", async ({ request }) => {
  const res = await request.get("/");
  expect(res.headers()["x-content-type-options"]).toBe("nosniff");
  expect(res.headers()["x-powered-by"]).toBeUndefined();
});