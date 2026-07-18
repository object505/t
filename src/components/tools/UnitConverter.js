'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

const UNITS = {
  Length: { base: "m", units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 } },
  Weight: { base: "kg", units: { kg: 1, g: 0.001, mg: 0.000001, t: 1000, lb: 0.453592, oz: 0.0283495, st: 6.35029 } },
  Temperature: { base: "C", units: { C: "C", F: "F", K: "K" } },
  Volume: { base: "L", units: { L: 1, mL: 0.001, gal: 3.78541, qt: 0.946353, pt: 0.473176, cup: 0.236588, floz: 0.0295735 } },
  Area: { base: "m2", units: { m2: 1, km2: 1000000, cm2: 0.0001, ha: 10000, acre: 4046.86, ft2: 0.092903, in2: 0.00064516 } },
};

function convertTemp(val, from, to) {
  let c;
  if (from === "C") c = val;
  else if (from === "F") c = (val - 32) * 5 / 9;
  else c = val - 273.15;
  if (to === "C") return c;
  if (to === "F") return c * 9 / 5 + 32;
  return c + 273.15;
}

export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!v) return null;
    const cat = UNITS[category];
    if (category === "Temperature") return convertTemp(v, from, to);
    return (v * cat.units[from]) / cat.units[to];
  }, [value, from, to, category]);

  const units = Object.keys(UNITS[category].units);

  return (
    <div className="space-y-4">
      <select value={category} onChange={(e) => { const c = e.target.value; setCategory(c); const ks = Object.keys(UNITS[c].units); setFrom(ks[0]); setTo(ks[1]); }} className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">
        {Object.keys(UNITS).map((c) => <option key={c}>{c}</option>)}
      </select>
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
        <div><ToolInput type="number" label="From" value={value} onChange={(e) => setValue(e.target.value)} /></div>
        <button onClick={() => { const t = from; setFrom(to); setTo(t); }} className="mb-2 rounded-lg border border-border p-2 text-slate-500 hover:border-primary/30">⇄</button>
        <div><label className="text-sm font-medium text-muted-foreground">To</label><div className="mt-1 rounded-lg border border-border bg-slate-50 px-3 py-2 font-mono text-sm text-slate-800">{result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—"}</div></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">{units.map((u) => <option key={u}>{u}</option>)}</select>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">{units.map((u) => <option key={u}>{u}</option>)}</select>
      </div>
    </div>
  );
}
