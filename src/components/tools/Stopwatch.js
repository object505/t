'use client'
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) return;
    const start = Date.now() - elapsed;
    ref.current = setInterval(() => setElapsed(Date.now() - start), 10);
    return () => clearInterval(ref.current);
  }, [elapsed, running]);

  const format = (ms) => {
    const min = String(Math.floor(ms / 60000)).padStart(2, "0");
    const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${min}:${sec}.${cs}`;
  };

  const reset = () => { setRunning(false); setElapsed(0); setLaps([]); };
  const lap = () => setLaps((l) => [format(elapsed), ...l]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-slate-50 p-8 text-center">
        <div className="font-mono text-5xl font-bold text-primary tabular-nums">{format(elapsed)}</div>
      </div>
      <div className="flex justify-center gap-2">
        <button onClick={() => setRunning(!running)} className="flex items-center gap-1.5 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
          {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
        </button>
        <button onClick={lap} disabled={!running} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/30 disabled:opacity-40">Lap</button>
        <button onClick={reset} className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/30"><RotateCcw className="h-4 w-4" /> Reset</button>
      </div>
      {laps.length > 0 && (
        <div className="max-h-48 space-y-1 overflow-y-auto scrollbar-thin">
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between rounded-lg border border-border bg-slate-50 px-3 py-2 text-sm">
              <span className="text-slate-500">Lap {laps.length - i}</span>
              <code className="font-mono text-slate-700">{l}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
