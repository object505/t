'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

function randomHex(n) { return Array.from({ length: n }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""); }

export default function RandomColor() {
  const [colors, setColors] = useState(() => Array.from({ length: 5 }, () => "#" + randomHex(6)));

  const generate = () => setColors(Array.from({ length: 5 }, () => "#" + randomHex(6)));

  return (
    <div className="space-y-4">
      <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Generate</button>
      <div className="space-y-2">
        {colors.map((c, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-2">
            <div className="h-12 w-12 shrink-0 rounded-lg border border-border" style={{ backgroundColor: c }} />
            <code className="flex-1 font-mono text-sm text-slate-700">{c.toUpperCase()}</code>
            <CopyButton value={c.toUpperCase()} label="" />
          </div>
        ))}
      </div>
    </div>
  );
}
