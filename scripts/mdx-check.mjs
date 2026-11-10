import fs from "node:fs";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const files = ["content/projects/gridpinn.mdx", "content/blog/physics-in-the-loss.mdx"];

for (const f of files) {
  let src = fs.readFileSync(f, "utf8");
  src = src.replace(/^---[\s\S]*?---\s*/, ""); // strip blog frontmatter
  for (const [label, plugins] of [["no math plugin", [remarkGfm]], ["with remark-math", [remarkGfm, remarkMath]]]) {
    try {
      await serialize(src, { mdxOptions: { remarkPlugins: plugins } });
      console.log(`${f} | ${label}: OK`);
    } catch (e) {
      console.log(`${f} | ${label}: FAIL`);
      console.log("   ", e.message.split("\n")[0], e.line ? `(line ${e.line}, col ${e.column})` : "");
    }
  }
}