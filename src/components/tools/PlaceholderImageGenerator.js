'use client'
import { useState, useRef, useEffect } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { Download } from "lucide-react";

const PRESET_SIZES = [
  ["150x150", 150, 150], ["300x200", 300, 200], ["400x400", 400, 400],
  ["600x400", 600, 400], ["800x600", 800, 600], ["1200x630", 1200, 630],
];

export default function PlaceholderImageGenerator() {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [bgColor, setBgColor] = useState("#94a3b8");
  const [textColor, setTextColor] = useState("#ffffff");
  const [customText, setCustomText] = useState("");
  const canvasRef = useRef(null);

  const displayText = customText.trim() || `${width} × ${height}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = textColor;
    const fontSize = Math.max(12, Math.min(width, height) * 0.08);
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(displayText, width / 2, height / 2);
  }, [width, height, bgColor, textColor, displayText]);

  const download = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `placeholder-${width}x${height}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // A data-URL version people can drop straight into an <img src="..."> for quick mockups
  const dataUrl = canvasRef.current?.toDataURL("image/png") || "";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-400">Width</label>
          <input type="number" min="1" max="4000" value={width} onChange={(e) => setWidth(Math.max(1, Math.min(4000, +e.target.value)))} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-400">Height</label>
          <input type="number" min="1" max="4000" value={height} onChange={(e) => setHeight(Math.max(1, Math.min(4000, +e.target.value)))} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {PRESET_SIZES.map(([label, w, h]) => (
          <button
            key={label}
            onClick={() => { setWidth(w); setHeight(h); }}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
          >
            {label}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={customText}
        onChange={(e) => setCustomText(e.target.value)}
        placeholder={`Custom text (defaults to "${width} × ${height}")`}
        className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
      />

      <div className="flex gap-3">
        <div className="flex flex-1 items-center gap-2">
          <label className="text-xs text-slate-400">Background</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-border" />
        </div>
        <div className="flex flex-1 items-center gap-2">
          <label className="text-xs text-slate-400">Text</label>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-border" />
        </div>
      </div>

      <div className="flex justify-center overflow-auto rounded-lg border border-border bg-slate-50 p-4">
        <canvas ref={canvasRef} style={{ maxWidth: "100%", height: "auto" }} />
      </div>

      <div className="flex gap-2">
        <button onClick={download} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90">
          <Download className="h-4 w-4" /> Download PNG
        </button>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
        <span className="truncate text-xs text-slate-400">Copy as data URL for &lt;img src&gt;</span>
        <CopyButton value={dataUrl} label="" />
      </div>
    </div>
  );
}
