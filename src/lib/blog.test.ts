// @vitest-environment node
import { describe, expect, it } from "vitest";
import { formatDate, getPost, getRelated, type Post } from "./blog";

const make = (slug: string, category: string, tags: string[]): Post => ({
  slug, title: slug, description: "", date: "2026-01-01", category, tags,
  draft: false, readingMinutes: 1, content: "", headings: [],
});

describe("formatDate", () => {
  it("formats a plain date", () => {
    expect(formatDate("2026-11-10")).toBe("10 Nov 2026");
  });
});

describe("getRelated", () => {
  const current = make("current", "Deep Learning", ["PINN"]);
  const sameCategory = make("same-category", "Deep Learning", []);
  const sameTag = make("same-tag", "Other", ["PINN"]);
  const unrelated = make("unrelated", "Other", []);
  const all = [current, sameCategory, sameTag, unrelated];

  it("excludes the current post and unrelated posts", () => {
    expect(getRelated(current, all).map((p) => p.slug)).toEqual(["same-category", "same-tag"]);
  });

  it("respects the limit", () => {
    expect(getRelated(current, all, 1).map((p) => p.slug)).toEqual(["same-category"]);
  });
});

describe("getPost", () => {
  it("loads the sample post with a table of contents", async () => {
    const post = await getPost("physics-in-the-loss");
    expect(post).not.toBeNull();
    expect(post!.headings.length).toBeGreaterThan(1);
  });

  it("rejects path traversal and unknown slugs", async () => {
    expect(await getPost("../package")).toBeNull();
    expect(await getPost("does-not-exist")).toBeNull();
  });
});