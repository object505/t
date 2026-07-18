'use client'
import { useState, useMemo } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

const WORDS = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const SCALES = { hundred: 100, thousand: 1000, million: 1000000, billion: 1000000000 };

export default function WordsToNumber() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    const words = input.toLowerCase().replace(/[^a-z\s]/g, "").trim().split(/\s+/);
    let total = 0, current = 0;
    for (const w of words) {
      if (WORDS[w] !== undefined) current += WORDS[w];
      else if (SCALES[w] !== undefined) { current = (current || 1) * SCALES[w]; if (SCALES[w] >= 1000) { total += current; current = 0; } }
      else return { error: `Unknown word: "${w}"` };
    }
    return { value: total + current };
  }, [input]);

  return (
    <div className="space-y-4">
      <ToolInput label="Number in words" value={input} onChange={(e) => setInput(e.target.value)} placeholder="one hundred twenty three" />
      {result && (result.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{result.error}</div>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-4">
          <code className="font-mono text-2xl font-bold text-primary">{result.value.toLocaleString()}</code>
          <CopyButton value={String(result.value)} />
        </div>
      ))}
    </div>
  );
}
