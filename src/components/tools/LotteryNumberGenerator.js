'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const GAMES = {
  Powerball: { mainCount: 5, mainMax: 69, bonusLabel: "Powerball", bonusMax: 26 },
  "Mega Millions": { mainCount: 5, mainMax: 70, bonusLabel: "Mega Ball", bonusMax: 25 },
  EuroMillions: { mainCount: 5, mainMax: 50, bonusLabel: "Lucky Star", bonusMax: 12, bonusCount: 2 },
  Custom: { mainCount: 6, mainMax: 49, bonusLabel: null, bonusMax: null },
};

function pickUnique(count, max) {
  const nums = new Set();
  while (nums.size < count) nums.add(Math.floor(Math.random() * max) + 1);
  return Array.from(nums).sort((a, b) => a - b);
}

export default function LotteryNumberGenerator() {
  const [game, setGame] = useState("Powerball");
  const [mainCount, setMainCount] = useState(6);
  const [mainMax, setMainMax] = useState(49);
  const [tickets, setTickets] = useState([]);

  const config = GAMES[game];

  const generate = () => {
    const count = game === "Custom" ? mainCount : config.mainCount;
    const max = game === "Custom" ? mainMax : config.mainMax;
    const main = pickUnique(count, max);
    const bonus = config.bonusLabel
      ? pickUnique(config.bonusCount || 1, config.bonusMax)
      : null;
    setTickets((t) => [{ main, bonus }, ...t].slice(0, 5));
  };

  const ticketToString = (t) => `${t.main.join(", ")}${t.bonus ? ` | ${config.bonusLabel}: ${t.bonus.join(", ")}` : ""}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(GAMES).map((g) => (
          <button
            key={g}
            onClick={() => { setGame(g); setTickets([]); }}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              game === g ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {game === "Custom" && (
        <div className="grid grid-cols-2 gap-3 rounded-lg border border-border p-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Numbers to pick</label>
            <input type="number" min="1" max="15" value={mainCount} onChange={(e) => setMainCount(Math.max(1, Math.min(15, +e.target.value)))} className="w-full rounded-lg border border-border px-2 py-1.5 text-sm outline-none focus:border-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">Highest number</label>
            <input type="number" min="1" max="999" value={mainMax} onChange={(e) => setMainMax(Math.max(1, +e.target.value))} className="w-full rounded-lg border border-border px-2 py-1.5 text-sm outline-none focus:border-primary" />
          </div>
        </div>
      )}

      <button onClick={generate} className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90">
        <RefreshCw className="h-4 w-4" /> Generate Numbers
      </button>

      {tickets.length > 0 && (
        <div className="space-y-2">
          {tickets.map((t, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {t.main.map((n, j) => (
                  <span key={j} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-white">
                    {n}
                  </span>
                ))}
                {t.bonus && (
                  <>
                    <span className="mx-1 text-slate-300">|</span>
                    {t.bonus.map((n, j) => (
                      <span key={j} className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 font-mono text-sm font-bold text-white">
                        {n}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <CopyButton value={ticketToString(t)} label="" />
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-slate-400">For entertainment purposes only — always check official rules for your local lottery.</p>
    </div>
  );
}
