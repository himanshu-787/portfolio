import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/", "/about", "/skills", "/projects", "/projects/gridpinn", "/research",
  "/experience", "/blog", "/blog/physics-in-the-loss", "/resume", "/contact", "/assistant",
];

for (const path of paths) {
  test(`no serious accessibility violations on ${path}`, async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop project only");
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`);
    expect(serious).toEqual([]);
  });
}