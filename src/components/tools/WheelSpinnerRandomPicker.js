'use client'
import { useState, useRef } from "react";
import { Plus, X, RefreshCw } from "lucide-react";

const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#a855f7", "#ec4899", "#06b6d4", "#f97316"];

export default function WheelSpinnerRandomPicker() {
  const [options, setOptions] = useState(["Pizza", "Sushi", "Tacos", "Burgers", "Salad"]);
  const [input, setInput] = useState("");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const wheelRef = useRef(null);

  const addOption = () => {
    const val = input.trim();
    if (!val || options.includes(val)) return;
    setOptions((o) => [...o, val]);
    setInput("");
  };

  const removeOption = (i) => setOptions((o) => o.filter((_, idx) => idx !== i));

  const spin = () => {
    if (spinning || options.length < 2) return;
    setSpinning(true);
    setWinner(null);

    const sliceAngle = 360 / options.length;
    const winnerIndex = Math.floor(Math.random() * options.length);
    const winnerCenter = winnerIndex * sliceAngle + sliceAngle / 2;

    // The angle (mod 360) at which the winning slice's center sits under the pointer
    const desiredMod = ((360 - winnerCenter) % 360 + 360) % 360;

    setRotation((r) => {
      const currentMod = ((r % 360) + 360) % 360;
      // How far forward (0-360) we need to rotate from the current resting angle
      // to land exactly on the desired angle
      const deltaToDesired = ((desiredMod - currentMod) % 360 + 360) % 360;
      // Add several full spins on top so it visibly spins each time, even if
      // deltaToDesired is small or zero
      return r + 360 * 5 + deltaToDesired;
    });

    setTimeout(() => {
      setWinner(options[winnerIndex]);
      setSpinning(false);
    }, 4000);
  };

  const sliceAngle = 360 / Math.max(options.length, 1);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addOption()}
          placeholder="Add an option…"
          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button onClick={addOption} className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-slate-600 hover:bg-accent">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {options.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {options.map((o, i) => (
            <span key={i} className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {o}
              <button onClick={() => removeOption(i)} className="text-slate-400 hover:text-rose-500">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative flex justify-center py-4">
        <div className="absolute top-2 z-10 h-0 w-0 border-x-8 border-t-[14px] border-x-transparent border-t-slate-800" />
        <svg
          ref={wheelRef}
          viewBox="0 0 200 200"
          className="h-64 w-64"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          {options.length === 0 ? (
            <circle cx="100" cy="100" r="95" fill="#e2e8f0" />
          ) : (
            options.map((o, i) => {
              const startAngle = (i * sliceAngle - 90) * (Math.PI / 180);
              const endAngle = ((i + 1) * sliceAngle - 90) * (Math.PI / 180);
              const x1 = 100 + 95 * Math.cos(startAngle);
              const y1 = 100 + 95 * Math.sin(startAngle);
              const x2 = 100 + 95 * Math.cos(endAngle);
              const y2 = 100 + 95 * Math.sin(endAngle);
              const largeArc = sliceAngle > 180 ? 1 : 0;
              const midAngle = (i * sliceAngle + sliceAngle / 2 - 90) * (Math.PI / 180);
              const textX = 100 + 60 * Math.cos(midAngle);
              const textY = 100 + 60 * Math.sin(midAngle);

              return (
                <g key={i}>
                  <path
                    d={`M100,100 L${x1},${y1} A95,95 0 ${largeArc} 1 ${x2},${y2} Z`}
                    fill={COLORS[i % COLORS.length]}
                    stroke="white"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="white"
                    fontSize="10"
                    fontWeight="600"
                    textAnchor="middle"
                    transform={`rotate(${i * sliceAngle + sliceAngle / 2}, ${textX}, ${textY})`}
                  >
                    {o.length > 10 ? o.slice(0, 9) + "…" : o}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>

      <button
        onClick={spin}
        disabled={spinning || options.length < 2}
        className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40"
      >
        <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} />
        {options.length < 2 ? "Add at least 2 options" : spinning ? "Spinning…" : "Spin the Wheel"}
      </button>

      {winner && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
          <div className="text-xs font-medium uppercase tracking-wide text-primary/70">Winner</div>
          <div className="text-2xl font-bold text-primary">{winner}</div>
        </div>
      )}
    </div>
  );
}
