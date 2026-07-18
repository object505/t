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

export default function ColorPaletteGenerator() {
  const [base, setBase] = useState(Math.floor(Math.random() * 360));

  const generate = () => setBase(Math.floor(Math.random() * 360));

  const palettes = [
    { name: "Complementary", colors: [base, (base + 180) % 360] },
    { name: "Triadic", colors: [base, (base + 120) % 360, (base + 240) % 360] },
    { name: "Analogous", colors: [base, (base + 30) % 360, (base + 60) % 360, (base + 330) % 360] },
    { name: "Monochromatic", colors: [0, 1, 2, 3].map((i) => base) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg border border-border" style={{ backgroundColor: hslToHex(base, 70, 50) }} />
        <span className="font-mono text-sm text-muted-foreground">{hslToHex(base, 70, 50)}</span>
        <button onClick={generate} className="ml-auto flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Generate</button>
      </div>
      {palettes.map((p) => (
        <div key={p.name}>
          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">{p.name}</div>
          <div className="flex overflow-hidden rounded-lg border border-border">
            {p.colors.map((h, i) => {
              const hex = p.name === "Monochromatic" ? hslToHex(base, 70, 25 + i * 20) : hslToHex(h, 70, 50);
              return (
                <div key={i} className="group relative flex-1 p-3 text-center" style={{ backgroundColor: hex }}>
                  <span className="font-mono text-xs font-medium" style={{ color: parseInt(hslToHex(p.name === "Monochromatic" ? base : h, 70, 25 + i * 20).slice(1), 16) > 0x999999 ? "#000" : "#fff" }}>
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
