// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { POST } from "./route";

let n = 0;
function req(body: unknown, headers: Record<string, string> = {}) {
  n += 1; // unique IP per request so the rate limiter never interferes
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `10.0.0.${n}`, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const valid = () => ({
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello, I would like to talk about an internship.",
  startedAt: Date.now() - 10_000,
});

beforeEach(() => {
  send.mockReset();
  send.mockResolvedValue({ error: null });
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_TO_EMAIL = "me@example.com";
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("POST /api/contact", () => {
  it("sends an email for a valid message", async () => {
    const res = await POST(req(valid()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0]).toMatchObject({ to: "me@example.com", replyTo: "ada@example.com" });
  });

  it("returns field errors for invalid input", async () => {
    const res = await POST(req({ ...valid(), name: "A" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.fields.name).toBeTruthy();
    expect(send).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const res = await POST(req({ ...valid(), website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("silently drops submissions filled in under 2 seconds", async () => {
    const res = await POST(req({ ...valid(), startedAt: Date.now() }));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const res = await POST(req("{not json"));
    expect(res.status).toBe(400);
  });

  it("rejects cross-origin requests", async () => {
    const res = await POST(req(valid(), { origin: "http://evil.example", host: "localhost" }));
    expect(res.status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });

  it("rate limits repeated requests from one IP", async () => {
    const headers = { "x-forwarded-for": "9.9.9.9" };
    let last = 0;
    for (let i = 0; i < 6; i++) last = (await POST(req(valid(), headers))).status;
    expect(last).toBe(429);
  });

  it("returns a generic error when the email provider fails", async () => {
    send.mockResolvedValue({ error: { message: "provider detail" } });
    const res = await POST(req(valid()));
    expect(res.status).toBe(502);
    expect(JSON.stringify(await res.json())).not.toContain("provider detail");
  });
});