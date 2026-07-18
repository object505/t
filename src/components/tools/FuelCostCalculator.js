'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("500");
  const [mpg, setMpg] = useState("30");
  const [price, setPrice] = useState("3.50");
  const [mode, setMode] = useState("us");

  const result = useMemo(() => {
    const d = parseFloat(distance), e = parseFloat(mpg), p = parseFloat(price);
    if (!d || !e || !p) return null;
    const gallons = mode === "us" ? d / e : (d / 1.609344) / (e * 0.425144);
    return (gallons * p).toFixed(2);
  }, [distance, mpg, price, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["us", "US (mpg)"], ["uk", "UK (L/100km)"]].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${mode === v ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{l}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <ToolInput type="number" label={`Distance (${mode === "us" ? "mi" : "km"})`} value={distance} onChange={(e) => setDistance(e.target.value)} />
        <ToolInput type="number" label={mode === "us" ? "Efficiency (mpg)" : "Efficiency (L/100km)"} value={mpg} onChange={(e) => setMpg(e.target.value)} />
        <ToolInput type="number" label="Fuel price ($/gal)" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      {result && (
        <div className="rounded-xl border border-border bg-slate-50 p-5 text-center">
          <div className="font-mono text-3xl font-bold text-primary">${result}</div>
          <div className="text-sm text-slate-500">Total fuel cost</div>
        </div>
      )}
    </div>
  );
}
