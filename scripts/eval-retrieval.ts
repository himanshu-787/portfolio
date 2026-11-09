import { retrieve } from "@/lib/assistant/retrieve";

type Case = { q: string; expect: string[] | null }; // null = must retrieve nothing

const cases: Case[] = [
  { q: "What is GridPINN?", expect: ["/projects/gridpinn"] },
  { q: "Which federated learning projects has he built?", expect: ["/projects/federated-healthcare", "/projects/federated-video-analytics"] },
  { q: "What are his TinyML results?", expect: ["/projects/tinyml-lstm"] },
  { q: "Which drug dataset did he use?", expect: ["/projects/drug-side-effects"] },
  { q: "Where is he a student?", expect: ["/about"] },
  { q: "Which deep learning frameworks does he know?", expect: ["/skills"] },
  { q: "What did he do as a teaching assistant?", expect: ["/experience"] },
  { q: "What scholarship did he receive?", expect: ["/experience"] },
  { q: "How can I contact him?", expect: ["/contact"] },
  { q: "What is the capital of France?", expect: null },
  { q: "How do I bake bread?", expect: null },
];

async function main() {
  let passed = 0;
  for (const c of cases) {
    const hits = await retrieve(c.q);
    const urls = hits.map((h) => h.chunk.url);
    const good = c.expect === null ? hits.length === 0 : c.expect.some((u) => urls.includes(u));
    if (good) passed++;
    console.log(
      `${good ? "PASS" : "FAIL"}  ${c.q}\n      -> ${hits.map((h) => `${h.chunk.url} (${h.score.toFixed(2)})`).join(", ") || "nothing retrieved"}`
    );
  }
  console.log(`\n${passed}/${cases.length} passed`);
  if (passed < cases.length) process.exit(1);
}

main();