'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

export default function FibonacciGenerator() {
  const [count, setCount] = useState(15);

  const sequence = (() => {
    const n = Math.max(0, Math.min(1000, count));
    const seq = [];
    let a = 0n, b = 1n;
    for (let i = 0; i < n; i++) {
      seq.push(a);
      [a, b] = [b, a + b];
    }
    return seq;
  })();

  const formatted = sequence.map((n) => n.toString()).join(", ");

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-muted-foreground">How many numbers: {count}</label>
        <input
          type="range"
          min="1"
          max="1000"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
        <span className="text-xs text-slate-400">Copy as comma-separated list</span>
        <CopyButton value={formatted} label="" />
      </div>

      <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-slate-50 p-4 overflow-x-scroll overflow-y-hidden">
        {sequence.map((n, i) => (
          <span key={i} className="rounded-md bg-white px-2.5 py-1 font-mono text-sm font-medium text-slate-700 shadow-sm">
            {n.toString()}
          </span>
        ))}
      </div>
    </div>
  );
}
