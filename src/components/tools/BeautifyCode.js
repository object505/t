'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function BeautifyCode() {
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("js");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    if (lang === "html") return beautifyHtml(input);
    if (lang === "css") return beautifyCss(input);
    return beautifyJs(input);
  }, [input, lang]);

  function beautifyHtml(html) {
    let formatted = "", indent = 0;
    html.replace(/>\s+</g, "><").trim().split(/(?=<)/).forEach((tag) => {
      if (tag.match(/^<\/\w/)) indent = Math.max(0, indent - 1);
      formatted += "  ".repeat(indent) + tag.trim() + "\n";
      if (tag.match(/^<\w[^>]*[^/]>$/) && !tag.startsWith("</") && !tag.includes("</")) indent++;
    });
    return formatted.trim();
  }

  function beautifyCss(css) {
    return css.replace(/\s*([{}:;,])\s*/g, "$1").replace(/{/g, " {\n  ").replace(/}/g, "\n}\n").replace(/;/g, ";\n  ").replace(/,\n/g, ",\n").replace(/\n\s*\n/g, "\n").trim();
  }

  function beautifyJs(js) {
    let out = "", indent = 0;
    js.replace(/;\s*/g, ";\n").split("\n").forEach((line) => {
      line = line.trim();
      if (!line) return;
      if (line.startsWith("}")) indent = Math.max(0, indent - 1);
      out += "  ".repeat(indent) + line + "\n";
      const opens = (line.match(/{/g) || []).length;
      const closes = (line.match(/}/g) || []).length;
      indent += opens - closes;
      if (indent < 0) indent = 0;
    });
    return out.trim();
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[["js", "JavaScript"], ["html", "HTML"], ["css", "CSS"]].map(([v, l]) => (
          <button key={v} onClick={() => setLang(v)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${lang === v ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{l}</button>
        ))}
      </div>
      <ToolTextarea value={input} onChange={setInput} placeholder="Paste your code here…" ariaLabel="Code input" rows={6} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "Beautified output…"}</pre>
        {output && <CopyButton value={output} />}
      </div>
    </div>
  );
}
