'use client'
import { useState } from "react";
import { Download } from "lucide-react";

export default function WatermarkImage() {
  const [img, setImg] = useState(null);
  const [text, setText] = useState("WATERMARK");
  const [opacity, setOpacity] = useState(30);
  const [output, setOutput] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setImg(ev.target.result); apply(ev.target.result, text, opacity); };
    reader.readAsDataURL(file);
  };

  const apply = (src, t, op) => {
    const i = new Image();
    i.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = i.width; canvas.height = i.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(i, 0, 0);
      ctx.globalAlpha = op / 100;
      ctx.font = `${Math.max(16, canvas.width / 15)}px sans-serif`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 6);
      ctx.fillText(t, 0, 0);
      setOutput(canvas.toDataURL("image/png"));
    };
    i.src = src;
  };

  const onTextChange = (t) => { setText(t); if (img) apply(img, t, opacity); };
  const onOpacityChange = (op) => { setOpacity(op); if (img) apply(img, text, op); };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white" />
      {img && (
        <>
          <input value={text} onChange={(e) => onTextChange(e.target.value)} placeholder="Watermark text" className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
          <div><label className="text-sm font-medium text-muted-foreground">Opacity: {opacity}%</label><input type="range" min="5" max="100" value={opacity} onChange={(e) => onOpacityChange(+e.target.value)} className="w-full accent-primary" /></div>
          {output && (
            <div>
              <img src={output} alt="Watermarked" className="max-h-64 rounded-lg border border-border" />
              <a href={output} download="watermarked.png" className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"><Download className="h-4 w-4" /> Download</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
