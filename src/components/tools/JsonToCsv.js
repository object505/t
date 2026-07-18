'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function JsonToCsv() {
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const data = JSON.parse(input);
      const arr = Array.isArray(data) ? data : [data];
      if (arr.length === 0) return "";
      const headers = Object.keys(arr[0]);
      const lines = [headers.join(",")];
      arr.forEach((row) => {
        lines.push(headers.map((h) => {
          const val = String(row[h] ?? "");
          return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
        }).join(","));
      });
      return lines.join("\n");
    } catch (e) {
      return "Error: " + e.message;
    }
  }, [input]);

  return (
    <div className="space-y-3">
      <ToolTextarea value={input} onChange={setInput} placeholder={'[{"name":"John","age":30}]'} ariaLabel="JSON input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "CSV output…"}</pre>
        {output && !output.startsWith("Error") && <CopyButton value={output} />}
      </div>
    </div>
  );
}
