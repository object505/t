'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function InstagramCaptionFormatter() {
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return input.split("\n").map((line) => line.trim()).join("\n.\n");
  }, [input]);

  return (
    <div className="space-y-3">
      <ToolTextarea value={input} onChange={setInput} placeholder="Type your caption… (the tool adds invisible dots between lines to preserve spacing)" ariaLabel="Caption input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "Formatted caption…"}</pre>
        {output && <CopyButton value={output} />}
      </div>
    </div>
  );
}
