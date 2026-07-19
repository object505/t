'use client'
import { useState, useRef, useEffect } from "react";
import { Download } from "lucide-react";

const BG_COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#0f172a", "#ec4899", "#06b6d4"];

export default function SimpleFaviconGenerator() {
  const [text, setText] = useState("A");
  const [bgColor, setBgColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#ffffff");
  const [shape, setShape] = useState("rounded"); // rounded | circle | square
  const previewRef = useRef(null);
  const canvasRefs = useRef({});

  const sizes = [16, 32, 48, 64, 128, 256];

  const draw = (canvas, size) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = bgColor;
    if (shape === "circle") {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === "rounded") {
      const r = size * 0.2;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(size, 0, size, size, r);
      ctx.arcTo(size, size, 0, size, r);
      ctx.arcTo(0, size, 0, 0, r);
      ctx.arcTo(0, 0, size, 0, r);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }

    ctx.fillStyle = textColor;
    ctx.font = `${Math.floor(size * 0.55)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((text || "A").slice(0, 2).toUpperCase(), size / 2, size / 2 + size * 0.03);
  };

  useEffect(() => {
    draw(previewRef.current, 128);
    sizes.forEach((s) => draw(canvasRefs.current[s], s));
  });

  const download = (size) => {
    const canvas = canvasRefs.current[size];
    const link = document.createElement("a");
    link.download = `favicon-${size}x${size}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadAll = () => {
    sizes.forEach((s, i) => setTimeout(() => download(s), i * 150));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3">
        <canvas
          ref={previewRef}
          width={128}
          height={128}
          className="rounded-lg border border-border"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={2}
          placeholder="A"
          className="w-24 rounded-lg border border-border px-3 py-2 text-center text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Background</label>
          <div className="flex flex-wrap gap-1.5">
            {BG_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setBgColor(c)}
                className={`h-6 w-6 rounded-full border-2 ${bgColor === c ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="h-6 w-6 cursor-pointer rounded-full border border-border" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Text color</label>
          <div className="flex gap-1.5">
            {["#ffffff", "#000000"].map((c) => (
              <button
                key={c}
                onClick={() => setTextColor(c)}
                className={`h-6 w-6 rounded-full border-2 ${textColor === c ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: c, boxShadow: c === "#ffffff" ? "inset 0 0 0 1px #e2e8f0" : "none" }}
              />
            ))}
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-6 w-6 cursor-pointer rounded-full border border-border" />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Shape</label>
        <div className="flex gap-1.5">
          {[["rounded", "Rounded"], ["circle", "Circle"], ["square", "Square"]].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setShape(v)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                shape === v ? "border-primary bg-primary/5 text-primary" : "border-border text-slate-500 hover:bg-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={downloadAll} className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90">
        <Download className="h-4 w-4" /> Download All Sizes
      </button>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-1">
            <canvas
              ref={(el) => (canvasRefs.current[size] = el)}
              width={size}
              height={size}
              className="rounded border border-border"
              style={{ width: 48, height: 48 }}
            />
            <button onClick={() => download(size)} className="text-[10px] text-slate-400 hover:text-primary">
              {size}×{size}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
