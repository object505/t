'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function InflationCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("10");

  const result = useMemo(() => {
    const a = parseFloat(amount), r = parseFloat(rate) / 100, y = parseFloat(years);
    if (!a || !r || !y) return null;
    const future = a * Math.pow(1 + r, y);
    const lost = future - a;
    return { future: future.toFixed(2), lost: lost.toFixed(2) };
  }, [amount, rate, years]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <ToolInput type="number" label="Current amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <ToolInput type="number" label="Inflation rate (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
        <ToolInput type="number" label="Years" value={years} onChange={(e) => setYears(e.target.value)} />
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center"><div className="font-mono text-2xl font-bold text-red-500">${result.lost}</div><div className="text-xs text-slate-500">Purchasing power lost</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center"><div className="font-mono text-2xl font-bold text-primary">${result.future}</div><div className="text-xs text-slate-500">Equivalent future cost</div></div>
        </div>
      )}
    </div>
  );
}
