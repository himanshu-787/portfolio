import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "Himanshu Yadav | AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0c10",
          color: "#e8eaf0",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#5eead4" }}>hy.</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 24 }}>{site.name}</div>
        <div style={{ display: "flex", fontSize: 34, color: "#98a1b3", marginTop: 20 }}>
          AI/ML Engineer | Applied AI Researcher
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#98a1b3", marginTop: 40 }}>
          Deep learning · Federated learning · LLM agents
        </div>
      </div>
    ),
    { ...size }
  );
}