'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("8");

  const result = useMemo(() => {
    const a = parseFloat(amount), r = parseFloat(rate);
    if (!a) return null;
    const tax = (a * r) / 100;
    return { tax: tax.toFixed(2), total: (a + tax).toFixed(2) };
  }, [amount, rate]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Price ($)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <ToolInput type="number" label="Tax rate (%)" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-slate-50 dark:bg-card p-3 text-center"><div className="font-mono text-lg font-bold text-card-foreground">${amount}</div><div className="text-xs text-muted-foreground">Subtotal</div></div>
          <div className="rounded-lg border border-border bg-slate-50 dark:bg-card p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.tax}</div><div className="text-xs text-muted-foreground">Tax</div></div>
          <div className="rounded-lg border border-border bg-slate-50 dark:bg-card p-3 text-center"><div className="font-mono text-lg font-bold text-primary">${result.total}</div><div className="text-xs text-muted-foreground">Total</div></div>
        </div>
      )}
    </div>
  );
}
