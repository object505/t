'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

const GRADES = [["A", 4.0], ["A-", 3.7], ["B+", 3.3], ["B", 3.0], ["B-", 2.7], ["C+", 2.3], ["C", 2.0], ["C-", 1.7], ["D+", 1.3], ["D", 1.0], ["F", 0]];

export default function GpaCalculator() {
  const [courses, setCourses] = useState([{ grade: "A", credits: 3 }]);

  const gpa = useMemo(() => {
    let totalPoints = 0, totalCredits = 0;
    courses.forEach((c) => {
      const g = GRADES.find(([gr]) => gr === c.grade);
      if (g) { totalPoints += g[1] * c.credits; totalCredits += c.credits; }
    });
    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  }, [courses]);

  const update = (i, field, val) => setCourses(courses.map((c, idx) => idx === i ? { ...c, [field]: field === "credits" ? +val : val } : c));

  return (
    <div className="space-y-4">
      {courses.map((c, i) => (
        <div key={i} className="flex items-end gap-2">
          <div className="flex-1"><label className="text-sm text-muted-foreground">Grade</label><select value={c.grade} onChange={(e) => update(i, "grade", e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">{GRADES.map(([g]) => <option key={g}>{g}</option>)}</select></div>
          <div className="w-24"><ToolInput type="number" label="Credits" value={c.credits} onChange={(e) => update(i, "credits", e.target.value)} /></div>
          {courses.length > 1 && <button onClick={() => setCourses(courses.filter((_, idx) => idx !== i))} className="mb-2 rounded-lg border border-border px-3 py-2 text-red-500 hover:bg-red-50">✕</button>}
        </div>
      ))}
      <button onClick={() => setCourses([...courses, { grade: "A", credits: 3 }])} className="w-full rounded-lg border border-dashed border-border py-2 text-sm text-slate-500 hover:border-primary/30">+ Add Course</button>
      <div className="rounded-xl border border-border bg-slate-50 p-5 text-center"><div className="font-mono text-3xl font-bold text-primary">{gpa}</div><div className="text-sm text-slate-500">GPA</div></div>
    </div>
  );
}
