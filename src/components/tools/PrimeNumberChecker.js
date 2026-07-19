'use client'
import { useState } from "react";
import { ToolInput } from '@/components/tools/ToolUI'

function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function primeFactors(n) {
  const factors = [];
  let num = n;
  for (let i = 2; i * i <= num; i++) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }
  if (num > 1) factors.push(num);
  return factors;
}

export default function PrimeChecker() {
  const [input, setInput] = useState("17");
  const num = parseInt(input);
  const valid = input.trim() !== "" && Number.isInteger(num);
  const prime = valid && isPrime(num);
  const factors = valid && num >= 2 ? primeFactors(num) : [];

  const nextPrimes = (() => {
    if (!valid) return [];
    const list = [];
    let candidate = num + 1;
    let guard = 0;
    while (list.length < 3 && guard < 10000) {
      if (isPrime(candidate)) list.push(candidate);
      candidate++;
      guard++;
    }
    return list;
  })();

  return (
    <div className="space-y-4">
      <ToolInput
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a whole number"
      />

      {!valid ? (
        <div className="rounded-lg border border-border bg-slate-50 p-4 text-center text-sm text-slate-400">
          Enter a whole number to check
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`rounded-xl border p-4 text-center ${prime ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"}`}>
            <div className={`text-2xl font-bold ${prime ? "text-emerald-600" : "text-rose-600"}`}>
              {num} is {prime ? "prime" : "not prime"}
            </div>
            {!prime && num >= 2 && (
              <div className="mt-1 text-sm text-rose-500">
                Factors: {factors.join(" × ")}
              </div>
            )}
            {num < 2 && <div className="mt-1 text-sm text-rose-500">Primes are defined only for integers ≥ 2</div>}
          </div>

          {prime && nextPrimes.length > 0 && (
            <div className="rounded-lg border border-border bg-slate-50 p-3 text-center text-sm">
              <span className="text-slate-500">Next primes: </span>
              <span className="font-mono font-medium text-slate-800">{nextPrimes.join(", ")}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
