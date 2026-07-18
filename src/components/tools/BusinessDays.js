'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function BusinessDays() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const s = new Date(start), e = new Date(end);
    if (isNaN(s) || isNaN(e)) return null;
    let count = 0;
    const cur = new Date(s);
    while (cur <= e) {
      if (cur.getDay() !== 0 && cur.getDay() !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  }, [start, end]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="date" label="Start date" value={start} onChange={(e) => setStart(e.target.value)} />
        <ToolInput type="date" label="End date" value={end} onChange={(e) => setEnd(e.target.value)} />
      </div>
      {result !== null && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="text-3xl font-bold text-primary">{result}</div>
          <div className="text-sm text-slate-500">business days</div>
        </div>
      )}
    </div>
  );
}
