'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("20");

  const result = useMemo(() => {
    const p = parseFloat(initial), m = parseFloat(monthly), r = parseFloat(rate) / 100 / 12, n = parseFloat(years) * 12;
    if (isNaN(p)) return null;
    const fvP = p * Math.pow(1 + r, n);
    const fvM = r > 0 ? m * ((Math.pow(1 + r, n) - 1) / r) : m * n;
    const total = fvP + fvM;
    const invested = p + m * n;
    return { total: total.toFixed(2), invested: invested.toFixed(2), earnings: (total - invested).toFixed(2) };
  }, [initial, monthly, rate, years]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Initial investment ($)" value={initial} onChange={(e) => setInitial(e.target.value)} />
        <ToolInput type="number" label="Monthly contribution ($)" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        <ToolInput type="number" label="Annual return (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
        <ToolInput type="number" label="Years" value={years} onChange={(e) => setYears(e.target.value)} />
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-slate-700">${result.invested}</div><div className="text-xs text-slate-500">Invested</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-green-600">${result.earnings}</div><div className="text-xs text-slate-500">Earnings</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.total}</div><div className="text-xs text-slate-500">Total</div></div>
        </div>
      )}
    </div>
  );
}
