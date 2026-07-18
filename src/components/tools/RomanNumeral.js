'use client'
import { useState, useMemo } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

const MAP = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(num) {
  if (num < 1 || num > 3999) return null;
  let result = "";
  for (const [v, s] of MAP) { while (num >= v) { result += s; num -= v; } }
  return result;
}

const ROMAN_MAP = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
function fromRoman(str) {
  const s = str.toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(s)) return null;
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = ROMAN_MAP[s[i]], next = ROMAN_MAP[s[i + 1]] || 0;
    if (cur < next) total -= cur; else total += cur;
  }
  return total;
}

export default function RomanNumeral() {
  const [mode, setMode] = useState("toRoman");
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    if (mode === "toRoman") {
      const n = parseInt(input);
      const r = toRoman(n);
      return r || "Enter a number 1–3999";
    }
    const r = fromRoman(input);
    return r !== null ? String(r) : "Invalid Roman numeral";
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[["toRoman", "Number → Roman"], ["fromRoman", "Roman → Number"]].map(([m, l]) => (
          <button key={m} onClick={() => { setMode(m); setInput(""); }} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${mode === m ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{l}</button>
        ))}
      </div>
      <ToolInput type={mode === "toRoman" ? "number" : "text"} label={mode === "toRoman" ? "Number (1–3999)" : "Roman numeral"} value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "toRoman" ? "2024" : "MMXXIV"} className="font-mono" />
      {result && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-4">
          <code className="font-mono text-2xl font-bold text-primary">{result}</code>
          <CopyButton value={result} />
        </div>
      )}
    </div>
  );
}
