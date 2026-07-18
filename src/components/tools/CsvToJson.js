'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [delimiter, setDelimiter] = useState(",");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const lines = input.trim().split("\n");
      const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^["']|["']$/g, ""));
      const rows = lines.slice(1).map((line) => {
        const values = line.split(delimiter).map((v) => v.trim().replace(/^["']|["']$/g, ""));
        return Object.fromEntries(headers.map((h, i) => [h, values[i] || ""]));
      });
      return JSON.stringify(rows, null, 2);
    } catch (e) {
      return "Error: " + e.message;
    }
  }, [input, delimiter]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[(",", "Comma"), ("\t", "Tab"), (";", "Semicolon")].map(([d, l]) => (
          <button key={l} onClick={() => setDelimiter(d)} className={`rounded-lg border px-3 py-1 text-xs font-medium ${delimiter === d ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{l}</button>
        ))}
      </div>
      <ToolTextarea value={input} onChange={setInput} placeholder={"name,age,city\nJohn,30,NYC\nJane,25,LA"} ariaLabel="CSV input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "JSON output…"}</pre>
        {output && !output.startsWith("Error") && <CopyButton value={output} />}
      </div>
    </div>
  );
}
