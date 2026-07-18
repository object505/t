'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function RetirementCalculator() {
  const [age, setAge] = useState("30");
  const [retireAge, setRetireAge] = useState("65");
  const [current, setCurrent] = useState("50000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");

  const result = useMemo(() => {
    const a = parseInt(age), ra = parseInt(retireAge), c = parseFloat(current), m = parseFloat(monthly), r = parseFloat(rate) / 100 / 12;
    if (a >= ra) return null;
    const n = (ra - a) * 12;
    const fvC = c * Math.pow(1 + r, n);
    const fvM = r > 0 ? m * ((Math.pow(1 + r, n) - 1) / r) : m * n;
    const total = fvC + fvM;
    return { total: total.toFixed(0), years: ra - a };
  }, [age, retireAge, current, monthly, rate]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Current age" value={age} onChange={(e) => setAge(e.target.value)} />
        <ToolInput type="number" label="Retirement age" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} />
        <ToolInput type="number" label="Current savings ($)" value={current} onChange={(e) => setCurrent(e.target.value)} />
        <ToolInput type="number" label="Monthly contribution ($)" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        <ToolInput type="number" label="Annual return (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      {result && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="text-sm text-slate-500">In {result.years} years {`you'll`} have</div>
          <div className="font-mono text-3xl font-bold text-primary">${Number(result.total).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
