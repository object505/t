'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

function hslToHex(h, s, l) {
  l /= 100; const a = s * Math.min(l, 1 - l) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorPaletteGenerator() {
  const [base, setBase] = useState(Math.floor(Math.random() * 360));
  const [sat, setSat] = useState(70);
  const [light, setLight] = useState(50);

  const generate = () => {
    setBase(Math.floor(Math.random() * 360));
    setSat(Math.floor(50 + Math.random() * 40));
    setLight(Math.floor(35 + Math.random() * 30));
  };

  const handlePick = (hex) => {
    const { h, s, l } = hexToHsl(hex);
    setBase(h);
    setSat(s);
    setLight(l);
  };

  const palettes = [
    { name: "Complementary", colors: [base, (base + 180) % 360] },
    { name: "Triadic", colors: [base, (base + 120) % 360, (base + 240) % 360] },
    { name: "Analogous", colors: [base, (base + 30) % 360, (base + 60) % 360, (base + 330) % 360] },
    { name: "Monochromatic", colors: [0, 1, 2, 3].map(() => base) },
  ];

  const baseHex = hslToHex(base, sat, light);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="relative h-12 w-12 shrink-0 cursor-pointer">
          <input
            type="color"
            value={baseHex}
            onChange={(e) => handlePick(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div className="h-12 w-12 rounded-lg border border-border" style={{ backgroundColor: baseHex }} />
        </label>
        <span className="font-mono text-sm text-muted-foreground">{baseHex}</span>
        <button onClick={generate} className="ml-auto flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Random</button>
      </div>

      <div className="space-y-3 rounded-lg border border-border p-3">
        <div>
          <div className="mb-1 flex justify-between text-xs font-medium text-slate-500"><span>Hue</span><span>{base}°</span></div>
          <input
            type="range" min="0" max="359" value={base}
            onChange={(e) => setBase(parseInt(e.target.value))}
            className="w-full accent-primary"
            style={{ background: `linear-gradient(to right, ${Array.from({ length: 13 }, (_, i) => hslToHex(i * 30, sat, light)).join(", ")})` }}
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs font-medium text-slate-500"><span>Saturation</span><span>{sat}%</span></div>
          <input
            type="range" min="0" max="100" value={sat}
            onChange={(e) => setSat(parseInt(e.target.value))}
            className="w-full accent-primary"
            style={{ background: `linear-gradient(to right, ${hslToHex(base, 0, light)}, ${hslToHex(base, 100, light)})` }}
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs font-medium text-slate-500"><span>Lightness</span><span>{light}%</span></div>
          <input
            type="range" min="0" max="100" value={light}
            onChange={(e) => setLight(parseInt(e.target.value))}
            className="w-full accent-primary"
            style={{ background: `linear-gradient(to right, #000, ${hslToHex(base, sat, 50)}, #fff)` }}
          />
        </div>
      </div>

      {palettes.map((p) => (
        <div key={p.name}>
          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">{p.name}</div>
          <div className="flex overflow-hidden rounded-lg border border-border">
            {p.colors.map((h, i) => {
              const hex = p.name === "Monochromatic" ? hslToHex(base, sat, Math.min(90, 15 + i * 22)) : hslToHex(h, sat, light);
              return (
                <div key={i} className="group relative flex-1 p-3 text-center" style={{ backgroundColor: hex }}>
                  <span className="font-mono text-xs font-medium" style={{ color: parseInt(hex.slice(1), 16) > 0x999999 ? "#000" : "#fff" }}>
                    {hex}
                  </span>
                  <div className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"><CopyButton value={hex} label="" /></div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
