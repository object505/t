'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function AddDays() {
  const [date, setDate] = useState("");
  const [days, setDays] = useState("30");

  const result = useMemo(() => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d)) return null;
    d.setDate(d.getDate() + parseInt(days || 0));
    return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }, [date, days]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="date" label="Start date" value={date} onChange={(e) => setDate(e.target.value)} />
        <ToolInput type="number" label="Days to add/subtract" value={days} onChange={(e) => setDays(e.target.value)} />
      </div>
      {result && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="text-xl font-bold text-primary">{result}</div>
        </div>
      )}
    </div>
  );
}
