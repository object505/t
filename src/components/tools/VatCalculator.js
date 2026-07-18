'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function VatCalculator() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("20");
  const [mode, setMode] = useState("add");

  const result = useMemo(() => {
    const a = parseFloat(amount), r = parseFloat(rate);
    if (!a) return null;
    if (mode === "add") {
      const vat = (a * r) / 100;
      return { vat: vat.toFixed(2), total: (a + vat).toFixed(2), net: a.toFixed(2) };
    }
    const net = a / (1 + r / 100);
    return { vat: (a - net).toFixed(2), total: a.toFixed(2), net: net.toFixed(2) };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["add", "Add VAT"], ["remove", "Remove VAT"]].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${mode === v ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{l}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <ToolInput type="number" label="VAT rate (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      {result && (
        <div className="space-y-2 rounded-lg border border-border bg-slate-50 dark:bg-card p-4 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Net amount</span><span className="font-mono font-semibold">${result.net}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">VAT</span><span className="font-mono font-semibold text-primary">${result.vat}</span></div>
          <div className="flex justify-between border-t border-border pt-2"><span className="font-medium">Total</span><span className="font-mono font-bold">${result.total}</span></div>
        </div>
      )}
    </div>
  );
}
