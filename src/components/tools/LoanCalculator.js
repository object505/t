'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("250000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("30");

  const result = useMemo(() => {
    const p = parseFloat(amount), r = parseFloat(rate) / 100 / 12, n = parseFloat(years) * 12;
    if (!p || !r || !n) return null;
    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - p;
    return { monthly: monthly.toFixed(2), total: total.toFixed(2), interest: interest.toFixed(2) };
  }, [amount, rate, years]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <ToolInput type="number" label="Loan amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <ToolInput type="number" label="Interest rate (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
        <ToolInput type="number" label="Term (years)" value={years} onChange={(e) => setYears(e.target.value)} />
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.monthly}</div><div className="text-xs text-slate-500">Monthly</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.total}</div><div className="text-xs text-slate-500">Total</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.interest}</div><div className="text-xs text-slate-500">Interest</div></div>
        </div>
      )}
    </div>
  );
}
