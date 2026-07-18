'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function CalorieCalculator() {
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.55");

  const result = useMemo(() => {
    const a = parseInt(age), w = parseFloat(weight), h = parseFloat(height);
    if (!a || !w || !h) return null;
    const bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * parseFloat(activity);
    return { bmr: Math.round(bmr), maintain: Math.round(tdee), lose: Math.round(tdee - 500), gain: Math.round(tdee + 500) };
  }, [age, weight, height, gender, activity]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <div className="space-y-1.5"><label className="text-sm font-medium text-muted-foreground">Gender</label><div className="flex gap-2">{[["male", "Male"], ["female", "Female"]].map(([v, l]) => <button key={v} onClick={() => setGender(v)} className={`rounded-lg border px-4 py-2 text-sm font-medium ${gender === v ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{l}</button>)}</div></div>
        <ToolInput type="number" label="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <ToolInput type="number" label="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div className="space-y-1.5"><label className="text-sm font-medium text-muted-foreground">Activity level</label><select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"><option value="1.2">Sedentary</option><option value="1.375">Lightly active</option><option value="1.55">Moderately active</option><option value="1.725">Very active</option><option value="1.9">Extra active</option></select></div>
      {result && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">{result.bmr}</div><div className="text-xs text-slate-500">BMR</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">{result.maintain}</div><div className="text-xs text-slate-500">Maintain</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-amber-500">{result.lose}</div><div className="text-xs text-slate-500">Lose</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-green-500">{result.gain}</div><div className="text-xs text-slate-500">Gain</div></div>
        </div>
      )}
    </div>
  );
}
