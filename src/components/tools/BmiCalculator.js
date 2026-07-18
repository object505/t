'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function BmiCalculator() {
  const [unit, setUnit] = useState("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const result = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return null;
    let bmi;
    if (unit === "metric") {
      bmi = w / ((h / 100) ** 2);
    } else {
      bmi = (w / (h ** 2)) * 703;
    }
    bmi = Math.round(bmi * 10) / 10;
    const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
    const color = { Underweight: "text-amber-600", Normal: "text-green-600", Overweight: "text-amber-600", Obese: "text-red-600" }[cat];
    return { bmi, cat, color };
  }, [height, weight, unit]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["metric", "Metric (cm/kg)"], ["imperial", "Imperial (in/lb)"]].map(([v, label]) => (
          <button key={v} onClick={() => { setUnit(v); setHeight(""); setWeight(""); }} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${unit === v ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{label}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label={`Height (${unit === "metric" ? "cm" : "inches"})`} value={height} onChange={(e) => setHeight(e.target.value)} placeholder={unit === "metric" ? "175" : "69"} />
        <ToolInput type="number" label={`Weight (${unit === "metric" ? "kg" : "lb"})`} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} />
      </div>
      {result && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="text-4xl font-bold text-slate-900">{result.bmi}</div>
          <div className={`mt-1 text-sm font-semibold ${result.color}`}>{result.cat}</div>
        </div>
      )}
    </div>
  );
}
