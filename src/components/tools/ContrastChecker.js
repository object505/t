'use client'
import { useState, useMemo } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}

function luminance({ r, g, b }) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export default function ContrastChecker() {
  const [fg, setFg] = useState("#2563eb");
  const [bg, setBg] = useState("#ffffff");

  const ratio = useMemo(() => {
    const f = hexToRgb(fg), b = hexToRgb(bg);
    if (!f || !b) return null;
    const l1 = luminance(f), l2 = luminance(b);
    const r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return Math.round(r * 100) / 100;
  }, [fg, bg]);

  const results = ratio ? {
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  } : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 w-14 cursor-pointer rounded border border-border" />
          <span className="text-sm text-muted-foreground">Foreground</span>
        </div>
        <div className="flex items-center gap-2">
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 w-14 cursor-pointer rounded border border-border" />
          <span className="text-sm text-muted-foreground">Background</span>
        </div>
      </div>
      <div className="rounded-xl border border-border p-6 text-center" style={{ backgroundColor: bg, color: fg }}>
        <div className="text-2xl font-bold">Contrast: {ratio?.toFixed(2)}:1</div>
        <div className="mt-1 text-sm opacity-80">The quick brown fox jumps over the lazy dog</div>
      </div>
      {results && (
        <div className="grid grid-cols-2 gap-3">
          {[
            ["AA Normal", results.aaNormal],
            ["AA Large", results.aaLarge],
            ["AAA Normal", results.aaaNormal],
            ["AAA Large", results.aaaLarge],
          ].map(([label, pass]) => (
            <div key={label} className={`rounded-lg border p-3 text-center text-sm font-medium ${pass ? "border-green-200 bg-green-50 text-green-600" : "border-red-200 bg-red-50 text-red-600"}`}>
              {pass ? "✓" : "✗"} {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}