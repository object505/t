'use client'
import { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { Download } from "lucide-react";

const FORMATS = [
  { value: "CODE128", label: "Code 128 (any text)", validate: (v) => v.length > 0 },
  { value: "CODE39", label: "Code 39 (letters, numbers, - . $ / + % space)", validate: (v) => /^[A-Z0-9\-. $/+%]+$/.test(v.toUpperCase()) },
  { value: "EAN13", label: "EAN-13 (12-13 digits)", validate: (v) => /^\d{12,13}$/.test(v) },
  { value: "EAN8", label: "EAN-8 (7-8 digits)", validate: (v) => /^\d{7,8}$/.test(v) },
  { value: "UPC", label: "UPC-A (11-12 digits)", validate: (v) => /^\d{11,12}$/.test(v) },
  { value: "ITF14", label: "ITF-14 (14 digits)", validate: (v) => /^\d{14}$/.test(v) },
  { value: "MSI", label: "MSI (digits only)", validate: (v) => /^\d+$/.test(v) },
  { value: "pharmacode", label: "Pharmacode (3-131070)", validate: (v) => { const n = parseInt(v); return !isNaN(n) && n >= 3 && n <= 131070; } },
];

export default function BarcodeGenerator() {
  const [text, setText] = useState("HELLO123");
  const [format, setFormat] = useState("CODE128");
  const [showValue, setShowValue] = useState(true);
  const svgRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;

    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    if (!text.trim()) {
      setError(null);
      return;
    }

    const formatConfig = FORMATS.find((f) => f.value === format);
    if (formatConfig && !formatConfig.validate(text.trim())) {
      setError(`"${text}" doesn't match the expected pattern for ${formatConfig.label}.`);
      return;
    }

    try {
      JsBarcode(svgRef.current, text, {
        format,
        width: 2,
        height: 90,
        displayValue: showValue,
        fontSize: 14,
        margin: 10,
      });
      setError(null);
    } catch (e) {
      console.error("Barcode render failed:", e);
      setError(e?.message || "This value isn't valid for the selected barcode format.");
    }
  }, [text, format, showValue]);

  const downloadSVG = () => {
    if (!svgRef.current || error) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `barcode-${format}-${text || "output"}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (!svgRef.current || error) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `barcode-${format}-${text || "output"}.png`;
        link.click();
        URL.revokeObjectURL(pngUrl);
      });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        >
          {FORMATS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a value to encode"
        className="w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary"
      />

      <label className="flex items-center gap-2 text-xs text-slate-500">
        <input type="checkbox" checked={showValue} onChange={(e) => setShowValue(e.target.checked)} className="accent-primary" />
        Show text below barcode
      </label>

      <div className="relative flex min-h-[140px] items-center justify-center overflow-x-auto rounded-lg border border-border bg-white p-4">
        {/* The <svg> now always stays mounted, so svgRef never goes stale. Visibility is controlled with CSS, not by unmounting. */}
        <svg ref={svgRef} style={{ display: error || !text.trim() ? "none" : "block" }} />

        {error && <p className="max-w-xs text-center text-sm text-rose-500">{error}</p>}
        {!error && !text.trim() && <p className="text-sm text-slate-400">Enter a value above to generate a barcode</p>}
      </div>

      <div className="flex gap-2">
        <button
          onClick={downloadSVG}
          disabled={!text.trim() || !!error}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40"
        >
          <Download className="h-4 w-4" /> SVG
        </button>
        <button
          onClick={downloadPNG}
          disabled={!text.trim() || !!error}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40"
        >
          <Download className="h-4 w-4" /> PNG
        </button>
      </div>
    </div>
  );
}
