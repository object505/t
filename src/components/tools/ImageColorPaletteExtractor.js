'use client'
import { useState, useRef } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { Upload } from "lucide-react";

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function extractPalette(imageData, count) {
  const buckets = new Map();
  const data = imageData.data;
  const step = 4;
  const quantize = 24;

  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 128) continue;
    const key = `${Math.floor(r / quantize)},${Math.floor(g / quantize)},${Math.floor(b / quantize)}`;
    if (!buckets.has(key)) buckets.set(key, { r: 0, g: 0, b: 0, count: 0 });
    const bucket = buckets.get(key);
    bucket.r += r; bucket.g += g; bucket.b += b; bucket.count += 1;
  }

  const sorted = Array.from(buckets.values()).sort((a, b) => b.count - a.count);
  return sorted.slice(0, count).map((b) => rgbToHex(Math.round(b.r / b.count), Math.round(b.g / b.count), Math.round(b.b / b.count)));
}

export default function ImagePaletteExtractor() {
  const [imageSrc, setImageSrc] = useState(null);
  const [palette, setPalette] = useState([]);
  const [colorCount, setColorCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target.result;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 300;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setPalette(extractPalette(imageData, colorCount));
        setLoading(false);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => processFile(e.target.files?.[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    processFile(e.dataTransfer.files?.[0]);
  };

  const allHex = palette.map((h) => h.toUpperCase()).join(", ");

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-center hover:border-primary/40"
      >
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" className="max-h-48 rounded-lg object-contain" />
        ) : (
          <>
            <Upload className="h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-500">Click or drag an image here</p>
          </>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </div>

      {imageSrc && (
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-400">Number of colors: {colorCount}</label>
          <input
            type="range"
            min="3"
            max="10"
            value={colorCount}
            onChange={(e) => {
              const n = +e.target.value;
              setColorCount(n);
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxDim = 300;
                const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                setPalette(extractPalette(ctx.getImageData(0, 0, canvas.width, canvas.height), n));
              };
              img.src = imageSrc;
            }}
            className="w-full accent-primary"
          />
        </div>
      )}

      {loading && <div className="text-center text-sm text-slate-400">Analyzing image…</div>}

      {palette.length > 0 && (
        <>
          <div className="overflow-hidden rounded-lg border border-border">
            {palette.map((hex, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: hex }}>
                <span className="font-mono text-sm font-medium" style={{ color: parseInt(hex.slice(1), 16) > 0x999999 ? "#1e293b" : "#fff" }}>
                  {hex.toUpperCase()}
                </span>
                <CopyButton value={hex.toUpperCase()} label="" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <span className="text-xs text-slate-400">Copy all as comma-separated list</span>
            <CopyButton value={allHex} label="Copy all" />
          </div>
        </>
      )}

      <p className="text-center text-xs text-slate-400">Images are processed entirely in your browser and never uploaded anywhere.</p>
    </div>
  );
}
