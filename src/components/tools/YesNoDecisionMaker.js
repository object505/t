'use client'
import { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function YesNoDecisionMaker() {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [stats, setStats] = useState({ yes: 0, no: 0 });

  const decide = () => {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      const r = Math.random() > 0.5 ? "Yes" : "No";
      setResult(r);
      setStats((s) => ({ ...s, [r.toLowerCase()]: s[r.toLowerCase()] + 1 }));
      setFlipping(false);
    }, 500);
  };

  const total = stats.yes + stats.no;

  return (
    <div className="space-y-5 text-center">
      <div
        onClick={decide}
        className={`mx-auto flex h-36 w-36 cursor-pointer items-center justify-center rounded-full text-3xl font-bold text-white shadow-lg transition-all duration-300 ${
          result === "Yes" ? "bg-emerald-500" : result === "No" ? "bg-rose-500" : "bg-primary"
        } ${flipping ? "animate-pulse scale-95" : "hover:scale-105"}`}
      >
        {flipping ? "…" : result || "Ask!"}
      </div>

      <button
        onClick={decide}
        disabled={flipping}
        className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40"
      >
        <span className="inline-flex items-center gap-1.5">
          <RefreshCw className={`h-4 w-4 ${flipping ? "animate-spin" : ""}`} /> Get an Answer
        </span>
      </button>

      {total > 0 && (
        <div className="flex justify-center gap-6 text-sm">
          <span className="text-muted-foreground">
            Yes: <span className="font-mono font-bold text-emerald-600">{stats.yes}</span>{" "}
            <span className="text-xs text-slate-400">({Math.round((stats.yes / total) * 100)}%)</span>
          </span>
          <span className="text-muted-foreground">
            No: <span className="font-mono font-bold text-rose-600">{stats.no}</span>{" "}
            <span className="text-xs text-slate-400">({Math.round((stats.no / total) * 100)}%)</span>
          </span>
        </div>
      )}
    </div>
  );
}