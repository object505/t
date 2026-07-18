'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function DateDifference() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s) || isNaN(e)) return null;
    const diff = Math.abs(e - s);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(days / 7);
    const months = Math.abs((e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth()));
    const years = (days / 365.25).toFixed(2);
    return { days, weeks, months, years };
  }, [start, end]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="date" label="Start date" value={start} onChange={(e) => setStart(e.target.value)} />
        <ToolInput type="date" label="End date" value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-xl font-bold text-primary">{result.days}</div><div className="text-xs text-slate-500">Days</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-xl font-bold text-primary">{result.weeks}</div><div className="text-xs text-slate-500">Weeks</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-xl font-bold text-primary">{result.months}</div><div className="text-xs text-slate-500">Months</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-xl font-bold text-primary">{result.years}</div><div className="text-xs text-slate-500">Years</div></div>
        </div>
      )}
    </div>
  );
}
