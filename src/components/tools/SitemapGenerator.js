'use client'
import { useState } from "react";
import { ToolInput, ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function SitemapGenerator() {
  const [urls, setUrls] = useState("https://example.com/\nhttps://example.com/about\nhttps://example.com/contact");
  const [freq, setFreq] = useState("weekly");

  const output = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.split("\n").filter(Boolean).map((u) => `  <url>\n    <loc>${u.trim()}</loc>\n    <changefreq>${freq}</changefreq>\n  </url>`).join("\n")}\n</urlset>`;

  return (
    <div className="space-y-4">
      <ToolTextarea value={urls} onChange={setUrls} placeholder="One URL per line…" ariaLabel="URLs" rows={5} />
      <div className="space-y-1.5"><label className="text-sm font-medium text-muted-foreground">Change frequency</label><select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">{["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].map((f) => <option key={f}>{f}</option>)}</select></div>
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output}</pre>
        <CopyButton value={output} />
      </div>
    </div>
  );
}
