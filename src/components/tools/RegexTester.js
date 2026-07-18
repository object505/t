'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null };
    try {
      const re = new RegExp(pattern, flags);
      const results = [];
      if (flags.includes("g")) {
        let m;
        while ((m = re.exec(text)) !== null) { results.push({ match: m[0], index: m.index }); if (m.index === re.lastIndex) re.lastIndex++; }
      } else {
        const m = re.exec(text);
        if (m) results.push({ match: m[0], index: m.index });
      }
      return { matches: results, error: null };
    } catch (e) {
      return { matches: [], error: e.message };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (error || matches.length === 0) return null;
    let parts = [];
    let last = 0;
    matches.forEach((m, i) => {
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push(<mark key={i} className="rounded bg-amber-200 px-0.5 text-slate-900">{m.match}</mark>);
      last = m.index + m.match.length;
    });
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  }, [matches, text, error]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="font-mono text-lg text-slate-400">/</span>
        <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="pattern" className="flex-1 rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
        <span className="font-mono text-lg text-slate-400">/</span>
        <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gim" className="w-16 rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
      </div>
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">⚠ {error}</div>
      ) : (
        <div className="rounded-lg border border-border bg-green-50 px-4 py-2 text-sm text-green-600">{matches.length} match{matches.length !== 1 ? "es" : ""} found</div>
      )}
      <ToolTextarea value={text} onChange={setText} placeholder="Test string…" ariaLabel="Test string input" rows={4} />
      {highlighted && (
        <div className="rounded-lg border border-border bg-slate-50 p-3">
          <div className="mb-1 text-xs font-medium text-slate-500">Matches highlighted:</div>
          <div className="whitespace-pre-wrap break-words font-mono text-sm text-slate-700">{highlighted}</div>
        </div>
      )}
    </div>
  );
}
