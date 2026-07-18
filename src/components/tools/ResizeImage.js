'use client'
import { useState } from "react";
import { Download } from "lucide-react";

export default function ResizeImage() {
  const [img, setImg] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [output, setOutput] = useState(null);
  const [origDims, setOrigDims] = useState({ w: 0, h: 0 });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImg(ev.target.result);
      const i = new Image();
      i.onload = () => { setWidth(i.width); setHeight(i.height); setOrigDims({ w: i.width, h: i.height }); };
      i.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const onWChange = (w) => { setWidth(w); if (keepRatio && origDims.w) setHeight(Math.round(w * origDims.h / origDims.w)); };
  const onHChange = (h) => { setHeight(h); if (keepRatio && origDims.h) setWidth(Math.round(h * origDims.w / origDims.h)); };

  const doResize = () => {
    if (!img) return;
    const i = new Image();
    i.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      canvas.getContext("2d").drawImage(i, 0, 0, width, height);
      setOutput(canvas.toDataURL("image/png"));
    };
    i.src = img;
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white" />
      {img && (
        <>
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} className="accent-primary" /> Maintain aspect ratio</label>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm text-muted-foreground">Width (px)</label><input type="number" value={width} onChange={(e) => onWChange(+e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
            <div><label className="text-sm text-muted-foreground">Height (px)</label><input type="number" value={height} onChange={(e) => onHChange(+e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
          </div>
          <button onClick={doResize} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90">Resize</button>
          {output && (
            <div>
              <img src={output} alt="Resized" className="w-full rounded-lg border border-border" />
              <a href={output} download="resized.png" className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"><Download className="h-4 w-4" /> Download</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
