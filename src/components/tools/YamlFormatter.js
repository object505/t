'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function YamlFormatter() {
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    const lines = input.split("\n");
    const errors = [];
    let lastIndent = -1;
    lines.forEach((line, i) => {
      if (!line.trim() || line.trim().startsWith("#")) return;
      const indent = line.length - line.trimStart().length;
      if (line.trim().includes(":") && !line.trim().startsWith("-")) {
        if (indent > lastIndent + 2 && lastIndent >= 0) errors.push(`Line ${i + 1}: unexpected indentation`);
        lastIndent = indent;
      }
    });
    return errors.length ? `Issues found:\n${errors.join("\n")}` : "YAML structure looks valid ✓\n\n" + input.trim();
  }, [input]);

  return (
    <div className="space-y-3">
      <ToolTextarea value={input} onChange={setInput} placeholder={"key: value\nlist:\n  - item1\n  - item2"} ariaLabel="YAML input" rows={6} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "Validation output…"}</pre>
        {output && <CopyButton value={output} />}
      </div>
    </div>
  );
}
