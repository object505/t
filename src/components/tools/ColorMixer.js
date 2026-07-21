'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("")}`;
}

// Straightforward linear channel blend
function mixRGB(c1, c2, ratio) {
  return {
    r: c1.r + (c2.r - c1.r) * ratio,
    g: c1.g + (c2.g - c1.g) * ratio,
    b: c1.b + (c2.b - c1.b) * ratio,
  };
}

// Multiplicative (geometric) blend — interpolates in log-space per channel instead of linear space.
// This is genuinely non-linear (unlike a plain affine remap), and tends to produce darker,
// less "muddy-gray" mixes that feel closer to how pigments actually combine — e.g. blue + yellow
// leans toward a believable green rather than linear RGB's flat brownish-gray.
function mixMultiplicative(c1, c2, ratio) {
  const mixChannel = (a, b) => {
    const an = Math.max(a, 1) / 255; // avoid log/pow(0) edge case
    const bn = Math.max(b, 1) / 255;
    const mixed = Math.pow(an, 1 - ratio) * Math.pow(bn, ratio);
    return mixed * 255;
  };
  return { r: mixChannel(c1.r, c2.r), g: mixChannel(c1.g, c2.g), b: mixChannel(c1.b, c2.b) };
}

export default function ColorMixer() {
  const [colorA, setColorA] = useState("#3b82f6");
  const [colorB, setColorB] = useState("#facc15");
  const [mode, setMode] = useState("subtractive");
  const [steps, setSteps] = useState(5);

  const rgbA = hexToRgb(colorA);
  const rgbB = hexToRgb(colorB);
  const mixFn = mode === "subtractive" ? mixMultiplicative : mixRGB;

  const gradientSteps = Array.from({ length: steps }, (_, i) => {
    const ratio = i / (steps - 1);
    const mixed = mixFn(rgbA, rgbB, ratio);
    return rgbToHex(mixed.r, mixed.g, mixed.b);
  });

  const midpoint = gradientSteps[Math.floor(steps / 2)];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5 text-center">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Color A</label>
          <input type="color" value={colorA} onChange={(e) => setColorA(e.target.value)} className="h-12 w-full cursor-pointer rounded border border-border" />
          <code className="text-xs text-slate-500">{colorA.toUpperCase()}</code>
        </div>
        <div className="space-y-1.5 text-center">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Color B</label>
          <input type="color" value={colorB} onChange={(e) => setColorB(e.target.value)} className="h-12 w-full cursor-pointer rounded border border-border" />
          <code className="text-xs text-slate-500">{colorB.toUpperCase()}</code>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {[["subtractive", "Paint-like"], ["linear", "Linear RGB"]].map(([v, label]) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              mode === v ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-400">Steps: {steps}</label>
        <input type="range" min="3" max="11" value={steps} onChange={(e) => setSteps(+e.target.value)} className="w-full accent-primary" />
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        {gradientSteps.map((hex, i) => (
          <div key={i} className="group relative flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: hex }}>
            <span className="text-sm font-medium" style={{ color: parseInt(hex.slice(1), 16) > 0x999999 ? "#1e293b" : "#fff" }}>
              {i === 0 ? "Color A" : i === gradientSteps.length - 1 ? "Color B" : `${Math.round((i / (steps - 1)) * 100)}%`}
            </span>
            <div className="flex items-center gap-2">
              <code className="font-mono text-xs" style={{ color: parseInt(hex.slice(1), 16) > 0x999999 ? "#1e293b" : "#fff" }}>{hex.toUpperCase()}</code>
              <CopyButton value={hex.toUpperCase()} label="" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-center">
        <div className="text-xs font-medium uppercase tracking-wide text-primary/70">Even 50/50 Mix</div>
        <div className="mt-1 flex items-center justify-center gap-2">
          <div className="h-8 w-8 rounded-md border border-border" style={{ backgroundColor: midpoint }} />
          <code className="font-mono text-sm font-bold text-primary">{midpoint.toUpperCase()}</code>
          <CopyButton value={midpoint.toUpperCase()} label="" />
        </div>
      </div>
    </div>
  );
}
