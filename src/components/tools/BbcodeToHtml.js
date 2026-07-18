'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function BbcodeToHtml() {
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    if (!input.trim()) return "";
    return input
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\[b\](.*?)\[\/b\]/gi, "<strong>$1</strong>")
      .replace(/\[i\](.*?)\[\/i\]/gi, "<em>$1</em>")
      .replace(/\[u\](.*?)\[\/u\]/gi, "<u>$1</u>")
      .replace(/\[s\](.*?)\[\/s\]/gi, "<s>$1</s>")
      .replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>')
      .replace(/\[url\](.*?)\[\/url\]/gi, '<a href="$1">$1</a>')
      .replace(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" alt="" />')
      .replace(/\[color=(.*?)\](.*?)\[\/color\]/gi, '<span style="color:$1">$2</span>')
      .replace(/\[size=(.*?)\](.*?)\[\/size\]/gi, '<span style="font-size:$1">$2</span>')
      .replace(/\[quote\](.*?)\[\/quote\]/gi, "<blockquote>$1</blockquote>")
      .replace(/\[code\](.*?)\[\/code\]/gi, "<pre><code>$1</code></pre>")
      .replace(/\[list\](.*?)\[\/list\]/gis, "<ul>$1</ul>")
      .replace(/\[\*\](.*?)($|\n)/gi, "<li>$1</li>")
      .replace(/\n/g, "<br />");
  }, [input]);

  return (
    <div className="space-y-3">
      <ToolTextarea value={input} onChange={setInput} placeholder="[b]Bold text[/b] and [i]italic[/i]" ariaLabel="BBCode input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "HTML output…"}</pre>
        {output && <CopyButton value={output} />}
      </div>
    </div>
  );
}
