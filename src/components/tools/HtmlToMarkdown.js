'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function HtmlToMarkdown() {
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    if (!input.trim()) return "";
    let md = input;
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n");
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n");
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n");
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n");
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n");
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n");
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");
    md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, "```\n$1\n```\n");
    md = md.replace(/<a[^>]*href="(.*?)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");
    md = md.replace(/<img[^>]*src="(.*?)"[^>]*alt="(.*?)"[^>]*\/?>/gi, '![$2]($1)');
    md = md.replace(/<img[^>]*src="(.*?)"[^>]*\/?>/gi, '![]($1)');
    md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
    md = md.replace(/<\/?(ul|ol)[^>]*>/gi, "");
    md = md.replace(/<br\s*\/?>/gi, "\n");
    md = md.replace(/<hr\s*\/?>/gi, "\n---\n");
    md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, "> $1\n");
    md = md.replace(/<\/p>/gi, "\n\n");
    md = md.replace(/<[^>]+>/g, "");
    md = md.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
    md = md.replace(/\n{3,}/g, "\n\n").trim();
    return md;
  }, [input]);

  return (
    <div className="space-y-3">
      <ToolTextarea value={input} onChange={setInput} placeholder="<h1>Title</h1><p>Hello <strong>world</strong></p>" ariaLabel="HTML input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "Markdown output…"}</pre>
        {output && <CopyButton value={output} />}
      </div>
    </div>
  );
}
