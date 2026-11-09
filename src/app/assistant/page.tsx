import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import AssistantChat from "@/components/assistant/AssistantChat";

export const metadata: Metadata = { title: "Assistant" };

export default function AssistantPage() {
  return (
    <>
      <PageHeader
        eyebrow="Assistant"
        title="Ask about my work"
        text="Answers are generated only from the content of this site, with links to the pages used. It can make mistakes, so check the sources."
      />
      <div className="mx-auto max-w-3xl px-6 py-8">
        <AssistantChat />
      </div>
    </>
  );
}