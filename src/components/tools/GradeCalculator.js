'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function GradeCalculator() {
  const [current, setCurrent] = useState("85");
  const [target, setTarget] = useState("90");
  const [final, setFinal] = useState("30");

  const result = useMemo(() => {
    const c = parseFloat(current), t = parseFloat(target), f = parseFloat(final) / 100;
    if (isNaN(c) || isNaN(t) || isNaN(f) || f === 0) return null;
    const need = (t - c * (1 - f)) / f;
    return need.toFixed(1);
  }, [current, target, final]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <ToolInput type="number" label="Current grade (%)" value={current} onChange={(e) => setCurrent(e.target.value)} />
        <ToolInput type="number" label="Target grade (%)" value={target} onChange={(e) => setTarget(e.target.value)} />
        <ToolInput type="number" label="Final exam weight (%)" value={final} onChange={(e) => setFinal(e.target.value)} />
      </div>
      {result !== null && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="text-sm text-slate-500">You need to score</div>
          <div className="font-mono text-3xl font-bold text-primary">{result}%</div>
          <div className="text-sm text-slate-500">on the final exam</div>
        </div>
      )}
    </div>
  );
}
