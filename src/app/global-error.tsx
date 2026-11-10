"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0c10", color: "#e8eaf0", fontFamily: "system-ui", padding: "4rem", textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <button onClick={reset} style={{ marginTop: 16, padding: "8px 16px" }}>Try again</button>
      </body>
    </html>
  );
}