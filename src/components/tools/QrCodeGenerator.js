'use client'
import { useState } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";
import { Download } from "lucide-react";

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(250);

  const qrUrl = text.trim()
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
    : "";

  return (
    <div className="space-y-4">
      <ToolInput label="Text or URL" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com" />
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Size: {size}px</label>
        <input type="range" min="100" max="500" step="50" value={size} onChange={(e) => setSize(+e.target.value)} className="w-full accent-primary" />
      </div>
      {qrUrl ? (
        <div className="flex flex-col items-center gap-3">
          <img src={qrUrl} alt="QR Code" className="rounded-lg border border-border" width={size} height={size} />
          <div className="flex gap-2">
            <CopyButton value={text} label="Copy data" />
            <a href={qrUrl} download="qr-code.png" target="_blank" rel="noopener" className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/30">
              <Download className="h-4 w-4" /> Download
            </a>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm text-slate-400">Enter text to generate a QR code.</div>
      )}
    </div>
  );
}
