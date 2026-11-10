"use client";

import { useEffect } from "react";
import Button from "../components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-muted">The page failed to load. You can try again.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="outline">Home</Button>
      </div>
    </section>
  );
}