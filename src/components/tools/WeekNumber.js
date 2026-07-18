'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function WeekNumber() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const result = useMemo(() => {
    const d = new Date(date);
    if (isNaN(d)) return null;
    d.setHours(0, 0, 0, 0);
    const thursday = new Date(d);
    thursday.setDate(d.getDate() + (4 - (d.getDay() || 7)));
    const yearStart = new Date(thursday.getFullYear(), 0, 1);
    const week = Math.ceil(((thursday - yearStart) / 86400000 + 1) / 7);
    return { week, year: thursday.getFullYear() };
  }, [date]);

  return (
    <div className="space-y-4">
      <ToolInput type="date" label="Date" value={date} onChange={(e) => setDate(e.target.value)} />
      {result && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="text-3xl font-bold text-primary">Week {result.week}</div>
          <div className="text-sm text-slate-500">{result.year}</div>
        </div>
      )}
    </div>
  );
}
