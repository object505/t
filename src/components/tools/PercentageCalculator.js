'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function PercentageCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const results = useMemo(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    const out = {};
    if (x && y) {
      out.pctOf = ((x / 100) * y).toFixed(2);
      out.xOfY = ((x / y) * 100).toFixed(2);
      out.increase = y > x ? (((y - x) / x) * 100).toFixed(2) : null;
    }
    return out;
  }, [a, b]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Value A" value={a} onChange={(e) => setA(e.target.value)} placeholder="50" />
        <ToolInput type="number" label="Value B" value={b} onChange={(e) => setB(e.target.value)} placeholder="200" />
      </div>
      {results.pctOf && (
        <div className="space-y-2 rounded-lg border border-border bg-slate-50 p-4 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">{a}% of {b}</span><span className="font-mono font-semibold text-slate-800">{results.pctOf}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">{a} is what % of {b}</span><span className="font-mono font-semibold text-slate-800">{results.xOfY}%</span></div>
          {results.increase && <div className="flex justify-between"><span className="text-slate-500">Increase A→B</span><span className="font-mono font-semibold text-green-600">+{results.increase}%</span></div>}
        </div>
      )}
    </div>
  );
}
