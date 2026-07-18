'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function XmlFormatter() {
  const [input, setInput] = useState("");
  const [minify, setMinify] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/xml");
      if (doc.querySelector("parsererror")) return "Error: Invalid XML";
      const serializer = new XMLSerializer();
      let xml = serializer.serializeToString(doc.documentElement);
      if (minify) return xml.replace(/>\s+</g, "><").trim();
      return formatXml(xml);
    } catch (e) {
      return "Error: " + e.message;
    }
  }, [input, minify]);

  function formatXml(xml) {
    let formatted = "", indent = "";
    const reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, "$1\n$2$3");
    xml.split("\n").forEach((line) => {
      if (line.match(/^<\/\w/)) indent = indent.substring(2);
      formatted += indent + line + "\n";
      if (line.match(/^<\w[^>]*[^/]>.*$/) && !line.includes("</")) indent += "  ";
    });
    return formatted.trim();
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMinify(false)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${!minify ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>Beautify</button>
        <button onClick={() => setMinify(true)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${minify ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>Minify</button>
      </div>
      <ToolTextarea value={input} onChange={setInput} placeholder="<root><item>value</item></root>" ariaLabel="XML input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "Output…"}</pre>
        {output && !output.startsWith("Error") && <CopyButton value={output} />}
      </div>
    </div>
  );
}
