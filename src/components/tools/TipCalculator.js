'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(1);

  const result = useMemo(() => {
    const b = parseFloat(bill);
    if (!b) return null;
    const tipAmount = (b * tip) / 100;
    const total = b + tipAmount;
    const per = total / people;
    return { tipAmount: tipAmount.toFixed(2), total: total.toFixed(2), perPerson: per.toFixed(2) };
  }, [bill, tip, people]);

  return (
    <div className="space-y-4">
      <ToolInput type="number" label="Bill amount ($)" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="50.00" />
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Tip: <span className="font-mono text-primary">{tip}%</span></label>
        <input type="range" min="0" max="30" value={tip} onChange={(e) => setTip(+e.target.value)} className="w-full accent-primary" />
        <div className="flex gap-1.5">
          {[10, 15, 18, 20].map((p) => (
            <button key={p} onClick={() => setTip(p)} className={`rounded-lg border px-3 py-1 text-xs font-medium ${tip === p ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{p}%</button>
          ))}
        </div>
      </div>
      <ToolInput type="number" label="Number of people" value={people} onChange={(e) => setPeople(Math.max(1, +e.target.value))} min="1" />
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.tipAmount}</div><div className="text-xs text-slate-500">Tip</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.total}</div><div className="text-xs text-slate-500">Total</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.perPerson}</div><div className="text-xs text-slate-500">Per Person</div></div>
        </div>
      )}
    </div>
  );
}
