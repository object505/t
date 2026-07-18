'use client'
import { useState, useMemo } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

const STOP_WORDS = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "must", "can", "this", "that", "these", "those", "i", "you", "he", "she", "it", "we", "they", "what", "which", "who", "when", "where", "why", "how", "all", "each", "every", "some", "any", "no", "not", "as", "if", "then", "than", "so"]);

export default function HashtagGenerator() {
  const [input, setInput] = useState("");

  const hashtags = useMemo(() => {
    if (!input.trim()) return [];
    const words = input.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    return [...new Set(words.filter((w) => !STOP_WORDS.has(w)).map((w) => "#" + w))].slice(0, 30);
  }, [input]);

  const output = hashtags.join(" ");

  return (
    <div className="space-y-4">
      <ToolInput label="Keywords or description" value={input} onChange={(e) => setInput(e.target.value)} placeholder="travel photography nature adventure" />
      {hashtags.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((h) => (
              <span key={h} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">{h}</span>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-3">
            <code className="break-all font-mono text-xs text-slate-700">{output}</code>
            <CopyButton value={output} />
          </div>
        </>
      )}
    </div>
  );
}
