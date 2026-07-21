'use client'
import { useState, useMemo } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

// A curated set of ~140 well-known named colors (CSS extended color keywords + a few common brand-neutral names)
const NAMED_COLORS = [
  ["Black", "#000000"], ["White", "#FFFFFF"], ["Red", "#FF0000"], ["Green", "#008000"], ["Blue", "#0000FF"],
  ["Yellow", "#FFFF00"], ["Cyan", "#00FFFF"], ["Magenta", "#FF00FF"], ["Silver", "#C0C0C0"], ["Gray", "#808080"],
  ["Maroon", "#800000"], ["Olive", "#808000"], ["Purple", "#800080"], ["Teal", "#008080"], ["Navy", "#000080"],
  ["Orange", "#FFA500"], ["Pink", "#FFC0CB"], ["Brown", "#A52A2A"], ["Gold", "#FFD700"], ["Beige", "#F5F5DC"],
  ["Coral", "#FF7F50"], ["Crimson", "#DC143C"], ["Indigo", "#4B0082"], ["Ivory", "#FFFFF0"], ["Khaki", "#F0E68C"],
  ["Lavender", "#E6E6FA"], ["Lime", "#00FF00"], ["Salmon", "#FA8072"], ["Tan", "#D2B48C"], ["Turquoise", "#40E0D0"],
  ["Violet", "#EE82EE"], ["Chocolate", "#D2691E"], ["Tomato", "#FF6347"], ["Orchid", "#DA70D6"], ["Plum", "#DDA0DD"],
  ["Sienna", "#A0522D"], ["Peru", "#CD853F"], ["Chartreuse", "#7FFF00"], ["Aquamarine", "#7FFFD4"], ["SkyBlue", "#87CEEB"],
  ["SteelBlue", "#4682B4"], ["RoyalBlue", "#4169E1"], ["MidnightBlue", "#191970"], ["ForestGreen", "#228B22"], ["SeaGreen", "#2E8B57"],
  ["OliveDrab", "#6B8E23"], ["DarkGreen", "#006400"], ["DarkRed", "#8B0000"], ["FireBrick", "#B22222"], ["IndianRed", "#CD5C5C"],
  ["HotPink", "#FF69B4"], ["DeepPink", "#FF1493"], ["MediumVioletRed", "#C71585"], ["PaleVioletRed", "#DB7093"], ["Fuchsia", "#FF00FF"],
  ["SlateBlue", "#6A5ACD"], ["MediumPurple", "#9370DB"], ["DarkOrchid", "#9932CC"], ["DarkViolet", "#9400D3"], ["BlueViolet", "#8A2BE2"],
  ["Peach", "#FFE5B4"], ["Apricot", "#FBCEB1"], ["Mint", "#98FF98"], ["Rose", "#FF007F"], ["Ruby", "#E0115F"],
  ["Emerald", "#50C878"], ["Sapphire", "#0F52BA"], ["Amber", "#FFBF00"], ["Charcoal", "#36454F"], ["Slate", "#708090"],
  ["Cream", "#FFFDD0"], ["Mustard", "#FFDB58"], ["Rust", "#B7410E"], ["Burgundy", "#800020"], ["Mauve", "#E0B0FF"],
  ["Periwinkle", "#CCCCFF"], ["Cerulean", "#007BA7"], ["Cobalt", "#0047AB"], ["Denim", "#1560BD"], ["Jade", "#00A86B"],
  ["Olive Green", "#556B2F"], ["Pistachio", "#93C572"], ["Sage", "#9CAF88"], ["Terracotta", "#E2725B"], ["Wine", "#722F37"],
  ["LightGray", "#D3D3D3"], ["DarkGray", "#A9A9A9"], ["DimGray", "#696969"], ["Gainsboro", "#DCDCDC"], ["WhiteSmoke", "#F5F5F5"],
  ["Snow", "#FFFAFA"], ["Linen", "#FAF0E6"], ["AntiqueWhite", "#FAEBD7"], ["Bisque", "#FFE4C4"], ["Wheat", "#F5DEB3"],
  ["NavajoWhite", "#FFDEAD"], ["BlanchedAlmond", "#FFEBCD"], ["Cornsilk", "#FFF8DC"], ["LemonChiffon", "#FFFACD"], ["Honeydew", "#F0FFF0"],
  ["MintCream", "#F5FFFA"], ["AliceBlue", "#F0F8FF"], ["GhostWhite", "#F8F8FF"], ["Seashell", "#FFF5EE"], ["OldLace", "#FDF5E6"],
  ["Azure", "#F0FFFF"], ["LightCyan", "#E0FFFF"], ["LightYellow", "#FFFFE0"], ["LightPink", "#FFB6C1"], ["LightSalmon", "#FFA07A"],
  ["LightCoral", "#F08080"], ["LightSeaGreen", "#20B2AA"], ["LightSkyBlue", "#87CEFA"], ["LightSlateGray", "#778899"], ["LightSteelBlue", "#B0C4DE"],
  ["MediumAquamarine", "#66CDAA"], ["MediumSeaGreen", "#3CB371"], ["MediumSlateBlue", "#7B68EE"], ["MediumSpringGreen", "#00FA9A"], ["MediumTurquoise", "#48D1CC"],
  ["DarkSlateBlue", "#483D8B"], ["DarkSlateGray", "#2F4F4F"], ["DarkTurquoise", "#00CED1"], ["DarkKhaki", "#BDB76B"], ["DarkGoldenrod", "#B8860B"],
  ["DarkSalmon", "#E9967A"], ["DarkOrange", "#FF8C00"], ["DarkMagenta", "#8B008B"], ["DarkCyan", "#008B8B"], ["DarkSeaGreen", "#8FBC8F"],
  ["PaleGreen", "#98FB98"], ["PaleTurquoise", "#AFEEEE"], ["PaleGoldenrod", "#EEE8AA"], ["PowderBlue", "#B0E0E6"], ["Thistle", "#D8BFD8"],
];

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function colorDistance(c1, c2) {
  // Weighted Euclidean distance — weights approximate human perceptual sensitivity
  // (eyes are more sensitive to green, less to blue)
  const rMean = (c1.r + c2.r) / 2;
  const dr = c1.r - c2.r, dg = c1.g - c2.g, db = c1.b - c2.b;
  return Math.sqrt((2 + rMean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rMean) / 256) * db * db);
}

export default function ColorNameFinder() {
  const [hex, setHex] = useState("#4a90d9");

  const rgb = hexToRgb(hex);

  const matches = useMemo(() => {
    if (!rgb) return [];
    return NAMED_COLORS
      .map(([name, nameHex]) => ({ name, hex: nameHex, dist: colorDistance(rgb, hexToRgb(nameHex)) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 5);
  }, [hex]);

  const closest = matches[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-border" />
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="flex-1 rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary"
        />
      </div>

      {closest && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <div className="text-xs font-medium uppercase tracking-wide text-primary/70">Closest Named Color</div>
          <div className="mt-1 text-2xl font-bold text-primary">{closest.name}</div>
          <div className="text-xs text-slate-500">{closest.hex} · {closest.dist < 5 ? "exact match" : `Δ ${closest.dist.toFixed(1)}`}</div>
        </div>
      )}

      {matches.length > 1 && (
        <div className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Other close matches</div>
          {matches.slice(1).map((m, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md border border-border" style={{ backgroundColor: m.hex }} />
                <span className="text-sm font-medium text-slate-700">{m.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs text-slate-400">{m.hex}</code>
                <CopyButton value={m.hex} label="" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
