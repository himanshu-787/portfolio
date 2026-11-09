import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

const fail = (error: string, status: number, fields?: Record<string, string>) =>
  NextResponse.json({ ok: false, error, fields }, { status });

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return true; // non-browser clients are covered by the other checks
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("Forbidden.", 403);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return fail("Too many messages. Please try again in a few minutes.", 429);
  }

  const text = await req.text();
  if (text.length > 10_000) return fail("Request too large.", 413);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return fail("Invalid request.", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fields[key]) fields[key] = issue.message;
    }
    return fail("Please check the form.", 400, fields);
  }

  const { name, email, message, website, startedAt } = parsed.data;

  // Spam traps: pretend success so bots learn nothing.
  if (website) return NextResponse.json({ ok: true });
  if (startedAt && Date.now() - startedAt < 2000) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return fail("Message could not be sent right now.", 500);
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio contact: ${name.replace(/[\r\n]+/g, " ")}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`, // plain text, so no HTML injection
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return fail("Message could not be sent right now.", 502);
  }

  return NextResponse.json({ ok: true });
}