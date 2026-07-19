'use client'
import { useState } from "react";
import { RefreshCw } from "lucide-react";

const SUITS = [
  { symbol: "♠", name: "Spades", color: "text-slate-900" },
  { symbol: "♥", name: "Hearts", color: "text-rose-600" },
  { symbol: "♦", name: "Diamonds", color: "text-rose-600" },
  { symbol: "♣", name: "Clubs", color: "text-slate-900" },
];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function buildDeck() {
  const deck = [];
  for (const suit of SUITS) for (const rank of RANKS) deck.push({ suit, rank });
  return deck;
}

export default function RandomPlayingCard() {
  const [deck, setDeck] = useState(() => buildDeck());
  const [drawn, setDrawn] = useState([]);
  const [flipping, setFlipping] = useState(false);
  const [noRepeat, setNoRepeat] = useState(true);

  const draw = () => {
    if (flipping) return;
    const pool = noRepeat ? deck : buildDeck();
    if (pool.length === 0) return;

    setFlipping(true);
    setTimeout(() => {
      const i = Math.floor(Math.random() * pool.length);
      const card = pool[i];
      if (noRepeat) setDeck(pool.filter((_, idx) => idx !== i));
      setDrawn((d) => [card, ...d].slice(0, 5));
      setFlipping(false);
    }, 300);
  };

  const resetDeck = () => {
    setDeck(buildDeck());
    setDrawn([]);
  };

  const top = drawn[0];
  const remaining = noRepeat ? deck.length : 52;

  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-center">
        <div
          className={`flex h-40 w-28 items-center justify-center rounded-xl border-2 border-border bg-white shadow-md transition-transform duration-300 ${
            flipping ? "scale-95 opacity-50" : ""
          }`}
        >
          {top ? (
            <div className={`text-center ${top.suit.color}`}>
              <div className="text-3xl font-bold">{top.rank}</div>
              <div className="text-4xl leading-none">{top.suit.symbol}</div>
            </div>
          ) : (
            <span className="text-4xl">🂠</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={draw}
          disabled={flipping || (noRepeat && deck.length === 0)}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40"
        >
          <RefreshCw className={`h-4 w-4 ${flipping ? "animate-spin" : ""}`} />
          {noRepeat && deck.length === 0 ? "Deck Empty" : "Draw Card"}
        </button>
        {noRepeat && drawn.length > 0 && (
          <button onClick={resetDeck} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-slate-500 hover:border-slate-300">
            Reshuffle
          </button>
        )}
      </div>

      <label className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <input type="checkbox" checked={noRepeat} onChange={(e) => { setNoRepeat(e.target.checked); resetDeck(); }} className="accent-primary" />
        No repeats until deck is reshuffled
      </label>

      {noRepeat && (
        <div className="text-xs text-slate-400">{remaining} card{remaining !== 1 ? "s" : ""} remaining</div>
      )}

      {drawn.length > 1 && (
        <div className="border-t border-border pt-3">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Previously Drawn</div>
          <div className="flex flex-wrap justify-center gap-2">
            {drawn.slice(1).map((c, i) => (
              <div key={i} className={`flex h-12 w-9 items-center justify-center rounded-md border border-border bg-white text-xs font-bold ${c.suit.color}`}>
                {c.rank}{c.suit.symbol}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
