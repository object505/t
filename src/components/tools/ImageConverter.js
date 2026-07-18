'use client'
import { useState } from "react";
import { Download } from "lucide-react";

export default function ImageConverter({ targetFormat = "png" }) {
  const [img, setImg] = useState(null);
  const [output, setOutput] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setImg(ev.target.result); convert(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const convert = (src) => {
    const i = new Image();
    i.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = i.width; canvas.height = i.height;
      const ctx = canvas.getContext("2d");
      if (targetFormat === "jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(i, 0, 0);
      setOutput(canvas.toDataURL(`image/${targetFormat}`));
    };
    i.src = src;
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white" />
      {output && (
        <div>
          <img src={output} alt="Converted" className="max-h-48 rounded-lg border border-border" />
          <a href={output} download={`converted.${targetFormat === "jpeg" ? "jpg" : targetFormat}`} className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"><Download className="h-4 w-4" /> Download {targetFormat.toUpperCase()}</a>
        </div>
      )}
    </div>
  );
}
