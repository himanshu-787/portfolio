// @vitest-environment node
import { describe, expect, it } from "vitest";
import { retrieve, tokenize } from "./retrieve";

describe("tokenize", () => {
  it("lowercases and drops stopwords", () => {
    expect(tokenize("What is GridPINN?")).toEqual(["gridpinn"]);
  });

  it("stems simple plurals", () => {
    expect(tokenize("Which projects?")).toEqual(["project"]);
  });

  it("returns nothing for stopword-only input", () => {
    expect(tokenize("what is the")).toEqual([]);
  });
});

describe("retrieve", () => {
  it("finds the GridPINN page", async () => {
    const hits = await retrieve("What is GridPINN?");
    expect(hits.map((h) => h.chunk.url)).toContain("/projects/gridpinn");
  });

  it("finds federated learning projects", async () => {
    const urls = (await retrieve("Which federated learning projects has he built?")).map((h) => h.chunk.url);
    expect(urls.some((u) => u.startsWith("/projects/federated"))).toBe(true);
  });

  it("returns nothing for off-topic questions", async () => {
    expect(await retrieve("What is the capital of France?")).toEqual([]);
    expect(await retrieve("How do I bake bread?")).toEqual([]);
  });

  it("returns nothing for an empty query", async () => {
    expect(await retrieve("   ")).toEqual([]);
  });
});