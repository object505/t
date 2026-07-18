'use client'
import { useState } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function OpenGraphPreview() {
  const [title, setTitle] = useState("My Awesome Page — Check it out!");
  const [desc, setDesc] = useState("This is a description of the page that will appear in social media previews.");
  const [url, setUrl] = useState("https://example.com");

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <ToolInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <ToolInput label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <ToolInput label="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <div>
        <div className="mb-2 text-sm font-medium text-muted-foreground">Preview</div>
        <div className="max-w-md overflow-hidden rounded-xl border border-border shadow-sm">
          <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
            <div className="text-center"><div className="text-4xl">🖼️</div><div className="mt-2 text-xs">og:image</div></div>
          </div>
          <div className="p-3">
            <div className="text-xs uppercase text-slate-400">{url.replace(/^https?:\/\//, "").split("/")[0]}</div>
            <div className="mt-1 font-semibold text-slate-900 line-clamp-2">{title}</div>
            <div className="mt-0.5 text-sm text-slate-500 line-clamp-2">{desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
