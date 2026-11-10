"use client";

import { useEffect, useRef, useState } from "react";
// import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { contactSchema } from "@/lib/contact-schema";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const startedAt = useRef(0);

useEffect(() => {
  startedAt.current = Date.now(); // runs once after mount, not during render
}, []);
  // const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const payload = { ...data, startedAt: startedAt.current };

    const check = contactSchema.safeParse(payload);
    if (!check.success) {
      const fields: Record<string, string> = {};
      for (const issue of check.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fields[key]) fields[key] = issue.message;
      }
      setErrors(fields);
      return;
    }

    setErrors({});
    setStatus("sending");
    setNotice("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      setErrors(json.fields ?? {});
      setNotice(json.error ?? "Something went wrong.");
      setStatus("error");
    } catch {
      setNotice("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-accent/40 bg-surface p-6">
        <p className="font-semibold">Message sent.</p>
        <p className="mt-1 text-sm text-muted">Thank you. I will reply to the email you provided.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm">Name</label>
        <input id="name" name="name" autoComplete="name" className={inputClass}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        {errors.name && <p id="name-err" className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        {errors.email && <p id="email-err" className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-sm">Message</label>
        <textarea id="message" name="message" rows={6} className={inputClass}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        {errors.message && <p id="message-err" className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people and screen readers; bots fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send message"}
        </Button>
        <p role="alert" className="text-sm text-red-400">{notice}</p>
      </div>
    </form>
  );
}