'use client'
import { useState, useMemo } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

export default function UrlParser() {
  const [url, setUrl] = useState("https://user:pass@example.com:8080/path/to/page?query=1&sort=asc#section");

  const parsed = useMemo(() => {
    if (!url.trim()) return null;
    try { return new URL(url); } catch { return null; }
  }, [url]);

  const parts = parsed ? [
    ["Protocol", parsed.protocol],
    ["Hostname", parsed.hostname],
    ["Port", parsed.port || "—"],
    ["Pathname", parsed.pathname],
    ["Search", parsed.search || "—"],
    ["Hash", parsed.hash || "—"],
    ["Username", parsed.username || "—"],
    ["Password", parsed.password || "—"],
  ] : [];

  const params = parsed ? Array.from(parsed.searchParams.entries()) : [];

  return (
    <div className="space-y-4">
      <ToolInput label="URL" value={url} onChange={(e) => setUrl(e.target.value)} className="font-mono" />
      {parsed ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-border">
            {parts.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-border px-3 py-2 text-sm last:border-0">
                <span className="text-slate-500">{label}</span>
                <code className="font-mono text-slate-700 break-all">{value}</code>
              </div>
            ))}
          </div>
          {params.length > 0 && (
            <div>
              <div className="mb-1 text-sm font-medium text-muted-foreground">Query parameters</div>
              <div className="overflow-hidden rounded-lg border border-border">
                {params.map(([k, v], i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border px-3 py-2 text-sm last:border-0">
                    <code className="font-mono text-primary">{k}</code>
                    <div className="flex items-center gap-2"><code className="font-mono text-slate-700">{v}</code><CopyButton value={v} label="" /></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">Invalid URL</div>}
    </div>
  );
}
