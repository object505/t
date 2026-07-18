'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const EMOJIS = ["😀", "😂", "❤️", "👍", "🔥", "🎉", "💯", "✅", "⭐", "😍", "🤔", "😭", "🥳", "😎", "🚀", "💎", "🎯", "💡", "💰", "🏆", "⚡", "🌈", "🍕", "☕", "🎮", "🎵", "📷", "💻", "🌍", "🌙", "☀️", "🎁", "🦄", "🐱", "🐶", "🌸", "🍀", "⚡", "🎨", "📚"];

export default function RandomEmoji() {
  const [emoji, setEmoji] = useState("🎲");

  const generate = () => setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);

  return (
    <div className="space-y-4 text-center">
      <div className="flex h-32 items-center justify-center rounded-xl border border-border bg-slate-50">
        <span className="text-7xl">{emoji}</span>
      </div>
      <button onClick={generate} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Pick Random Emoji</button>
      <div><CopyButton value={emoji} label="Copy emoji" /></div>
    </div>
  );
}
