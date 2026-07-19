'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { Plus, Minus, Eye, EyeOff } from "lucide-react";

export default function EnvFileGenerator() {
  const [vars, setVars] = useState([
    { key: "DATABASE_URL", value: "postgres://user:pass@localhost:5432/mydb" },
    { key: "API_KEY", value: "sk-xxxxxxxxxxxxxxxx" },
    { key: "PORT", value: "3000" },
  ]);
  const [showValues, setShowValues] = useState(true);
  const [quoteValues, setQuoteValues] = useState(false);

  const addVar = () => setVars((v) => [...v, { key: "", value: "" }]);
  const removeVar = (i) => setVars((v) => v.filter((_, idx) => idx !== i));
  const updateVar = (i, field, val) => setVars((v) => v.map((x, idx) => (idx === i ? { ...x, [field]: val } : x)));

  const sanitizeKey = (key) => key.toUpperCase().replace(/[^A-Z0-9_]/g, "_");

  const formatValue = (value) => {
    const needsQuotes = quoteValues || /\s/.test(value);
    return needsQuotes ? `"${value.replace(/"/g, '\\"')}"` : value;
  };

  const envContent = vars
    .filter((v) => v.key.trim())
    .map((v) => `${sanitizeKey(v.key)}=${formatValue(v.value)}`)
    .join("\n");

  const envExampleContent = vars
    .filter((v) => v.key.trim())
    .map((v) => `${sanitizeKey(v.key)}=`)
    .join("\n");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {vars.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={v.key}
              onChange={(e) => updateVar(i, "key", e.target.value)}
              placeholder="KEY_NAME"
              className="w-1/3 rounded-lg border border-border px-2 py-1.5 font-mono text-xs uppercase outline-none focus:border-primary"
            />
            <span className="text-slate-300">=</span>
            <input
              type={showValues ? "text" : "password"}
              value={v.value}
              onChange={(e) => updateVar(i, "value", e.target.value)}
              placeholder="value"
              className="flex-1 rounded-lg border border-border px-2 py-1.5 font-mono text-xs outline-none focus:border-primary"
            />
            <button onClick={() => removeVar(i)} className="shrink-0 rounded p-1 text-slate-300 hover:text-rose-500">
              <Minus className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={addVar} className="flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-slate-500 hover:border-primary/40 hover:text-primary">
          <Plus className="h-3.5 w-3.5" /> Add Variable
        </button>
        <button onClick={() => setShowValues((s) => !s)} className="ml-auto flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600">
          {showValues ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {showValues ? "Hide values" : "Show values"}
        </button>
        <label className="flex items-center gap-1.5 text-xs text-slate-500">
          <input type="checkbox" checked={quoteValues} onChange={(e) => setQuoteValues(e.target.checked)} className="accent-primary" />
          Always quote values
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">.env</span>
          <CopyButton value={envContent} label="Copy .env" />
        </div>
        <pre className="overflow-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100">{envContent || "# No variables yet"}</pre>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">.env.example (safe to commit)</span>
          <CopyButton value={envExampleContent} label="Copy .env.example" />
        </div>
        <pre className="overflow-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100">{envExampleContent || "# No variables yet"}</pre>
      </div>

      <p className="text-center text-xs text-slate-400">This runs entirely in your browser — nothing you type here is sent anywhere.</p>
    </div>
  );
}
