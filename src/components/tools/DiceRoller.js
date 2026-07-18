'use client'
import { useState, useRef, useEffect } from "react";

const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export default function DiceRoller() {
  const [count, setCount] = useState(2);
  const [sides, setSides] = useState(6);
  const [rolls, setRolls] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    let ticks = 0;
    const maxTicks = 8;
    intervalRef.current = setInterval(() => {
      setRolls(Array.from({ length: count }, () => Math.ceil(Math.random() * sides)));
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(intervalRef.current);
        const finalRolls = Array.from({ length: count }, () => Math.ceil(Math.random() * sides));
        setRolls(finalRolls);
        const finalTotal = finalRolls.reduce((a, b) => a + b, 0);
        setHistory((h) => [{ rolls: finalRolls, total: finalTotal, sides }, ...h].slice(0, 8));
        setRolling(false);
      }
    }, 70);
  };

  const rerollOne = (i) => {
    if (rolling) return;
    setRolls((r) => {
      const next = [...r];
      next[i] = Math.ceil(Math.random() * sides);
      return next;
    });
  };

  const total = rolls.reduce((a, b) => a + b, 0);
  const max = rolls.length ? Math.max(...rolls) : null;
  const min = rolls.length ? Math.min(...rolls) : null;
  const avgAllTime = history.length
    ? (history.reduce((a, h) => a + h.total, 0) / history.length).toFixed(1)
    : null;

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
            {rolls.map((r, i) => {
              const isMax = !rolling && count > 1 && r === max && max !== min;
              const isMin = !rolling && count > 1 && r === min && max !== min;
              return (
                <button
                  key={i}
                  onClick={() => rerollOne(i)}
                  disabled={rolling}
                  title="Click to reroll this die"
                  className={`flex h-14 w-14 items-center justify-center rounded-lg border font-mono text-4xl font-bold transition-transform hover:scale-105 ${
                    rolling
                      ? "animate-pulse border-border bg-white text-slate-400"
                      : isMax
                        ? "border-emerald-300 bg-emerald-50 text-emerald-600"
                        : isMin
                          ? "border-rose-300 bg-rose-50 text-rose-500"
                          : "border-border bg-white text-slate-800"
                  }`}
                >
                  {sides === 6 ? DICE_FACES[r - 1] : r}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Total: <span className="font-mono text-lg font-bold text-primary">{total}</span></span>
            {count > 1 && !rolling && (
              <span className="text-xs">
                (avg <span className="font-mono">{(total / count).toFixed(1)}</span>)
              </span>
            )}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-400">
            <span>Recent Rolls</span>
            {avgAllTime && <span>Avg total: {avgAllTime}</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <div
                key={i}
                title={h.rolls.join(", ")}
                className="rounded-lg border border-border bg-white px-2.5 py-1 font-mono text-xs text-slate-600"
              >
                d{h.sides}: {h.rolls.join("+")} = <span className="font-bold text-slate-800">{h.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
