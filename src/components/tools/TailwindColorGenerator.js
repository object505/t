'use client'
import { useState, useMemo } from "react";
import { CopyButton, ToolInput } from '@/components/tools/ToolUI'

export default function TailwindColorGenerator() {
  const [base, setBase] = useState("#3b82f6");
  const [name, setName] = useState("primary");
  const [format, setFormat] = useState("v4");

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

  const safeName = (name.trim() || "primary").toLowerCase().replace(/[^a-z0-9-]/g, "-");

  const exportCode = useMemo(() => {
    if (shades.length === 0) return "";
    if (format === "v3") {
      const lines = shades.map(([num, hex]) => `          ${num}: '${hex.toUpperCase()}',`).join("\n");
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        ${safeName}: {\n${lines}\n        },\n      },\n    },\n  },\n}`;
    }
    if (format === "v4") {
      const lines = shades.map(([num, hex]) => `  --color-${safeName}-${num}: ${hex.toUpperCase()};`).join("\n");
      return `@theme {\n${lines}\n}`;
    }
    // plain CSS custom properties
    const lines = shades.map(([num, hex]) => `  --${safeName}-${num}: ${hex.toUpperCase()};`).join("\n");
    return `:root {\n${lines}\n}`;
  }, [shades, format, safeName]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className='flex flex-wrap items-center gap-3 mt-6'>
          <input type="color" value={base} onChange={(e) => setBase(e.target.value)} className="h-10 w-14 cursor-pointer rounded border border-border" />
          <code className="font-mono text-sm text-muted-foreground">{base.toUpperCase()}</code>
        </div>
        <ToolInput label="Color name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter color name" />
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

      <div className="space-y-2 rounded-lg border border-border p-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex gap-1 mb-2 md:mb-0 rounded-lg bg-slate-100 p-1">
            {[
              ["v4", "Tailwind v4"],
              ["v3", "Tailwind v3"],
              ["css", "CSS variables"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFormat(key)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  format === key ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <CopyButton value={exportCode} label="Copy config" />
        </div>
        <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
          <pre className="whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">
            <code>{exportCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
