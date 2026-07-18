'use client'
import { useState, useMemo } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

export default function TailwindColorGenerator() {
  const [base, setBase] = useState("#3b82f6");

  const shades = useMemo(() => {
    const m = base.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return [];
    const r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
    const mix = (c, w) => Math.round(c + (255 - c) * w);
    const mixDark = (c, w) => Math.round(c * (1 - w));
    const toHex = (r, g, b) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
    return [
      [50, toHex(mix(r, 0.9), mix(g, 0.9), mix(b, 0.9))],
      [100, toHex(mix(r, 0.8), mix(g, 0.8), mix(b, 0.8))],
      [200, toHex(mix(r, 0.6), mix(g, 0.6), mix(b, 0.6))],
      [300, toHex(mix(r, 0.4), mix(g, 0.4), mix(b, 0.4))],
      [400, toHex(mix(r, 0.2), mix(g, 0.2), mix(b, 0.2))],
      [500, base],
      [600, toHex(mixDark(r, 0.1), mixDark(g, 0.1), mixDark(b, 0.1))],
      [700, toHex(mixDark(r, 0.2), mixDark(g, 0.2), mixDark(b, 0.2))],
      [800, toHex(mixDark(r, 0.3), mixDark(g, 0.3), mixDark(b, 0.3))],
      [900, toHex(mixDark(r, 0.4), mixDark(g, 0.4), mixDark(b, 0.4))],
      [950, toHex(mixDark(r, 0.5), mixDark(g, 0.5), mixDark(b, 0.5))],
    ];
  }, [base]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={base} onChange={(e) => setBase(e.target.value)} className="h-10 w-14 cursor-pointer rounded-lg border border-border" />
        <code className="font-mono text-sm text-muted-foreground">{base.toUpperCase()}</code>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        {shades.map(([num, hex]) => (
          <div key={num} className="flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: hex }}>
            <span className="text-sm font-medium" style={{ color: num <= 400 ? "#1e293b" : "#fff" }}>{num}</span>
            <div className="flex items-center gap-2">
              <code className="font-mono text-xs" style={{ color: num <= 400 ? "#1e293b" : "#fff" }}>{hex.toUpperCase()}</code>
              <CopyButton value={hex.toUpperCase()} label="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
