'use client'
import { useState, useMemo } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
const SCALES = ["", "thousand", "million", "billion", "trillion"];

function threeDigitsToWords(n) {
  let words = "";
  if (n >= 100) { words += ONES[Math.floor(n / 100)] + " hundred"; n %= 100; if (n) words += " "; }
  if (n >= 20) { words += TENS[Math.floor(n / 10)]; if (n % 10) words += "-" + ONES[n % 10]; }
  else if (n > 0) words += ONES[n];
  return words;
}

function numberToWords(num) {
  if (num === 0) return "zero";
  if (num < 0) return "negative " + numberToWords(-num);
  let words = "";
  let scaleIdx = 0;
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk > 0) {
      const chunkWords = threeDigitsToWords(chunk);
      words = chunkWords + (SCALES[scaleIdx] ? " " + SCALES[scaleIdx] : "") + (words ? " " + words : "");
    }
    num = Math.floor(num / 1000);
    scaleIdx++;
  }
  return words;
}

export default function NumberToWords() {
  const [input, setInput] = useState("");
  const result = useMemo(() => {
    const n = parseInt(input);
    if (isNaN(n)) return null;
    if (n > 999999999999) return "Number too large";
    return numberToWords(n);
  }, [input]);

  return (
    <div className="space-y-4">
      <ToolInput type="number" label="Number" value={input} onChange={(e) => setInput(e.target.value)} placeholder="12345" />
      {result && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-4">
          <span className="text-lg font-medium capitalize text-slate-800">{result}</span>
          <CopyButton value={result} />
        </div>
      )}
    </div>
  );
}
