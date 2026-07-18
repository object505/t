'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, StatCard } from "@/components/tools/ToolUI";

export default function LetterCounter() {
  const [text, setText] = useState("");
  const letters = useMemo(() => (text.match(/[a-zA-Z]/g) || []).length, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Type or paste text…" ariaLabel="Text input" />
      <div className="grid grid-cols-1 gap-3">
        <StatCard label="Letters Only" value={letters} />
      </div>
    </div>
  );
}
