'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

function b64UrlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { error: "Invalid JWT: expected 3 parts separated by dots" };
    try {
      return {
        header: JSON.parse(b64UrlDecode(parts[0])),
        payload: JSON.parse(b64UrlDecode(parts[1])),
        signature: parts[2],
      };
    } catch (e) {
      return { error: e.message };
    }
  }, [token]);

  const pretty = (obj) => JSON.stringify(obj, null, 2);

  return (
    <div className="space-y-4">
      <ToolTextarea value={token} onChange={setToken} placeholder="Paste a JWT token…" ariaLabel="JWT input" rows={4} />
      {decoded?.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">⚠ {decoded.error}</div>
      ) : decoded ? (
        <div className="space-y-3">
          {["header", "payload"].map((part) => (
            <div key={part} className="rounded-lg border border-border bg-slate-50 p-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{part}</span>
                <CopyButton value={pretty(decoded[part])} label="Copy" />
              </div>
              <pre className="overflow-x-auto font-mono text-xs text-slate-700 scrollbar-thin">{pretty(decoded[part])}</pre>
            </div>
          ))}
          <div className="rounded-lg border border-border bg-slate-50 p-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Signature</span>
            <code className="mt-1 block break-all font-mono text-xs text-slate-400">{decoded.signature}</code>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm text-slate-400">Paste a JWT to decode it.</div>
      )}
    </div>
  );
}
