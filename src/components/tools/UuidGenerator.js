'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

function uuidv4() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4))).toString(16)
  );
}

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [upper, setUpper] = useState(false);
  const [uuids, setUuids] = useState(() => Array.from({ length: 5 }, uuidv4));

  const generate = () => setUuids(Array.from({ length: count }, () => upper ? uuidv4().toUpperCase() : uuidv4()));

  const output = uuids.map((u) => upper ? u.toUpperCase() : u).join("\n");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-muted-foreground">Count</label>
          <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, +e.target.value)))} className="w-24 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} className="accent-primary" /> Uppercase
        </label>
        <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <RefreshCw className="h-4 w-4" /> Generate
        </button>
        <CopyButton value={output} label="Copy All" />
      </div>
      <div className="space-y-1.5">
        {uuids.map((u, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2">
            <code className="font-mono text-sm text-slate-700">{upper ? u.toUpperCase() : u}</code>
            <CopyButton value={upper ? u.toUpperCase() : u} label="" />
          </div>
        ))}
      </div>
    </div>
  );
}
