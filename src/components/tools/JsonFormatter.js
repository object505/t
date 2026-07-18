'use client'
import { useState } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function JsonFormatter() {
  const [text, setText] = useState("");
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState("");

  const format = (minify = false) => {
    try {
      const parsed = JSON.parse(text);
      const out = JSON.stringify(parsed, null, minify ? 0 : indent);
      setText(out);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => format(false)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Beautify</button>
        <button onClick={() => format(true)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/30">Minify</button>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground">Indent</label>
          <select value={indent} onChange={(e) => setIndent(+e.target.value)} className="rounded-lg border border-border px-2 py-1.5 text-sm outline-none focus:border-primary">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Tab</option>
          </select>
        </div>
      </div>
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">⚠ {error}</div>
      ) : (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-600">✓ Valid JSON</div>
      )}
      <ToolTextarea value={text} onChange={setText} placeholder='{"key": "value"}' ariaLabel="JSON input" rows={10} />
      <div className="flex justify-end">
        <CopyButton value={text} label="Copy JSON" />
      </div>
    </div>
  );
}
