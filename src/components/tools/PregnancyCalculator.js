'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function PregnancyCalculator() {
  const [lmp, setLmp] = useState("");

  const result = useMemo(() => {
    if (!lmp) return null;
    const d = new Date(lmp);
    if (isNaN(d)) return null;
    const due = new Date(d.getTime() + 280 * 86400000);
    const now = new Date();
    const weeksPregnant = Math.floor((now - d) / (7 * 86400000));
    return { dueDate: due.toLocaleDateString(), weeks: weeksPregnant, trimester: weeksPregnant < 13 ? 1 : weeksPregnant < 27 ? 2 : 3 };
  }, [lmp]);

  return (
    <div className="space-y-4">
      <ToolInput type="date" label="First day of last period" value={lmp} onChange={(e) => setLmp(e.target.value)} />
      {result && (
        <div className="space-y-3 rounded-xl border border-border bg-slate-50 p-5">
          <div className="text-center"><div className="text-2xl font-bold text-primary">{result.dueDate}</div><div className="text-sm text-slate-500">Estimated due date</div></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-white p-3 text-center"><div className="font-mono text-lg font-bold text-slate-700">{result.weeks}</div><div className="text-xs text-slate-500">Weeks pregnant</div></div>
            <div className="rounded-lg border border-border bg-white p-3 text-center"><div className="font-mono text-lg font-bold text-slate-700">{result.trimester}</div><div className="text-xs text-slate-500">Trimester</div></div>
          </div>
        </div>
      )}
    </div>
  );
}
