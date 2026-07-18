'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

export default function ImageToBase64() {
  const [result, setResult] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setResult(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white" />
      {result && (
        <>
          <img src={result} alt="Preview" className="max-h-48 rounded-lg border border-border" />
          <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{result.slice(0, 500)}{result.length > 500 ? "…" : ""}</pre>
            <CopyButton value={result} />
          </div>
        </>
      )}
    </div>
  );
}
