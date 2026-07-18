'use client'
import { useState, useMemo } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

export default function XmlToJson() {
  const [input, setInput] = useState("");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/xml");
      if (doc.querySelector("parsererror")) return "Error: Invalid XML";
      return JSON.stringify(xmlToJson(doc.documentElement), null, 2);
    } catch (e) { return "Error: " + e.message; }
  }, [input]);

  function xmlToJson(node) {
    const obj = {};
    if (node.attributes && node.attributes.length > 0) {
      for (const attr of node.attributes) obj["@" + attr.name] = attr.value;
    }
    if (node.childElementCount === 0) {
      const text = node.textContent.trim();
      if (text) return node.attributes?.length ? { ...obj, "#text": text } : text;
      return node.attributes?.length ? obj : "";
    }
    for (const child of node.children) {
      if (obj[child.tagName]) {
        if (!Array.isArray(obj[child.tagName])) obj[child.tagName] = [obj[child.tagName]];
        obj[child.tagName].push(xmlToJson(child));
      } else obj[child.tagName] = xmlToJson(child);
    }
    return obj;
  }

  return (
    <div className="space-y-3">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="<root><item>value</item></root>" rows={6} className="w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "JSON output…"}</pre>
        {output && !output.startsWith("Error") && <CopyButton value={output} />}
      </div>
    </div>
  );
}
