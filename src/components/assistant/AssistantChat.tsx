"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

type Source = { title: string; url: string };
type Turn = { question: string; answer: string; sources: Source[] };

const examples = [
  "What is GridPINN?",
  "Which federated learning projects has he built?",
  "What did he do as a teaching assistant?",
];

export default function AssistantChat() {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(q: string) {
    const text = q.trim();
    if (text.length < 3 || loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setTurns((t) => [{ question: text, answer: json.answer, sources: json.sources ?? [] }, ...t]);
        setQuestion("");
      } else {
        setError(json.error ?? "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(question);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="ask" className="sr-only">Your question</label>
        <input
          id="ask"
          value={question}
          maxLength={300}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about projects, skills or experience..."
          className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <Button type="submit" disabled={loading}>{loading ? "Thinking..." : "Ask"}</Button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((e) => (
          <button
            key={e}
            onClick={() => ask(e)}
            disabled={loading}
            className="rounded-full border border-line px-3 py-1 text-xs text-muted transition hover:border-accent hover:text-accent"
          >
            {e}
          </button>
        ))}
      </div>

      <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>

      <div className="mt-6 space-y-4">
        {turns.map((t, i) => (
          <div key={i} className="rounded-xl border border-line bg-surface p-5">
            <p className="font-mono text-xs text-accent">{t.question}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm">{t.answer}</p>
            {t.sources.length > 0 && (
              <p className="mt-3 text-xs text-muted">
                Sources:{" "}
                {t.sources.map((s, j) => (
                  <span key={s.url}>
                    {j > 0 && ", "}
                    <Link href={s.url} className="underline underline-offset-2 hover:text-fg">
                      {s.title}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}