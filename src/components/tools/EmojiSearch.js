'use client'
import { useState, useMemo } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

const EMOJIS = [
  { e: "😀", n: "grinning" }, { e: "😂", n: "joy" }, { e: "❤️", n: "heart" }, { e: "👍", n: "thumbs up" }, { e: "🔥", n: "fire" },
  { e: "🎉", n: "party" }, { e: "💯", n: "100" }, { e: "✅", n: "check" }, { e: "❌", n: "cross" }, { e: "⭐", n: "star" },
  { e: "😍", n: "heart eyes" }, { e: "🤔", n: "thinking" }, { e: "😭", n: "crying" }, { e: "🥳", n: "celebrating" }, { e: "😎", n: "cool" },
  { e: "🚀", n: "rocket" }, { e: "💎", n: "diamond" }, { e: "🎯", n: "target" }, { e: "💡", n: "idea" }, { e: "📈", n: "chart up" },
  { e: "📉", n: "chart down" }, { e: "💰", n: "money" }, { e: "🏆", n: "trophy" }, { e: "⚡", n: "lightning" }, { e: "🌈", n: "rainbow" },
  { e: "🍕", n: "pizza" }, { e: "☕", n: "coffee" }, { e: "🍺", n: "beer" }, { e: "🎮", n: "game" }, { e: "🎵", n: "music" },
  { e: "📷", n: "camera" }, { e: "💻", n: "laptop" }, { e: "📱", n: "phone" }, { e: "🔑", n: "key" }, { e: "🔔", n: "bell" },
  { e: "🌍", n: "earth" }, { e: "🌙", n: "moon" }, { e: "☀️", n: "sun" }, { e: "⚡", n: "bolt" }, { e: "🎁", n: "gift" },
];

export default function EmojiSearch() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query) return EMOJIS;
    return EMOJIS.filter((e) => e.n.includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="space-y-4">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search emojis…" className="w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
        {filtered.map((emoji, i) => (
          <button key={i} onClick={() => navigator.clipboard.writeText(emoji.e)} className="flex aspect-square items-center justify-center rounded-lg border border-border text-2xl transition-colors hover:border-primary/40 hover:bg-primary/5" title={`Copy ${emoji.n}`}>
            {emoji.e}
          </button>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center text-sm text-slate-400">No emojis found.</div>}
    </div>
  );
}
