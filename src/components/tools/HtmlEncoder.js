'use client'
import { useState } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function HtmlEncoder() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode");

  const encode = (t) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const decode = (t) => {
    const el = document.createElement("textarea");
    el.innerHTML = t;
    return el.value;
  };

  const result = mode === "encode" ? encode(text) : decode(text);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["encode", "Encode"], ["decode", "Decode"]].map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${mode === m ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{label}</button>
        ))}
      </div>
      <ToolTextarea value={text} onChange={setText} placeholder={mode === "encode" ? "Enter HTML to encode…" : "Enter entities to decode…"} ariaLabel="HTML input" />
      <div className="flex items-start justify-between gap-2">
        <div className="min-h-[80px] flex-1 rounded-lg border border-border bg-slate-50 p-3 font-mono text-sm text-slate-800 break-all">{result || "Result appears here"}</div>
        <CopyButton value={result} />
      </div>
    </div>
  );
}
