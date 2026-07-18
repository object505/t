'use client'
import { useState } from "react";
import { Download } from "lucide-react";

export default function SvgOptimizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const optimize = () => {
    let svg = input;
    svg = svg.replace(/<!--[\s\S]*?-->/g, "");
    svg = svg.replace(/\s+/g, " ");
    svg = svg.replace(/>\s+</g, "><");
    svg = svg.replace(/\s+>/g, ">");
    svg = svg.replace(/<\s+/g, "<");
    svg = svg.replace(/\s*=\s*/g, "=");
    svg = svg.replace(/"\s+/g, '" ');
    svg = svg.trim();
    setOutput(svg);
  };

  const saved = input && output ? Math.max(0, input.length - output.length) : 0;

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<svg>...</svg>" rows={6} className="w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
      <button onClick={optimize} disabled={!input.trim()} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40">Optimize SVG</button>
      {output && (
        <>
          <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output}</pre>
            <a href={`data:image/svg+xml;base64,${btoa(output)}`} download="optimized.svg" className="shrink-0"><Download className="h-4 w-4 text-white" /></a>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-border bg-slate-50 p-4" dangerouslySetInnerHTML={{ __html: output }} />
          {saved > 0 && <div className="text-xs text-slate-400">Saved {saved} bytes ({Math.round((saved / input.length) * 100)}%)</div>}
        </>
      )}
    </div>
  );
}
