'use client'
import { useState } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  const tags = [
    title && `<title>${title}</title>`,
    title && `<meta name="title" content="${title}">`,
    desc && `<meta name="description" content="${desc}">`,
    title && `<meta property="og:title" content="${title}">`,
    desc && `<meta property="og:description" content="${desc}">`,
    url && `<meta property="og:url" content="${url}">`,
    image && `<meta property="og:image" content="${image}">`,
    title && `<meta name="twitter:card" content="summary_large_image">`,
    title && `<meta name="twitter:title" content="${title}">`,
    desc && `<meta name="twitter:description" content="${desc}">`,
    image && `<meta name="twitter:image" content="${image}">`,
  ].filter(Boolean).join("\n");

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ToolInput label="Page title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Page" />
        <ToolInput label="URL" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
        <ToolInput label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="A short description…" />
        <ToolInput label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/og.png" />
      </div>
      {tags && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Generated tags</span>
            <CopyButton value={tags} label="Copy tags" />
          </div>
          <pre className="overflow-x-auto rounded-lg border border-border bg-slate-900 p-4 font-mono text-xs text-green-400 scrollbar-thin">{tags}</pre>
        </div>
      )}
    </div>
  );
}
