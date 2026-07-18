'use client'
import { useState } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

export default function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState("tech");
  const [names, setNames] = useState([]);

  const suffixes = ["Hub", "Lab", "Forge", "Nest", "Works", "Studio", "Sphere", "Pulse", "Edge", "Wave", "Forge", "Grid", "Byte", "Core", "Link", "Loop", "Shift", "Vault", "Peak", "Drive", "Flow", "Bloom", "Spark", "Nexus"];

  const generate = () => {
    const k = keyword.trim() || "brand";
    setNames(Array.from({ length: 12 }, () => {
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      const cap = k.charAt(0).toUpperCase() + k.slice(1);
      return Math.random() > 0.5 ? `${cap}${suffix}` : `${cap} ${suffix}`;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <ToolInput label="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="tech" />
        <button onClick={generate} className="mt-6 shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Generate</button>
      </div>
      {names.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {names.map((n, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2">
              <span className="text-sm font-medium text-slate-700">{n}</span>
              <CopyButton value={n} label="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
