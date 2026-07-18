'use client'
import { useState } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

export default function RandomNumber() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState(1);
  const [result, setResult] = useState([]);

  const generate = () => {
    const lo = parseInt(min), hi = parseInt(max);
    if (isNaN(lo) || isNaN(hi) || lo > hi) { setResult([]); return; }
    const arr = Array.from({ length: count }, () => lo + Math.floor(Math.random() * (hi - lo + 1)));
    setResult(arr);
  };

  const output = result.join(", ");

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <ToolInput type="number" label="Min" value={min} onChange={(e) => setMin(e.target.value)} />
        <ToolInput type="number" label="Max" value={max} onChange={(e) => setMax(e.target.value)} />
        <ToolInput type="number" label="Count" value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, +e.target.value)))} />
      </div>
      <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
        <RefreshCw className="h-4 w-4" /> Generate
      </button>
      {result.length > 0 && (
        <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-50 p-4">
          <code className="font-mono text-lg text-slate-800 break-all">{output}</code>
          <CopyButton value={output} />
        </div>
      )}
    </div>
  );
}
