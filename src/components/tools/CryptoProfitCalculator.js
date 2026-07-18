'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function CryptoProfitCalculator() {
  const [buy, setBuy] = useState("50000");
  const [sell, setSell] = useState("55000");
  const [amount, setAmount] = useState("1");
  const [fee, setFee] = useState("0.1");

  const result = useMemo(() => {
    const b = parseFloat(buy), s = parseFloat(sell), a = parseFloat(amount), f = parseFloat(fee) / 100;
    if (!b || !s || !a) return null;
    const cost = b * a * (1 + f);
    const revenue = s * a * (1 - f);
    const profit = revenue - cost;
    const roi = ((profit / cost) * 100).toFixed(2);
    return { profit: profit.toFixed(2), roi, cost: cost.toFixed(2), revenue: revenue.toFixed(2) };
  }, [buy, sell, amount, fee]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput type="number" label="Buy price ($)" value={buy} onChange={(e) => setBuy(e.target.value)} />
        <ToolInput type="number" label="Sell price ($)" value={sell} onChange={(e) => setSell(e.target.value)} />
        <ToolInput type="number" label="Amount (coins)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <ToolInput type="number" label="Fee per trade (%)" value={fee} onChange={(e) => setFee(e.target.value)} />
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center"><div className={`font-mono text-2xl font-bold ${parseFloat(result.profit) >= 0 ? "text-green-600" : "text-red-600"}`}>${result.profit}</div><div className="text-xs text-slate-500">Profit/Loss</div></div>
          <div className="rounded-lg border border-border bg-slate-50 p-4 text-center"><div className={`font-mono text-2xl font-bold ${parseFloat(result.roi) >= 0 ? "text-green-600" : "text-red-600"}`}>{result.roi}%</div><div className="text-xs text-slate-500">ROI</div></div>
        </div>
      )}
    </div>
  );
}
