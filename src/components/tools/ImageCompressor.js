'use client'
import { useState, useRef } from "react";
import { Download } from "lucide-react";

export default function ImageCompressor() {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [quality, setQuality] = useState(60);
  const [origSize, setOrigSize] = useState(0);
  const [newSize, setNewSize] = useState(0);
  const canvasRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOrigSize(file.size);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setOriginal(ev.target.result);
      compress(ev.target.result, quality);
    };
    reader.readAsDataURL(file);
  };

  const compress = (src, q) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      const data = canvas.toDataURL("image/jpeg", q / 100);
      setCompressed(data);
      setNewSize(Math.round(data.length * 0.75));
    };
    img.src = src;
  };

  const onQualityChange = (q) => { setQuality(q); if (original) compress(original, q); };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />
      <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white" />
      {original && (
        <>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">Quality: {quality}%</label>
            <input type="range" min="10" max="100" value={quality} onChange={(e) => onQualityChange(+e.target.value)} className="w-full accent-primary" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs text-slate-400">Original ({(origSize / 1024).toFixed(1)} KB)</div>
              <img src={original} alt="Original" className="mt-1 w-full rounded-lg border border-border" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Compressed ({(newSize / 1024).toFixed(1)} KB)</div>
              <img src={compressed} alt="Compressed" className="mt-1 w-full rounded-lg border border-border" />
              {compressed && <a href={compressed} download="compressed.jpg" className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"><Download className="h-4 w-4" /> Download</a>}
            </div>
          </div>
          {origSize > 0 && newSize > 0 && (
            <div className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-600">
              Reduced by {Math.max(0, Math.round((1 - newSize / origSize) * 100))}%
            </div>
          )}
        </>
      )}
    </div>
  );
}
