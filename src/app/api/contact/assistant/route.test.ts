// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const create = vi.hoisted(() => vi.fn());
vi.mock("@anthropic-ai/sdk", () => ({
  default: class {
    messages = { create };
  },
}));

import { POST } from "./route";

let n = 0;
function ask(question: string) {
  n += 1;
  return new Request("http://localhost/api/assistant", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `10.1.0.${n}` },
    body: JSON.stringify({ question }),
  });
}

beforeEach(() => {
  create.mockReset();
  process.env.ANTHROPIC_API_KEY = "sk-test";
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("POST /api/assistant", () => {
  it("is unavailable without an API key", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    expect((await POST(ask("What is GridPINN?"))).status).toBe(503);
  });

  it("rejects too-short questions", async () => {
    expect((await POST(ask("hi"))).status).toBe(400);
  });

  it("answers off-topic questions without calling the LLM", async () => {
    const res = await POST(ask("What is the capital of France?"));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.answer).toContain("I don't have information");
    expect(create).not.toHaveBeenCalled();
  });

  it("calls the LLM for on-topic questions and returns retrieved sources", async () => {
    create.mockResolvedValue({
      content: [{ type: "text", text: "GridPINN is in progress." }],
      usage: { input_tokens: 10, output_tokens: 5 },
    });
    const res = await POST(ask("What is GridPINN?"));
    const json = await res.json();
    expect(json.answer).toBe("GridPINN is in progress.");
    expect(json.sources.map((s: { url: string }) => s.url)).toContain("/projects/gridpinn");
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0][0].messages[0].content).toContain("<context>");
  });

  it("returns a generic error if the LLM call fails", async () => {
    create.mockRejectedValue(new Error("boom"));
    const res = await POST(ask("What is GridPINN?"));
    expect(res.status).toBe(502);
  });
});