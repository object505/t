'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw, Lock, Unlock } from "lucide-react";

function randomHex() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
}

function hexBrightness(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export default function RandomPaletteGenerator() {
  const [palette, setPalette] = useState(() => Array.from({ length: 5 }, () => ({ hex: randomHex(), locked: false })));

  const generate = () => {
    setPalette((p) => p.map((c) => (c.locked ? c : { ...c, hex: randomHex() })));
  };

  const toggleLock = (i) => {
    setPalette((p) => p.map((c, idx) => (idx === i ? { ...c, locked: !c.locked } : c)));
  };

  const setSize = (size) => {
    setPalette((p) => {
      if (size > p.length) {
        return [...p, ...Array.from({ length: size - p.length }, () => ({ hex: randomHex(), locked: false }))];
      }
      return p.slice(0, size);
    });
  };

  const allHex = palette.map((c) => c.hex.toUpperCase()).join(", ");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[3, 4, 5, 6, 7, 8].map((n) => (
            <button
              key={n}
              onClick={() => setSize(n)}
              className={`h-7 w-7 rounded-full text-xs font-medium ${
                palette.length === n ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <RefreshCw className="h-4 w-4" /> Generate
        </button>
      </div>

      <div className="flex h-48 overflow-hidden rounded-xl border border-border">
        {palette.map((c, i) => {
          const isLight = hexBrightness(c.hex) > 155;
          return (
            <div key={i} className="group relative flex flex-1 flex-col items-center justify-end p-3" style={{ backgroundColor: c.hex }}>
              <button
                onClick={() => toggleLock(i)}
                className={`absolute top-2 rounded-full p-1.5 ${isLight ? "text-slate-800/60 hover:text-slate-800" : "text-white/70 hover:text-white"}`}
              >
                {c.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4 opacity-0 group-hover:opacity-100" />}
              </button>
              <span className={`font-mono text-xs font-medium ${isLight ? "text-slate-800" : "text-white"}`}>
                {c.hex.toUpperCase()}
              </span>
              <div className="mt-1 opacity-0 transition-opacity group-hover:opacity-100">
                <CopyButton value={c.hex.toUpperCase()} label="" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
        <span className="text-xs text-slate-400">Copy all as comma-separated list</span>
        <CopyButton value={allHex} label="" />
      </div>

      <p className="text-center text-xs text-slate-400">Click the lock icon on any swatch to keep it while regenerating the rest.</p>
    </div>
  );
}
