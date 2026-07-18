'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function PasswordChecker() {
  const [pw, setPw] = useState("");
  const result = useMemo(() => {
    const checks = [
      { label: "At least 12 characters", pass: pw.length >= 12 },
      { label: "Contains uppercase", pass: /[A-Z]/.test(pw) },
      { label: "Contains lowercase", pass: /[a-z]/.test(pw) },
      { label: "Contains numbers", pass: /[0-9]/.test(pw) },
      { label: "Contains symbols", pass: /[^A-Za-z0-9]/.test(pw) },
    ];
    const score = checks.filter((c) => c.pass).length + (pw.length >= 16 ? 1 : 0);
    const strength = score <= 2 ? "Weak" : score <= 4 ? "Medium" : score <= 5 ? "Strong" : "Very Strong";
    return { checks, strength, score };
  }, [pw]);

  const color = { "Very Strong": "bg-green-500", "Strong": "bg-green-500", "Medium": "bg-amber-500", "Weak": "bg-red-500" }[result.strength];

  return (
    <div className="space-y-4">
      <ToolInput type="password" label="Password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter a password to check…" />
      <div>
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-muted-foreground">Strength</span>
          <span className="font-medium text-slate-800">{result.strength}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${(result.score / 6) * 100}%` }} />
        </div>
      </div>
      <div className="space-y-1.5">
        {result.checks.map((c) => (
          <div key={c.label} className={`flex items-center gap-2 text-sm ${c.pass ? "text-green-600" : "text-slate-400"}`}>
            <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${c.pass ? "bg-green-100 text-green-600" : "bg-slate-100"}`}>
              {c.pass ? "✓" : "•"}
            </span>
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}
