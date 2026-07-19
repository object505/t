'use client'
import { useState } from "react";
import { CopyButton, ToolInput } from '@/components/tools/ToolUI'

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export default function GcdLcmCalculator() {
  const [numbersInput, setNumbersInput] = useState("12, 18, 30");

  const numbers = numbersInput
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => parseInt(s))
    .filter((n) => Number.isInteger(n));

  const valid = numbers.length >= 2;
  const gcdResult = valid ? numbers.reduce((a, b) => gcd(a, b)) : null;
  const lcmResult = valid ? numbers.reduce((a, b) => lcm(a, b)) : null;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <ToolInput
          type='text'
          value={numbersInput}
          onChange={(e) => setNumbersInput(e.target.value)}
          placeholder='12, 18, 30'
          label='Numbers (comma-separated, 2 or more)'
        />
      </div>

      {!valid ? (
        <div className="rounded-lg border border-border bg-slate-50 p-4 text-center text-sm text-slate-400">
          Enter at least 2 whole numbers
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-slate-50 p-4 text-center">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">GCD</div>
            <div className="mt-1 font-mono text-2xl font-bold text-primary">{gcdResult}</div>
            <div className="mt-2 flex justify-center"><CopyButton value={String(gcdResult)} label="" /></div>
          </div>
          <div className="rounded-xl border border-border bg-slate-50 p-4 text-center">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">LCM</div>
            <div className="mt-1 break-all font-mono text-2xl font-bold text-primary">{lcmResult.toLocaleString()}</div>
            <div className="mt-2 flex justify-center"><CopyButton value={String(lcmResult)} label="" /></div>
          </div>
        </div>
      )}
    </div>
  );
}
