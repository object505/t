'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

export default function BorderRadius() {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);
  const [linked, setLinked] = useState(true);

  const setAll = (v) => { setTl(v); setTr(v); setBr(v); setBl(v); };
  const update = (setter) => (e) => { const v = +e.target.value; linked ? setAll(v) : setter(v); };

  const radius = `${tl}px ${tr}px ${br}px ${bl}px`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded-xl border border-border bg-slate-50 p-8">
        <div className="h-28 w-28 bg-primary" style={{ borderRadius: radius }} />
      </div>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={linked} onChange={(e) => setLinked(e.target.checked)} className="accent-primary" /> Link all corners
      </label>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Top-Left", tl, setTl], ["Top-Right", tr, setTr], ["Bottom-Right", br, setBr], ["Bottom-Left", bl, setBl]].map(([label, val, setter]) => (
          <div key={label} className="space-y-1">
            <label className="text-xs font-medium text-slate-500">{label}: {val}px</label>
            <input type="range" min="0" max="100" value={val} onChange={update(setter)} disabled={linked} className="w-full accent-primary disabled:opacity-40" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-3">
        <code className="font-mono text-xs text-slate-700">border-radius: {radius};</code>
        <CopyButton value={`border-radius: ${radius};`} />
      </div>
    </div>
  );
}
