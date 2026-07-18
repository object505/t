'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

export default function CssGradient() {
  const [c1, setC1] = useState("#2563eb");
  const [c2, setC2] = useState("#7c3aed");
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState("linear");

  const gradient = type === "linear"
    ? `linear-gradient(${angle}deg, ${c1}, ${c2})`
    : `radial-gradient(circle, ${c1}, ${c2})`;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border" style={{ background: gradient, minHeight: 160 }} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <input type="color" value={c1} onChange={(e) => setC1(e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-border" />
          <code className="font-mono text-sm text-slate-700">{c1}</code>
        </div>
        <div className="flex items-center gap-2">
          <input type="color" value={c2} onChange={(e) => setC2(e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-border" />
          <code className="font-mono text-sm text-slate-700">{c2}</code>
        </div>
      </div>
      <div className="flex gap-2">
        {[["linear", "Linear"], ["radial", "Radial"]].map(([v, l]) => (
          <button key={v} onClick={() => setType(v)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${type === v ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{l}</button>
        ))}
      </div>
      {type === "linear" && (
        <div>
          <label className="text-sm font-medium text-muted-foreground">Angle: <span className="font-mono text-primary">{angle}°</span></label>
          <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(+e.target.value)} className="w-full accent-primary" />
        </div>
      )}
      <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-3">
        <code className="break-all font-mono text-xs text-slate-700">background: {gradient};</code>
        <CopyButton value={`background: ${gradient};`} />
      </div>
    </div>
  );
}
