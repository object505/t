'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

export default function RandomDateGenerator() {
  const [start, setStart] = useState("2000-01-01");
  const [end, setEnd] = useState("2025-12-31");
  const [result, setResult] = useState("");

  const generate = () => {
    const s = new Date(start).getTime(), e = new Date(end).getTime();
    if (isNaN(s) || isNaN(e) || s > e) { setResult("Invalid range"); return; }
    const r = new Date(s + Math.random() * (e - s));
    setResult(r.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="text-sm font-medium text-muted-foreground">Start date</label><input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
        <div><label className="text-sm font-medium text-muted-foreground">End date</label><input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
      </div>
      <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Generate</button>
      {result && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-4">
          <span className="text-lg font-medium text-slate-800">{result}</span>
          <CopyButton value={result} />
        </div>
      )}
    </div>
  );
}
