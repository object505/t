'use client'
import { useState } from "react";
import { CopyButton, ToolInput } from '@/components/tools/ToolUI'

function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= n; i++) result *= i;
  return result;
}

// Adds thousands separators to a very large BigInt-as-string number
function formatBigNumber(str) {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function FactorialCalculator() {
  const [input, setInput] = useState("10");
  const num = parseInt(input);
  const valid = input.trim() !== "" && Number.isInteger(num) && num >= 0 && num <= 5000;

  const result = valid ? factorial(BigInt(num)) : null;
  const resultStr = result !== null ? formatBigNumber(result.toString()) : null;
  const digitCount = result !== null ? result.toString().length : 0;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <ToolInput
          type="number"
          min="0"
          max="5000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          label='n! (n between 0 and 5000)'
        />
      </div>

      {!valid ? (
        <div className="rounded-lg border border-border bg-slate-50 p-4 text-center text-sm text-slate-400">
          Enter a whole number from 0 to 5000
        </div>
      ) : (
        <div className="space-y-2">
          <div className="rounded-xl border border-border bg-slate-50 p-4">
            <div className="text-xs text-slate-400">{num}! =</div>
            <div className="mt-1 break-all font-mono text-lg font-bold text-slate-800">{resultStr}</div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs text-slate-400">
            <span>{digitCount.toLocaleString()} digit{digitCount !== 1 ? "s" : ""}</span>
            <CopyButton value={result.toString()} label="" />
          </div>
        </div>
      )}
    </div>
  );
}
