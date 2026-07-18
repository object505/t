'use client'
import { useState, useRef } from "react";

export default function CoinFlip() {
  const [result, setResult] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState([]);
  const [spins, setSpins] = useState(0);
  const streakRef = useRef({ side: null, count: 0 });

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    setResult(null);
    setSpins((s) => s + 1); // forces the CSS animation to replay each time

    setTimeout(() => {
      const r = Math.random() > 0.5 ? "Heads" : "Tails";
      setResult(r);
      setHistory((h) => [r, ...h].slice(0, 20));

      if (streakRef.current.side === r) streakRef.current.count += 1;
      else streakRef.current = { side: r, count: 1 };

      setFlipping(false);
    }, 700);
  };

  const heads = history.filter((r) => r === "Heads").length;
  const tails = history.filter((r) => r === "Tails").length;
  const total = history.length;
  const streak = streakRef.current;

  const reset = () => {
    setHistory([]);
    setResult(null);
    streakRef.current = { side: null, count: 0 };
  };

  return (
    <div className="space-y-5 text-center">
      <div className="flex justify-center" style={{ perspective: "600px" }}>
        <div
          key={spins}
          onClick={flip}
          className={`relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full text-xl font-bold shadow-lg transition-transform duration-200 ${
            !flipping && "hover:scale-105"
          } ${
            result === "Heads" ? "bg-amber-400 text-white" : result === "Tails" ? "bg-slate-600 text-white" : "bg-primary text-white"
          }`}
          style={{
            transformStyle: "preserve-3d",
            animation: flipping ? "coin-flip 0.7s ease-out" : "none",
          }}
        >
          {flipping ? "" : result || "Flip!"}
        </div>
      </div>

      <style>{`
        @keyframes coin-flip {
          0% { transform: rotateY(0deg) translateY(0); }
          20% { transform: rotateY(360deg) translateY(-40px); }
          40% { transform: rotateY(720deg) translateY(0); }
          60% { transform: rotateY(1080deg) translateY(-20px); }
          80% { transform: rotateY(1440deg) translateY(0); }
          100% { transform: rotateY(1800deg) translateY(0); }
        }
      `}</style>

      <div className="flex justify-center gap-2">
        <button
          onClick={flip}
          disabled={flipping}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40"
        >
          {flipping ? "Flipping…" : "Flip Coin"}
        </button>
        {total > 0 && (
          <button
            onClick={reset}
            disabled={flipping}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-slate-500 hover:border-slate-300 disabled:opacity-40"
          >
            Reset
          </button>
        )}
      </div>

      {total > 0 && (
        <>
          <div className="flex justify-center gap-6 text-sm">
            <span className="text-muted-foreground">
              Heads: <span className="font-mono font-bold text-amber-500">{heads}</span>{" "}
              <span className="text-xs text-slate-400">({Math.round((heads / total) * 100)}%)</span>
            </span>
            <span className="text-muted-foreground">
              Tails: <span className="font-mono font-bold text-slate-600">{tails}</span>{" "}
              <span className="text-xs text-slate-400">({Math.round((tails / total) * 100)}%)</span>
            </span>
          </div>

          {streak.count >= 2 && (
            <div className="text-xs font-medium text-primary">
              🔥 {streak.count}× {streak.side} in a row
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-1.5 border-t border-border pt-3">
            {history.map((r, i) => (
              <span
                key={i}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                  r === "Heads" ? "bg-amber-400" : "bg-slate-600"
                }`}
                title={r}
              >
                {r[0]}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
