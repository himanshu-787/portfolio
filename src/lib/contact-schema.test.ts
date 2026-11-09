import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const valid = { name: "Ada Lovelace", email: "ada@example.com", message: "Hello, I would like to talk." };

describe("contactSchema", () => {
  it("accepts a valid message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("trims whitespace", () => {
    const r = contactSchema.parse({ ...valid, name: "  Ada  " });
    expect(r.name).toBe("Ada");
  });

  it("rejects a short name", () => {
    expect(contactSchema.safeParse({ ...valid, name: "A" }).success).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects a too-short message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "short" }).success).toBe(false);
  });

  it("rejects a too-long message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(2001) }).success).toBe(false);
  });

  it("allows the honeypot and timing fields to be absent", () => {
    const r = contactSchema.parse(valid);
    expect(r.website).toBeUndefined();
    expect(r.startedAt).toBeUndefined();
  });
});