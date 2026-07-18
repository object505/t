'use client'
import { useState } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function RandomTextGenerator() {
  const [length, setLength] = useState(16);
  const [result, setResult] = useState("");

  const generate = () => {
    const arr = Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
    setResult(arr.join(""));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <ToolInput type="number" label="Length" value={length} onChange={(e) => setLength(Math.max(1, Math.min(1000, +e.target.value)))} />
        <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <RefreshCw className="h-4 w-4" /> Generate
        </button>
      </div>
      {result && (
        <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-50 p-4">
          <code className="break-all font-mono text-sm text-slate-800">{result}</code>
          <CopyButton value={result} />
        </div>
      )}
    </div>
  );
}
