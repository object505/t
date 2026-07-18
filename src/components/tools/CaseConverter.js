'use client'
import { useState } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

const variants = [
  { label: "UPPERCASE", fn: (t) => t.toUpperCase() },
  { label: "lowercase", fn: (t) => t.toLowerCase() },
  { label: "Title Case", fn: (t) => t.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()) },
  { label: "Sentence case", fn: (t) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()) },
  { label: "camelCase", fn: (t) => t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
  { label: "snake_case", fn: (t) => t.trim().toLowerCase().replace(/\s+/g, "_") },
  { label: "kebab-case", fn: (t) => t.trim().toLowerCase().replace(/\s+/g, "-") },
  { label: "aLtErNaTiNg", fn: (t) => t.split("").map((c, i) => (i % 2 ? c.toUpperCase() : c.toLowerCase())).join("") },
];

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [active, setActive] = useState(0);
  const result = variants[active].fn(text);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Type or paste text…" ariaLabel="Text input" />
      <div className="flex flex-wrap gap-2">
        {variants.map((v, i) => (
          <button
            key={v.label}
            onClick={() => setActive(i)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              active === i
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-muted-foreground hover:border-primary/30"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-h-[80px] flex-1 rounded-lg border border-border bg-slate-50 p-3 font-mono text-sm text-slate-800 whitespace-pre-wrap break-words">
          {result || "Result appears here"}
        </div>
        <CopyButton value={result} />
      </div>
    </div>
  );
}
