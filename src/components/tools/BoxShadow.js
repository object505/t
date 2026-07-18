'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

export default function BoxShadow() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(4);
  const [blur, setBlur] = useState(12);
  const [spread, setSpread] = useState(-2);
  const [color, setColor] = useState("#00000020");
  const [inset, setInset] = useState(false);

  const shadow = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${color}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded-xl border border-border bg-slate-50 p-8">
        <div className="h-24 w-24 rounded-xl bg-white" style={{ boxShadow: shadow }} />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["X", x, setX], ["Y", y, setY], ["Blur", blur, setBlur], ["Spread", spread, setSpread]].map(([label, val, set]) => (
          <div key={label} className="space-y-1">
            <label className="text-xs font-medium text-slate-500">{label}: {val}px</label>
            <input type="range" min="-50" max="50" value={val} onChange={(e) => set(+e.target.value)} className="w-full accent-primary" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <input type="color" value={color.slice(0, 7)} onChange={(e) => setColor(e.target.value + "40")} className="h-10 w-14 cursor-pointer rounded-lg border border-border" />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="accent-primary" /> Inset
        </label>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-3">
        <code className="break-all font-mono text-xs text-slate-700">box-shadow: {shadow};</code>
        <CopyButton value={`box-shadow: ${shadow};`} />
      </div>
    </div>
  );
}
