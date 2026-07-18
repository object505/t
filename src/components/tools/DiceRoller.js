'use client'
import { useState } from "react";

const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function DiceRoller() {
  const [count, setCount] = useState(2);
  const [sides, setSides] = useState(6);
  const [rolls, setRolls] = useState([]);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      const results = Array.from({ length: count }, () => Math.ceil(Math.random() * sides));
      setRolls(results);
      setRolling(false);
    }, 300);
  };

  const total = rolls.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-muted-foreground">Number of dice: {count}</label>
          <input type="range" min="1" max="10" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full accent-primary" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-muted-foreground">Sides</label>
          <select value={sides} onChange={(e) => setSides(+e.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">
            {[4, 6, 8, 10, 12, 20, 100].map((s) => <option key={s} value={s}>d{s}</option>)}
          </select>
        </div>
      </div>
      <button onClick={roll} disabled={rolling} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40">
        {rolling ? "Rolling…" : "Roll Dice"}
      </button>
      {rolls.length > 0 && (
        <div className="space-y-3 rounded-xl border border-border bg-slate-50 p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {rolls.map((r, i) => (
              <div key={i} className={`flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-white font-mono text-xl font-bold text-slate-800 ${rolling ? "animate-bounce" : ""}`}>
                {sides === 6 ? DICE_FACES[r - 1] : r}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">Total: <span className="font-mono text-lg font-bold text-primary">{total}</span></div>
        </div>
      )}
    </div>
  );
}
