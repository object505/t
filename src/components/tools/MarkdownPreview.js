'use client'
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function MarkdownPreview() {
  const [text, setText] = useState("# Hello World\n\nType **Markdown** on the left to see a live _preview_ on the right.\n\n- Item one\n- Item two\n\n[A link](https://example.com)");

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Markdown</label>
        <ToolTextarea value={text} onChange={setText} placeholder="# Write markdown here…" ariaLabel="Markdown input" rows={14} className="font-mono" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Preview</label>
          <CopyButton value={text} label="Copy MD" />
        </div>
        <div className="min-h-[340px] rounded-lg border border-border bg-white p-4 overflow-y-auto scrollbar-thin">
          <ReactMarkdown className="prose prose-sm max-w-none prose-headings:text-slate-800 prose-p:text-muted-foreground prose-a:text-primary">
            {text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
