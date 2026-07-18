'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function ReverseText() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("chars");

  const result = useMemo(() => {
    if (mode === "chars") return text.split("").reverse().join("");
    if (mode === "words") return text.split(/(\s+)/).reverse().join("");
    return text.split("\n").reverse().join("\n");
  }, [text, mode]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Type or paste text…" ariaLabel="Text input" />
      <div className="flex gap-2">
        {[["chars", "Characters"], ["words", "Words"], ["lines", "Lines"]].map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${mode === m ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-h-[80px] flex-1 rounded-lg border border-border bg-slate-50 p-3 font-mono text-sm text-slate-800 whitespace-pre-wrap break-words">
          {result || "Reversed text appears here"}
        </div>
        <CopyButton value={result} />
      </div>
    </div>
  );
}
