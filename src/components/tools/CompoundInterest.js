'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");
  const [freq, setFreq] = useState("12");

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(freq);
    const t = parseFloat(years);
    if (!p || !r || !t) return null;
    const total = p * Math.pow(1 + r / n, n * t);
    const interest = total - p;
    return { total: total.toFixed(2), interest: interest.toFixed(2) };
  }, [principal, rate, years, freq]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Principal ($)" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <ToolInput type="number" label="Annual rate (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
        <ToolInput type="number" label="Years" value={years} onChange={(e) => setYears(e.target.value)} />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-muted-foreground">Compounding</label>
          <select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center"><div className="font-mono text-2xl font-bold text-primary">${result.interest}</div><div className="text-xs text-slate-500">Interest earned</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center"><div className="font-mono text-2xl font-bold text-primary">${result.total}</div><div className="text-xs text-slate-500">Total value</div></div>
        </div>
      )}
    </div>
  );
}
