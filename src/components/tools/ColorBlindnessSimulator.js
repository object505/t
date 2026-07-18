'use client'
import { useState } from "react";

export default function ColorBlindnessSimulator() {
  const [img, setImg] = useState(null);
  const [outputs, setOutputs] = useState({});
  const types = [
    { name: "Protanopia", matrix: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758] },
    { name: "Deuteranopia", matrix: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7] },
    { name: "Tritanopia", matrix: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525] },
  ];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImg(ev.target.result);
      const i = new Image();
      i.onload = () => {
        const results = {};
        types.forEach((t) => {
          const canvas = document.createElement("canvas");
          canvas.width = i.width; canvas.height = i.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(i, 0, 0);
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
          for (let j = 0; j < data.data.length; j += 4) {
            const r = data.data[j], g = data.data[j + 1], b = data.data[j + 2];
            data.data[j] = r * t.matrix[0] + g * t.matrix[1] + b * t.matrix[2];
            data.data[j + 1] = r * t.matrix[3] + g * t.matrix[4] + b * t.matrix[5];
            data.data[j + 2] = r * t.matrix[6] + g * t.matrix[7] + b * t.matrix[8];
          }
          ctx.putImageData(data, 0, 0);
          results[t.name] = canvas.toDataURL("image/png");
        });
        setOutputs(results);
      };
      i.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-foreground" />
      {img && <img src={img} alt="Original" className="max-h-32 rounded-lg border border-border" />}
      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(outputs).map(([name, src]) => (
          <div key={name}>
            <div className="mb-1 text-xs font-medium text-muted-foreground">{name}</div>
            <img src={src} alt={name} className="w-full rounded-lg border border-border" />
          </div>
        ))}
      </div>
    </div>
  );
}
