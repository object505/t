'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function JsMinifier() {
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    if (!input.trim()) return "";
    let js = input;
    js = js.replace(/\/\*[\s\S]*?\*\//g, "");
    js = js.replace(/\/\/.*$/gm, "");
    js = js.replace(/\s+/g, " ");
    js = js.replace(/\s*([{}();,:=<>+\-*\/&|!?])\s*/g, "$1");
    js = js.trim();
    return js;
  }, [input]);
  const saved = input && output ? Math.max(0, input.length - output.length) : 0;

  return (
    <div className="space-y-3">
      <ToolTextarea value={input} onChange={setInput} placeholder="function hello() {\n  console.log('hi');\n}" ariaLabel="JS input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "Minified output…"}</pre>
        {output && <CopyButton value={output} />}
      </div>
      {saved > 0 && <div className="text-xs text-slate-400">Saved {saved} bytes ({Math.round((saved / input.length) * 100)}%) — basic minification; use a build tool for production.</div>}
    </div>
  );
}
