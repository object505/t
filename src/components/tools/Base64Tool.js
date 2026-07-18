'use client'
import { useState } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function Base64Tool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("encode");

  const result = (() => {
    try {
      if (mode === "encode") {
        const bytes = new TextEncoder().encode(text);
        let bin = "";
        bytes.forEach((b) => (bin += String.fromCharCode(b)));
        return btoa(bin);
      }
      const bin = atob(text.trim());
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    } catch {
      return "Error: invalid Base64 input";
    }
  })();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["encode", "Encode"], ["decode", "Decode"]].map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${mode === m ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{label}</button>
        ))}
      </div>
      <ToolTextarea value={text} onChange={setText} placeholder={mode === "encode" ? "Enter text to encode…" : "Enter Base64 to decode…"} ariaLabel="Base64 input" />
      <div className="flex items-start justify-between gap-2">
        <div className="min-h-[80px] flex-1 rounded-lg border border-border bg-slate-50 p-3 font-mono text-sm text-slate-800 break-all">{result || "Result appears here"}</div>
        <CopyButton value={result} />
      </div>
    </div>
  );
}
