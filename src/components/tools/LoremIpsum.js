'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

function makeSentence() {
  const n = 8 + Math.floor(Math.random() * 12);
  const words = Array.from({ length: n }, () => rand(WORDS));
  words[0] = cap(words[0]);
  let s = words.join(" ");
  s += Math.random() > 0.5 ? "." : ",";
  // ensure ends with period
  return s.replace(/,$/, ".");
}

function makeParagraph() {
  const n = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: n }, makeSentence).join(" ");
}

export default function LoremIpsum() {
  const [count, setCount] = useState(5);
  const [unit, setUnit] = useState("paragraphs");
  const [output, setOutput] = useState("");

  const generate = () => {
    let result = "";
    if (unit === "paragraphs") result = Array.from({ length: count }, makeParagraph).join("\n\n");
    else if (unit === "sentences") result = Array.from({ length: count }, makeSentence).join(" ");
    else result = Array.from({ length: count }, () => rand(WORDS)).join(" ");
    setOutput(result);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-muted-foreground">Amount</label>
          <input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Math.max(1, Math.min(100, +e.target.value)))} className="w-24 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-muted-foreground">Type</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
        <button onClick={generate} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Generate</button>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-h-[160px] flex-1 rounded-lg border border-border bg-slate-50 p-3 text-sm text-slate-700 whitespace-pre-wrap break-words">
          {output || "Generated text will appear here"}
        </div>
        <CopyButton value={output} />
      </div>
    </div>
  );
}
