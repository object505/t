'use client'
import { useState, useEffect } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

const ALGOS = [
  { label: "SHA-1", value: "SHA-1" },
  { label: "SHA-256", value: "SHA-256" },
  { label: "SHA-512", value: "SHA-512" },
];

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [hashes, setHashes] = useState({});

  useEffect(() => {
    if (!text) { setHashes({}); return; }
    const data = new TextEncoder().encode(text);
    Promise.all(ALGOS.map(async (a) => {
      const buf = await crypto.subtle.digest(a.value, data);
      const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      return [a.value, hex];
    })).then((entries) => setHashes(Object.fromEntries(entries)));
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Enter text to hash…" ariaLabel="Text input" />
      <div className="space-y-3">
        {ALGOS.map((a) => (
          <div key={a.value} className={`rounded-lg border p-3 transition-colors ${algo === a.value ? "border-primary bg-primary/5" : "border-border bg-slate-50"}`} onClick={() => setAlgo(a.value)}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{a.label}</span>
              {hashes[a.value] && <CopyButton value={hashes[a.value]} label="Copy" />}
            </div>
            <code className="block break-all font-mono text-xs text-slate-700">{hashes[a.value] || "—"}</code>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400">Hashes are computed in your browser using the Web Crypto API. MD5 is not available as it's insecure.</p>
    </div>
  );
}
