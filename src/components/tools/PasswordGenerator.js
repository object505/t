'use client'
import { useState, useCallback, useEffect } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: false });
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const generate = useCallback(() => {
    const chars = Object.keys(opts).filter((k) => opts[k]).map((k) => SETS[k]).join("");
    if (!chars) { setPassword(""); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let pw = "";
    for (let i = 0; i < length; i++) pw += chars[arr[i] % chars.length];
    setPassword(pw);

    // strength estimate
    const pool = chars.length;
    const entropy = length * Math.log2(pool);
    setStrength(entropy >= 100 ? "Very Strong" : entropy >= 70 ? "Strong" : entropy >= 50 ? "Medium" : "Weak");
  }, [length, opts]);

  useEffect(() => { generate(); }, [generate]);

  const strengthColor = { "Very Strong": "text-green-600 bg-green-50 border-green-200", "Strong": "text-green-600 bg-green-50 border-green-200", "Medium": "text-amber-600 bg-amber-50 border-amber-200", "Weak": "text-red-600 bg-red-50 border-red-200" }[strength];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-slate-50 p-3">
        <code className="flex-1 break-all font-mono text-sm text-slate-800">{password || "Select at least one option"}</code>
        <button onClick={generate} className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-primary" aria-label="Regenerate"><RefreshCw className="h-4 w-4" /></button>
        <CopyButton value={password} />
      </div>
      {strength && (
        <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${strengthColor}`}>Strength: {strength}</span>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Length: <span className="font-mono text-primary">{length}</span></label>
        <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(+e.target.value)} className="w-full accent-primary" />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.keys(SETS).map((k) => (
          <label key={k} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground cursor-pointer hover:border-primary/30">
            <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} className="accent-primary" />
            <span className="capitalize">{k}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
