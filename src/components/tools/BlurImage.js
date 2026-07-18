'use client'
import { useState } from "react";
import { Download } from "lucide-react";

export default function BlurImage() {
  const [img, setImg] = useState(null);
  const [blur, setBlur] = useState(5);
  const [output, setOutput] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setImg(ev.target.result); applyBlur(ev.target.result, blur); };
    reader.readAsDataURL(file);
  };

  const applyBlur = (src, b) => {
    const i = new Image();
    i.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = i.width; canvas.height = i.height;
      const ctx = canvas.getContext("2d");
      ctx.filter = `blur(${b}px)`;
      ctx.drawImage(i, 0, 0);
      setOutput(canvas.toDataURL("image/png"));
    };
    i.src = src;
  };

  const onBlurChange = (b) => { setBlur(b); if (img) applyBlur(img, b); };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white" />
      {img && (
        <>
          <div><label className="text-sm font-medium text-muted-foreground">Blur: {blur}px</label><input type="range" min="0" max="30" value={blur} onChange={(e) => onBlurChange(+e.target.value)} className="w-full accent-primary" /></div>
          {output && (
            <div>
              <img src={output} alt="Blurred" className="max-h-64 rounded-lg border border-border" />
              <a href={output} download="blurred.png" className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"><Download className="h-4 w-4" /> Download</a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
