'use client'
import { useState, useMemo } from "react";
import { ToolTextarea } from "@/components/tools/ToolUI";

export default function TextDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const diff = useMemo(() => {
    if (!left && !right) return [];
    const l = left.split("\n"), r = right.split("\n");
    const max = Math.max(l.length, r.length);
    const rows = [];
    for (let i = 0; i < max; i++) {
      const a = l[i] ?? "", b = r[i] ?? "";
      if (a === b) rows.push({ type: "same", text: a, line: i + 1 });
      else {
        if (a) rows.push({ type: "del", text: a, line: i + 1 });
        if (b) rows.push({ type: "add", text: b, line: i + 1 });
      }
    }
    return rows;
  }, [left, right]);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-muted-foreground">Original</label><ToolTextarea value={left} onChange={setLeft} placeholder="Original text…" ariaLabel="Original" rows={6} /></div>
        <div><label className="mb-1 block text-sm font-medium text-muted-foreground">Modified</label><ToolTextarea value={right} onChange={setRight} placeholder="Modified text…" ariaLabel="Modified" rows={6} /></div>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="border-b border-border bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">Differences</div>
        <div className="max-h-80 overflow-auto font-mono text-sm scrollbar-thin">
          {diff.length === 0 ? <div className="px-3 py-4 text-center text-slate-400">No differences</div> : diff.map((row, i) => (
            <div key={i} className={`flex gap-2 px-3 py-0.5 ${row.type === "add" ? "bg-green-50 text-green-700" : row.type === "del" ? "bg-red-50 text-red-700" : ""}`}>
              <span className="shrink-0 text-slate-300">{row.type === "add" ? "+" : row.type === "del" ? "-" : " "}</span>
              <span className="whitespace-pre-wrap break-all">{row.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
