'use client'
import { useState } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function SerpSnippetPreview() {
  const [title, setTitle] = useState("My Awesome Page");
  const [url, setUrl] = useState("https://example.com/page");
  const [desc, setDesc] = useState("This is a meta description that will appear in Google search results. Keep it under 160 characters for best results.");

  return (
    <div className="space-y-4">
      <ToolInput label="Page title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <ToolInput label="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <div className="space-y-1.5"><label className="text-sm font-medium text-muted-foreground">Meta description ({desc.length}/160)</label><textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
      <div>
        <div className="mb-2 text-sm font-medium text-muted-foreground">Google Preview</div>
        <div className="max-w-lg rounded-lg border border-border bg-white p-4">
          <div className="text-xs text-green-700">{url.replace(/^https?:\/\//, "").split("/")[0]} › {url.split("/").slice(3).join(" › ")}</div>
          <div className="mt-0.5 text-xl text-[#1a0dab] hover:underline cursor-pointer line-clamp-2">{title}</div>
          <div className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{desc}</div>
        </div>
      </div>
    </div>
  );
}
