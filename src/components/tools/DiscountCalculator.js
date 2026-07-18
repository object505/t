'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("100");
  const [discount, setDiscount] = useState("25");

  const result = useMemo(() => {
    const p = parseFloat(price), d = parseFloat(discount);
    if (!p) return null;
    const savings = (p * d) / 100;
    return { savings: savings.toFixed(2), final: (p - savings).toFixed(2) };
  }, [price, discount]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Original price ($)" value={price} onChange={(e) => setPrice(e.target.value)} />
        <ToolInput type="number" label="Discount (%)" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center"><div className="font-mono text-2xl font-bold text-green-600">${result.savings}</div><div className="text-xs text-slate-500">You save</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center"><div className="font-mono text-2xl font-bold text-primary">${result.final}</div><div className="text-xs text-slate-500">Final price</div></div>
        </div>
      )}
    </div>
  );
}
