'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function RemoveDuplicateLines() {
  const [text, setText] = useState("");
  const [trim, setTrim] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(true);

  const result = useMemo(() => {
    const lines = text.split("\n");
    const seen = new Set();
    return lines
      .filter((line) => {
        const key = trim ? line.trim() : line;
        const cmp = caseSensitive ? key : key.toLowerCase();
        if (seen.has(cmp)) return false;
        seen.add(cmp);
        return true;
      })
      .join("\n");
  }, [text, trim, caseSensitive]);

  const removed = text.split("\n").length - result.split("\n").length;

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Paste lines with duplicates…" ariaLabel="Input lines" />
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2 text-muted-foreground">
          <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} className="accent-primary" />
          Trim whitespace
        </label>
        <label className="flex items-center gap-2 text-muted-foreground">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="accent-primary" />
          Case sensitive
        </label>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-h-[80px] flex-1 rounded-lg border border-border bg-slate-50 p-3 font-mono text-sm text-slate-800 whitespace-pre-wrap break-words">
          {result || "Unique lines appear here"}
        </div>
        <CopyButton value={result} />
      </div>
      <p className="text-xs text-slate-400">{removed} duplicate line{removed !== 1 ? "s" : ""} removed.</p>
    </div>
  );
}
