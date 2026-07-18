'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");

  const result = useMemo(() => {
    if (!dob) return null;
    const birth = new Date(dob);
    if (isNaN(birth)) return null;
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now - birth) / 86400000);
    return { years, months, days, totalDays };
  }, [dob]);

  return (
    <div className="space-y-4">
      <ToolInput type="date" label="Date of birth" value={dob} onChange={(e) => setDob(e.target.value)} />
      {result && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="text-3xl font-bold text-slate-900">{result.years}<span className="text-lg text-slate-400"> years</span></div>
          <div className="mt-1 text-sm text-slate-500">{result.months} months and {result.days} days</div>
          <div className="mt-3 text-xs text-slate-400">{result.totalDays.toLocaleString()} total days</div>
        </div>
      )}
    </div>
  );
}
