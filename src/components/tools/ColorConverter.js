'use client'
import { useState, useMemo } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#2563eb");
  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null), [rgb]);

  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid";
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "Invalid";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={hex.length === 7 ? hex : "#000000"} onChange={(e) => setHex(e.target.value)} className="h-12 w-16 cursor-pointer rounded-lg border border-border" />
        <ToolInput label="HEX" value={hex} onChange={(e) => setHex(e.target.value)} className="font-mono" />
      </div>
      <div className="rounded-lg border border-border p-4" style={{ backgroundColor: rgbStr !== "Invalid" ? rgbStr : "#fff", minHeight: 80 }} />
      <div className="space-y-2">
        {[
          { label: "HEX", value: hex },
          { label: "RGB", value: rgbStr },
          { label: "HSL", value: hslStr },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2">
            <span className="text-xs font-semibold uppercase text-slate-500">{row.label}</span>
            <div className="flex items-center gap-2">
              <code className="font-mono text-sm text-slate-700">{row.value}</code>
              <CopyButton value={row.value} label="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
