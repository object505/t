'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToCmyk(r, g, b) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return { c: Math.round(c * 100), m: Math.round(m * 100), y: Math.round(y * 100), k: Math.round(k * 100) };
}

function cmykToRgb(c, m, y, k) {
  const cn = c / 100, mn = m / 100, yn = y / 100, kn = k / 100;
  const r = 255 * (1 - cn) * (1 - kn);
  const g = 255 * (1 - mn) * (1 - kn);
  const b = 255 * (1 - yn) * (1 - kn);
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;
}

export default function CmykConverter() {
  const [mode, setMode] = useState("hex"); // "hex" or "cmyk" — which side the user is actively editing
  const [hex, setHex] = useState("#3b82f6");
  const [cmyk, setCmyk] = useState({ c: 76, m: 47, y: 0, k: 4 });

  const updateFromHex = (val) => {
    setHex(val);
    const rgb = hexToRgb(val);
    if (rgb) setCmyk(rgbToCmyk(rgb.r, rgb.g, rgb.b));
  };

  const updateFromCmyk = (field, val) => {
    const num = Math.max(0, Math.min(100, parseInt(val) || 0));
    const next = { ...cmyk, [field]: num };
    setCmyk(next);
    const rgb = cmykToRgb(next.c, next.m, next.y, next.k);
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={hex} onChange={(e) => updateFromHex(e.target.value)} className="h-16 w-20 cursor-pointer rounded border border-border" />
        <div className="flex-1 space-y-2">
          <div>
            <label className="text-xs font-medium text-slate-400">HEX</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="mt-0.5 w-full rounded-lg border border-border px-3 py-1.5 font-mono text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[["c", "Cyan"], ["m", "Magenta"], ["y", "Yellow"], ["k", "Key (Black)"]].map(([key, label]) => (
          <div key={key} className="space-y-1">
            <label className="text-[10px] font-medium uppercase text-slate-400">{label}</label>
            <div className="flex items-center rounded-lg border border-border">
              <input
                type="number"
                min="0"
                max="100"
                value={cmyk[key]}
                onChange={(e) => updateFromCmyk(key, e.target.value)}
                className="w-full rounded-lg px-2 py-1.5 text-center text-sm outline-none"
              />
              <span className="pr-2 text-xs text-slate-400">%</span>
            </div>
          </div>
        ))}
      </div>

      {["c", "m", "y", "k"].map((key) => (
        <input
          key={key}
          type="range"
          min="0"
          max="100"
          value={cmyk[key]}
          onChange={(e) => updateFromCmyk(key, e.target.value)}
          className="w-full accent-primary"
        />
      ))}

      <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2">
        <code className="text-sm text-slate-700">{cmykString}</code>
        <CopyButton value={cmykString} label="" />
      </div>

      <div className="flex h-16 items-center justify-center rounded-lg border border-border" style={{ backgroundColor: hex }}>
        <span className="rounded-md bg-white/80 px-2 py-1 font-mono text-xs font-medium text-slate-800">{hex.toUpperCase()}</span>
      </div>

      <p className="text-center text-xs text-slate-400">
        Note: this is a simple device-independent CMYK approximation, not a color-managed CMYK profile — actual print output may vary by printer/ink.
      </p>
    </div>
  );
}
