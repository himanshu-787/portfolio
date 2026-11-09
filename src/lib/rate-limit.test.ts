import { afterEach, describe, expect, it, vi } from "vitest";
import { isRateLimited } from "./rate-limit";

afterEach(() => vi.useRealTimers());

describe("isRateLimited", () => {
  it("allows up to max, then blocks", () => {
    for (let i = 0; i < 3; i++) expect(isRateLimited("a", 3, 1000)).toBe(false);
    expect(isRateLimited("a", 3, 1000)).toBe(true);
  });

  it("tracks keys independently", () => {
    for (let i = 0; i < 2; i++) isRateLimited("b", 2, 1000);
    expect(isRateLimited("b", 2, 1000)).toBe(true);
    expect(isRateLimited("c", 2, 1000)).toBe(false);
  });

  it("allows again after the window passes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    isRateLimited("d", 2, 1000);
    isRateLimited("d", 2, 1000);
    expect(isRateLimited("d", 2, 1000)).toBe(true);
    vi.setSystemTime(new Date("2026-01-01T00:00:01.5Z"));
    expect(isRateLimited("d", 2, 1000)).toBe(false);
  });
});