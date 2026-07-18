'use client'
import { useState } from "react";
import { Download } from "lucide-react";

export default function RotateImage() {
  const [img, setImg] = useState(null);
  const [angle, setAngle] = useState(90);
  const [output, setOutput] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setImg(ev.target.result); rotate(ev.target.result, angle); };
    reader.readAsDataURL(file);
  };

  const rotate = (src, deg) => {
    const i = new Image();
    i.onload = () => {
      const rad = (deg * Math.PI) / 180;
      const canvas = document.createElement("canvas");
      canvas.width = Math.abs(i.width * Math.cos(rad)) + Math.abs(i.height * Math.sin(rad));
      canvas.height = Math.abs(i.width * Math.sin(rad)) + Math.abs(i.height * Math.cos(rad));
      const ctx = canvas.getContext("2d");
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      ctx.drawImage(i, -i.width / 2, -i.height / 2);
      setOutput(canvas.toDataURL("image/png"));
    };
    i.src = src;
  };

  const onAngleChange = (a) => { setAngle(a); if (img) rotate(img, a); };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white" />
      {img && (
        <>
          <div><label className="text-sm font-medium text-muted-foreground">Angle: {angle}°</label><input type="range" min="0" max="360" value={angle} onChange={(e) => onAngleChange(+e.target.value)} className="w-full accent-primary" /></div>
          <div className="flex gap-2">{[90, 180, 270].map((a) => <button key={a} onClick={() => onAngleChange(a)} className="rounded-lg border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/30">{a}°</button>)}</div>
          {output && <div><img src={output} alt="Rotated" className="max-h-64 rounded-lg border border-border" /><a href={output} download="rotated.png" className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"><Download className="h-4 w-4" /> Download</a></div>}
        </>
      )}
    </div>
  );
}
