'use client'
import { useState } from "react";
import { ToolTextarea, ToolInput, CopyButton } from "@/components/tools/ToolUI";

export default function RobotsTxtGenerator() {
  const [agent, setAgent] = useState("*");
  const [disallow, setDisallow] = useState("/admin/\n/private/");
  const [allow, setAllow] = useState("");
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");

  const output = `User-agent: ${agent}\n${allow ? allow.split("\n").filter(Boolean).map((p) => `Allow: ${p}`).join("\n") + "\n" : ""}${disallow ? disallow.split("\n").filter(Boolean).map((p) => `Disallow: ${p}`).join("\n") + "\n" : ""}${sitemap ? `\nSitemap: ${sitemap}` : ""}`.trim();

  return (
    <div className="space-y-4">
      <ToolInput label="User-agent" value={agent} onChange={(e) => setAgent(e.target.value)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div><label className="text-sm font-medium text-muted-foreground">Allow paths (one per line)</label><textarea value={allow} onChange={(e) => setAllow(e.target.value)} rows={4} placeholder="/public/" className="mt-1 w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary" /></div>
        <div><label className="text-sm font-medium text-muted-foreground">Disallow paths (one per line)</label><textarea value={disallow} onChange={(e) => setDisallow(e.target.value)} rows={4} placeholder="/admin/" className="mt-1 w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary" /></div>
      </div>
      <ToolInput label="Sitemap URL" value={sitemap} onChange={(e) => setSitemap(e.target.value)} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output}</pre>
        <CopyButton value={output} />
      </div>
    </div>
  );
}
