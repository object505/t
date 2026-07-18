'use client'
import { useState } from "react";

export default function CoinFlip() {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const flip = () => {
    setFlipping(true);
    setTimeout(() => {
      const r = Math.random() > 0.5 ? "Heads" : "Tails";
      setResult(r);
      setStats((s) => ({ ...s, [r.toLowerCase()]: s[r.toLowerCase()] + 1 }));
      setFlipping(false);
    }, 400);
  };

  return (
    <div className="space-y-5 text-center">
      <div className="flex justify-center">
        <div
          onClick={flip}
          className={`flex h-32 w-32 cursor-pointer items-center justify-center rounded-full text-2xl font-bold shadow-lg transition-all duration-300 ${result === "Heads" ? "bg-amber-400 text-white" : result === "Tails" ? "bg-slate-600 text-white" : "bg-primary text-white"} ${flipping ? "animate-spin" : "hover:scale-105"}`}
        >
          {flipping ? "?" : result || "Flip!"}
        </div>
      </div>
      <button onClick={flip} disabled={flipping} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40">
        Flip Coin
      </button>
      {(stats.heads > 0 || stats.tails > 0) && (
        <div className="flex justify-center gap-6 text-sm">
          <span className="text-muted-foreground">Heads: <span className="font-mono font-bold text-amber-500">{stats.heads}</span></span>
          <span className="text-muted-foreground">Tails: <span className="font-mono font-bold text-muted-foreground">{stats.tails}</span></span>
        </div>
      )}
    </div>
  );
}
