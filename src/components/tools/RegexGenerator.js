'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { Sparkles } from "lucide-react";

const PATTERNS = [
  { label: "Email", regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", test: "user@example.com" },
  { label: "URL", regex: "^https?://[\\w.-]+\\.[a-zA-Z]{2,}(/[\\w./?=%&-]*)?$", test: "https://example.com" },
  { label: "Phone (US)", regex: "^\\+?1?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$", test: "+1 (555) 123-4567" },
  { label: "IP Address", regex: "^(\\d{1,3}\\.){3}\\d{1,3}$", test: "192.168.1.1" },
  { label: "Date (YYYY-MM-DD)", regex: "^\\d{4}-\\d{2}-\\d{2}$", test: "2024-01-15" },
  { label: "Hex Color", regex: "^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$", test: "#2563eb" },
  { label: "ZIP Code (US)", regex: "^\\d{5}(-\\d{4})?$", test: "12345" },
  { label: "Strong Password", regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", test: "Str0ng!Pass" },
  { label: "Credit Card", regex: "^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$", test: "4111 1111 1111 1111" },
  { label: "Username", regex: "^[a-zA-Z0-9_]{3,16}$", test: "john_doe123" },
];

export default function RegexGenerator() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-slate-500"><Sparkles className="h-4 w-4 text-primary" /> Select a pattern to generate a regex:</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {PATTERNS.map((p) => (
          <button key={p.label} onClick={() => setSelected(p)} className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${selected?.label === p.label ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
            <div className="font-medium text-slate-700">{p.label}</div>
            <code className="text-xs text-slate-400">{p.test}</code>
          </button>
        ))}
      </div>
      {selected && (
        <div className="space-y-2 rounded-lg border border-border bg-slate-900 p-4">
          <div className="flex items-center justify-between">
            <code className="font-mono text-sm text-green-400">/{selected.regex}/</code>
            <CopyButton value={selected.regex} />
          </div>
        </div>
      )}
    </div>
  );
}
