'use client'
import { useState, useMemo } from "react";
import { ToolTextarea } from "@/components/tools/ToolUI";

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");

  const result = useMemo(() => {
    if (!text.trim()) return [];
    const words = text.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
    const total = words.length;
    const freq = {};
    words.forEach((w) => freq[w] = (freq[w] || 0) + 1);
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([word, count]) => ({ word, count, density: ((count / total) * 100).toFixed(1) }));
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Paste your content here…" ariaLabel="Content" rows={6} />
      {result.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="border-b border-border bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">Top keywords (of {result.length})</div>
          <div className="divide-y divide-border">
            {result.map((r, i) => (
              <div key={r.word} className="flex items-center justify-between px-4 py-2 text-sm">
                <span className="text-slate-700">{i + 1}. <span className="font-medium">{r.word}</span></span>
                <span className="flex gap-4 text-slate-500"><span>{r.count}×</span><span className="font-mono text-primary">{r.density}%</span></span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
