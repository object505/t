'use client'
import { useState, useRef } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const CATEGORIES = {
  All: null, // filled in below
  Faces: [
    "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
    "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙",
    "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔",
    "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥",
    "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮",
    "🥵", "🥶", "🥴", "😵", "🤯", "🥳", "🥺", "😢", "😭", "😤",
  ],
  Hearts: [
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
    "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "♥️",
    "💌", "😻", "💑", "💏",
  ],
  Gestures: [
    "👍", "👎", "👏", "🙌", "🤝", "✌️", "🤞", "🤟", "👌", "🤙",
    "💪", "🙏", "👋", "🤚", "🖐️", "✋", "🖖", "👊", "✊", "🤛",
    "🤜", "🤌", "🤲", "👐", "🫶", "👆", "👇", "👉", "👈", "☝️",
  ],
  Animals: [
    "🐱", "🐶", "🦄", "🦁", "🐼", "🦊", "🐸", "🐵", "🐧", "🦋",
    "🐝", "🐳", "🐨", "🐯", "🐰", "🐹", "🐭", "🐮", "🐷", "🐔",
    "🐤", "🦆", "🦉", "🦇", "🐺", "🐗", "🐴", "🦓", "🦒", "🐘",
    "🐊", "🐢", "🐍", "🦖", "🐙", "🦑", "🦀", "🐬", "🐠", "🐟",
  ],
  Food: [
    "🍕", "🍔", "🍟", "🌮", "🌯", "🍩", "🍦", "🍨", "🍧", "🍰",
    "🎂", "🍫", "🍬", "🍭", "🍪", "☕", "🍺", "🍻", "🍷", "🍹",
    "🍀", "🥑", "🍓", "🍉", "🍇", "🍎", "🍌", "🍍", "🥭", "🍑",
    "🥕", "🌽", "🍞", "🧀", "🥓", "🍳", "🍝", "🍜", "🍣", "🍱",
  ],
  Objects: [
    "🔥", "🎉", "💯", "✅", "⭐", "🚀", "💎", "🎯", "💡", "💰",
    "🏆", "⚡", "📷", "💻", "🎮", "🎵", "📚", "🎁", "🔑", "🔒",
    "⏰", "📱", "🎧", "💣", "🧨", "🪄", "🎪", "🎭", "🎨", "🖌️",
    "📌", "📎", "✂️", "🔍", "💊", "🛠️", "⚙️", "🧩", "🎲", "🃏",
  ],
  Nature: [
    "🌈", "🌍", "🌙", "☀️", "🌸", "🍀", "🌊", "❄️", "🌵", "🌻",
    "⛄", "🌟", "✨", "⚡", "🌪️", "🌧️", "🌤️", "🌫️", "🌳", "🌲",
    "🌴", "🍁", "🍂", "🌹", "🌷", "🌼", "🌺", "🍄", "🌾", "🌱",
  ],
  Travel: [
    "🚗", "🚕", "🚙", "🚌", "🚓", "🚑", "🚒", "🚚", "🏍️", "🚲",
    "✈️", "🚀", "🛸", "🚁", "⛵", "🚤", "🛳️", "⚓", "🚂", "🚆",
    "🚊", "🚡", "🗽", "🗼", "🏰", "🏯", "🎡", "🎢", "⛰️", "🏖️",
    "🏝️", "🏕️", "🗺️", "🧳", "🛣️", "🚦", "⛽", "🛑", "🌉", "🏟️",
  ],
};
CATEGORIES.All = Object.values(CATEGORIES).flat().filter(Boolean);

export default function RandomEmoji() {
  const [category, setCategory] = useState("All");
  const [emoji, setEmoji] = useState("🎲");
  const [history, setHistory] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const lastRef = useRef(null);

  const pool = CATEGORIES[category];

  const generate = () => {
    if (spinning) return;
    setSpinning(true);
    let ticks = 0;
    const maxTicks = 10;
    const interval = setInterval(() => {
      const r = pool[Math.floor(Math.random() * pool.length)];
      setEmoji(r);
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        let final;
        do {
          final = pool[Math.floor(Math.random() * pool.length)];
        } while (final === lastRef.current && pool.length > 1);
        lastRef.current = final;
        setEmoji(final);
        setHistory((h) => [final, ...h.filter((e) => e !== final)].slice(0, 8));
        setSpinning(false);
      }
    }, 60);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-wrap justify-center gap-1.5">
        {Object.keys(CATEGORIES).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              category === c ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex h-32 items-center justify-center rounded-xl border border-border bg-slate-50">
        <span className={`text-7xl transition-transform ${spinning ? "scale-90" : "scale-100"}`}>{emoji}</span>
      </div>

      <button
        onClick={generate}
        disabled={spinning}
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
      >
        <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} /> {spinning ? "Rolling…" : "Pick Random Emoji"}
      </button>
      <div><CopyButton value={emoji} label="Copy emoji" /></div>

      {history.length > 0 && (
        <div className="border-t border-border pt-3">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Recent</div>
          <div className="flex flex-wrap justify-center gap-2">
            {history.map((e, i) => (
              <button
                key={i}
                onClick={() => setEmoji(e)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-xl hover:border-primary/40"
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
