'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function HtmlMinifier() {
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    if (!input.trim()) return "";
    return input
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
      .replace(/\s+>/g, ">")
      .replace(/<\s+/g, "<")
      .trim();
  }, [input]);
  const saved = input && output ? Math.max(0, input.length - output.length) : 0;

  return (
    <div className="space-y-3">
      <ToolTextarea value={input} onChange={setInput} placeholder="<div>\n  <p>Hello</p>\n</div>" ariaLabel="HTML input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "Minified output…"}</pre>
        {output && <CopyButton value={output} />}
      </div>
      {saved > 0 && <div className="text-xs text-slate-400">Saved {saved} bytes ({Math.round((saved / input.length) * 100)}%)</div>}
    </div>
  );
}
