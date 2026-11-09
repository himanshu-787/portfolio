import { getChunks, type Chunk } from "./knowledge";

const STOP = new Set(
  "a an and are as at be by can did do does for from has have he her him his how i in is it its me of on or she tell that the their them they this to was what when where which who whom why with would you your about".split(" ")
);

export function tokenize(s: string): string[] {
  return (s.toLowerCase().match(/[a-z0-9]+/g) ?? [])
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map((t) => (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t));
}

type Doc = { chunk: Chunk; tf: Map<string, number>; len: number };
type Index = { docs: Doc[]; df: Map<string, number>; avg: number };

let index: Index | null = null;

async function getIndex(): Promise<Index> {
  if (index) return index;
  const chunks = await getChunks();
  const df = new Map<string, number>();
  const docs: Doc[] = chunks.map((chunk) => {
    // The title is counted twice so title matches rank higher.
    const tokens = tokenize(`${chunk.title} ${chunk.title} ${chunk.text}`);
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    for (const t of tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
    return { chunk, tf, len: tokens.length };
  });
  const avg = docs.reduce((n, d) => n + d.len, 0) / Math.max(1, docs.length);
  index = { docs, df, avg };
  return index;
}

export type Hit = { chunk: Chunk; score: number };

// minScore gates the LLM call: below it, the question is treated as out of scope.
// It is a starting value. Tune it with scripts/eval-retrieval.ts.
export async function retrieve(query: string, k = 4, minScore = 1.0): Promise<Hit[]> {
  const { docs, df, avg } = await getIndex();
  const q = Array.from(new Set(tokenize(query)));
  if (q.length === 0) return [];

  const N = docs.length;
  const k1 = 1.5;
  const b = 0.75;

  return docs
    .map((d) => {
      let score = 0;
      for (const t of q) {
        const f = d.tf.get(t);
        if (!f) continue;
        const n = df.get(t) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avg)));
      }
      return { chunk: d.chunk, score };
    })
    .filter((h) => h.score >= minScore)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, k);
}