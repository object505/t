'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function SlugGenerator() {
  const [text, setText] = useState("");
  const [sep, setSep] = useState("-");

  const slug = useMemo(() => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, sep)
      .replace(new RegExp(`^${sep}+|${sep}+$`, "g"), "");
  }, [text, sep]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Enter a title to slugify…" ariaLabel="Title input" />
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Separator:</span>
        {["-", "_"].map((s) => (
          <button key={s} onClick={() => setSep(s)} className={`rounded-lg border px-3 py-1 text-xs font-mono font-medium ${sep === s ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{s}</button>
        ))}
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-h-[48px] flex-1 rounded-lg border border-border bg-slate-50 p-3 font-mono text-sm text-slate-800 break-all">
          {slug || "slug-will-appear-here"}
        </div>
        <CopyButton value={slug} />
      </div>
    </div>
  );
}
