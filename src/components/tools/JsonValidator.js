'use client'
import { useState, useMemo } from "react";
import { ToolTextarea } from "@/components/tools/ToolUI";

export default function JsonValidator() {
  const [text, setText] = useState("");
  const result = useMemo(() => {
    if (!text.trim()) return null;
    try {
      JSON.parse(text);
      return { valid: true };
    } catch (e) {
      return { valid: false, error: e.message };
    }
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Paste JSON to validate…" ariaLabel="JSON input" rows={10} />
      {result === null ? (
        <div className="rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm text-slate-400">Enter JSON to validate.</div>
      ) : result.valid ? (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">✓ Valid JSON — no syntax errors found.</div>
      ) : (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">✗ Invalid JSON: {result.error}</div>
      )}
    </div>
  );
}
