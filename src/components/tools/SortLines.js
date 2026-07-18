'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function SortLines() {
  const [text, setText] = useState("");
  const [desc, setDesc] = useState(false);

  const result = useMemo(() => {
    const lines = text.split("\n");
    lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    if (desc) lines.reverse();
    return lines.join("\n");
  }, [text, desc]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Paste lines to sort…" ariaLabel="Input lines" />
      <div className="flex gap-2">
        <button
          onClick={() => setDesc(false)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${!desc ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}
        >
          A → Z
        </button>
        <button
          onClick={() => setDesc(true)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${desc ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}
        >
          Z → A
        </button>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-h-[80px] flex-1 rounded-lg border border-border bg-slate-50 p-3 font-mono text-sm text-slate-800 whitespace-pre-wrap break-words">
          {result || "Sorted lines appear here"}
        </div>
        <CopyButton value={result} />
      </div>
    </div>
  );
}
