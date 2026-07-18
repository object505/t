'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, StatCard } from "@/components/tools/ToolUI";

export default function SentenceCounter() {
  const [text, setText] = useState("");
  const count = useMemo(() => {
    if (!text.trim()) return 0;
    return (text.match(/[^.!?]+[.!?]+/g) || [text.trim()]).length;
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Type or paste text…" ariaLabel="Text input" />
      <StatCard label="Sentences" value={count} />
    </div>
  );
}
