'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, StatCard } from "@/components/tools/ToolUI";

export default function TweetCharacterCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const len = [...text].length;
    const remaining = 280 - len;
    return { len, remaining, over: remaining < 0 };
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="What's happening?" ariaLabel="Tweet text" rows={5} />
      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Characters" value={stats.len} />
        <div className="rounded-lg border border-border bg-white px-4 py-3 text-center shadow-sm">
          <div className={`font-mono text-2xl font-bold ${stats.over ? "text-red-500" : "text-primary"}`}>{stats.remaining}</div>
          <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-500">Remaining</div>
        </div>
      </div>
      <div className={`h-2 rounded-full ${stats.over ? "bg-red-200" : "bg-slate-200"}`}>
        <div className={`h-full rounded-full transition-all ${stats.over ? "bg-red-500" : "bg-primary"}`} style={{ width: `${Math.min(100, (stats.len / 280) * 100)}%` }} />
      </div>
    </div>
  );
}
