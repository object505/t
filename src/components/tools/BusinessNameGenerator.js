'use client'
import { useState } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";
import { Heart, Sparkles } from "lucide-react";

const SUFFIXES = [
  "Hub", "Lab", "Forge", "Nest", "Works", "Studio", "Sphere", "Pulse", "Edge", "Wave",
  "Grid", "Byte", "Core", "Link", "Loop", "Shift", "Vault", "Peak", "Drive", "Flow",
  "Bloom", "Spark", "Nexus", "Craft", "Path", "Point", "Ridge", "Harbor", "Orbit", "Beacon",
  "Base", "Dock", "Gate", "Haven", "Realm", "Zone", "Fleet", "Circuit", "Signal", "Current",
  "Anchor", "Compass", "Prism", "Cove", "Summit", "Frontier", "Horizon", "Genesis", "Cascade", "Vector",
  "Foundry", "Depot", "Junction", "Outpost", "Refuge", "Sanctum", "Terrace", "Atlas", "Beam", "Echo",
];

const PREFIXES = [
  "Get", "Try", "Go", "My", "The", "Use", "Join", "Meet", "Grab", "Pick",
  "Hey", "Just", "One", "All", "Real", "Next", "New", "Every", "Any", "In",
];

const ADJECTIVES = [
  "Bright", "Bold", "Swift", "True", "Prime", "Vivid", "Fresh", "Pure", "Sharp", "Rapid",
  "Clear", "Solid", "Grand", "Noble", "Agile", "Keen", "Brave", "Loyal", "Vital", "Steady",
  "Crisp", "Deep", "Honest", "Lucid", "Modern", "Nimble", "Open", "Quiet", "Radiant",
  "Sturdy", "Timeless", "Urban", "Wild", "Zealous", "Ample", "Cosmic", "Daring", "Elevated",
];

const INVENTED_ENDINGS = [
  "ify", "ly", "io", "ster", "wise", "kit", "eo", "ora", "ent", "ix",
  "ara", "ely", "ex", "ium", "eon", "opia", "onic", "ase", "yst",
];

const SUGGESTED_KEYWORDS = [
  "tech", "fitness", "food", "travel", "finance", "health", "beauty",
  "fashion", "design", "media", "legal", "realty", "auto", "pet",
  "education", "music", "gaming", "eco", "craft", "cloud",
];

const STYLES = ["All", "Professional", "Playful", "Modern", "Abstract", "Blend"];

function cap1(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function portmanteau(a, b) {
  const cutA = Math.max(1, Math.ceil(a.length * 0.55));
  const cutB = Math.max(1, Math.floor(b.length * 0.45));
  return cap1(a.slice(0, cutA) + b.slice(b.length - cutB));
}

const SINGLE_GENERATORS = [
  { style: "Professional", make: (words) => `${cap1(words[0])}${rand(SUFFIXES)}` },
  { style: "Professional", make: (words) => `${cap1(words[0])} ${rand(SUFFIXES)}` },
  { style: "Professional", make: (words) => `${rand(SUFFIXES)} ${cap1(words[0])}` },
  { style: "Playful", make: (words) => `${rand(PREFIXES)}${cap1(words[0])}` },
  { style: "Playful", make: (words) => `${rand(ADJECTIVES)} ${cap1(words[0])}` },
  { style: "Playful", make: (words) => `${rand(ADJECTIVES)}${cap1(words[0])}${rand(SUFFIXES)}` },
  { style: "Modern", make: (words) => {
      const cut = Math.max(3, words[0].length - Math.ceil(Math.random() * 2));
      return `${cap1(words[0]).slice(0, cut)}${rand(INVENTED_ENDINGS)}`;
    } },
  { style: "Modern", make: (words) => `${cap1(words[0])}${rand(INVENTED_ENDINGS)}` },
  { style: "Abstract", make: (words) => `${rand(SUFFIXES)}${words[0].length > 5 ? cap1(words[0]).slice(0, 4) : cap1(words[0])}` },
  { style: "Abstract", make: (words) => `${rand(ADJECTIVES)} ${rand(SUFFIXES)}` },
];

const BLEND_GENERATORS = [
  { style: "Blend", make: (words) => `${cap1(words[0])}${cap1(words[1])}` },
  { style: "Blend", make: (words) => `${cap1(words[0])} ${cap1(words[1])}` },
  { style: "Blend", make: (words) => portmanteau(words[0], words[1]) },
  { style: "Blend", make: (words) => `${cap1(words[1])}${cap1(words[0])}` },
  { style: "Blend", make: (words) => `${cap1(words[0])}${words[1].charAt(0).toUpperCase()}${words[1].slice(1, 3)}` },
  { style: "Blend", make: (words) => `${cap1(words[0])}${rand(SUFFIXES)} ${cap1(words[1])}` },
  { style: "Blend", make: (words) => `${rand(ADJECTIVES)} ${cap1(words[0])}${cap1(words[1])}` },
];

function toDomain(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";
}

function parseKeywords(raw) {
  return raw.split(",").map((w) => w.trim()).filter(Boolean);
}

function pickTwoDistinct(words) {
  const i = Math.floor(Math.random() * words.length);
  let j = Math.floor(Math.random() * words.length);
  if (words.length > 1) {
    while (j === i) j = Math.floor(Math.random() * words.length);
  } else {
    j = i;
  }
  return [words[i], words[j]];
}

export default function BusinessNameGenerator() {
  const [keywordInput, setKeywordInput] = useState("tech");
  const [style, setStyle] = useState("All");
  const [names, setNames] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const generate = (overrideInput) => {
    const words = parseKeywords(overrideInput ?? keywordInput);
    if (words.length === 0) return;
    const multiWord = words.length > 1;

    let pool;
    if (style === "Blend") {
      pool = multiWord ? BLEND_GENERATORS : SINGLE_GENERATORS;
    } else if (style === "All") {
      pool = multiWord ? [...SINGLE_GENERATORS, ...BLEND_GENERATORS] : SINGLE_GENERATORS;
    } else {
      pool = SINGLE_GENERATORS.filter((g) => g.style === style);
    }

    const results = [];
    const seen = new Set();
    let guard = 0;
    while (results.length < 12 && guard < 400) {
      guard++;
      const gen = rand(pool);
      const isBlend = gen.style === "Blend";
      const wordsForGen = isBlend ? pickTwoDistinct(words) : [words[Math.floor(Math.random() * words.length)]];
      const name = gen.make(wordsForGen);
      if (name && !seen.has(name)) {
        seen.add(name);
        results.push({ name, style: gen.style });
      }
    }
    setNames(results);
  };

  const addSuggested = (word) => {
    const words = parseKeywords(keywordInput);
    if (words.includes(word)) return;
    const next = [...words, word].join(", ");
    setKeywordInput(next);
    generate(next);
  };

  const toggleFavorite = (name) => {
    setFavorites((f) => (f.includes(name) ? f.filter((n) => n !== name) : [...f, name]));
  };

  const currentWords = parseKeywords(keywordInput);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <ToolInput
          label="Keywords (comma-separated)"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="tech, cloud, data"
        />
        <button onClick={() => generate()} className="mt-6 flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Sparkles className="h-4 w-4" /> Generate
        </button>
      </div>

      {currentWords.length > 1 && (
        <div className="flex flex-wrap gap-1 text-xs text-slate-400">
          Using: {currentWords.map((w, i) => (
          <span key={i} className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">{w}</span>
        ))}
        </div>
      )}

      <div>
        <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">Suggested keywords (click to add)</div>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_KEYWORDS.map((word) => (
            <button
              key={word}
              onClick={() => addSuggested(word)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                currentWords.includes(word) ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">Style</div>
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                style === s ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {style === "Blend" && currentWords.length < 2 && (
          <p className="mt-1 text-xs text-amber-600">Add a second keyword to use Blend — showing single-keyword names for now.</p>
        )}
      </div>

      {names.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {names.map(({ name, style: s }, i) => {
            const isFav = favorites.includes(name);
            return (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium text-slate-700">{name}</span>
                    <span className="shrink-0 rounded-full bg-slate-200 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide text-slate-500">{s}</span>
                  </div>
                  <span className="text-xs text-slate-400">{toDomain(name)}</span>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button onClick={() => toggleFavorite(name)} className="rounded-md p-1.5 text-slate-400 hover:text-rose-500">
                    <Heart className={`h-4 w-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>
                  <CopyButton value={name} label="" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="space-y-2 border-t border-border pt-3">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Favorites</div>
          <div className="flex flex-wrap gap-2">
            {favorites.map((n, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
                {n}
                <button onClick={() => toggleFavorite(n)} className="text-rose-400 hover:text-rose-600">×</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
