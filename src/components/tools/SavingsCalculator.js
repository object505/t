'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function SavingsCalculator() {
  const [goal, setGoal] = useState("10000");
  const [current, setCurrent] = useState("2000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("2");

  const result = useMemo(() => {
    const g = parseFloat(goal), c = parseFloat(current), m = parseFloat(monthly), r = parseFloat(rate) / 100 / 12;
    if (!g || !c || !m) return null;
    let balance = c, months = 0;
    while (balance < g && months < 1200) { balance = balance * (1 + r) + m; months++; }
    if (months >= 1200) return { months: null, years: null };
    return { months, years: (months / 12).toFixed(1) };
  }, [goal, current, monthly, rate]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Savings goal ($)" value={goal} onChange={(e) => setGoal(e.target.value)} />
        <ToolInput type="number" label="Current savings ($)" value={current} onChange={(e) => setCurrent(e.target.value)} />
        <ToolInput type="number" label="Monthly deposit ($)" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        <ToolInput type="number" label="Interest rate (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      {result && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="text-sm text-slate-500">You'll reach your goal in</div>
          <div className="font-mono text-3xl font-bold text-primary">{result.years} years</div>
          <div className="text-sm text-slate-500">{result.months} months</div>
        </div>
      )}
    </div>
  );
}
