'use client'
import { useState, useEffect, useRef } from "react";
import { ToolInput } from "@/components/tools/ToolUI";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function CountdownTimer() {
  const [target, setTarget] = useState("");
  const [remaining, setRemaining] = useState(null);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      const diff = new Date(target).getTime() - Date.now();
      setRemaining(diff > 0 ? diff : 0);
      if (diff <= 0) { setRunning(false); clearInterval(intervalRef.current); }
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, [running, target]);

  const format = (ms) => {
    if (ms <= 0) return "00:00:00";
    const s = Math.floor(ms / 1000);
    const days = Math.floor(s / 86400);
    const h = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return days > 0 ? `${days}d ${h}:${m}:${sec}` : `${h}:${m}:${sec}`;
  };

  const start = () => { if (target) setRunning(true); };
  const reset = () => { setRunning(false); setRemaining(null); };

  return (
    <div className="space-y-4">
      <ToolInput type="datetime-local" label="Target date & time" value={target} onChange={(e) => { setTarget(e.target.value); setRemaining(null); setRunning(false); }} />
      <div className="flex justify-center gap-2">
        <button onClick={running ? () => setRunning(false) : start} disabled={!target} className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-40">
          {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start</>}
        </button>
        <button onClick={reset} className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/30"><RotateCcw className="h-4 w-4" /> Reset</button>
      </div>
      {remaining !== null && (
        <div className="rounded-xl border border-border bg-slate-50 p-8 text-center">
          <div className="font-mono text-4xl font-bold text-primary">{format(remaining)}</div>
          <div className="mt-2 text-sm text-slate-500">{remaining > 0 ? "remaining" : "Time's up! 🎉"}</div>
        </div>
      )}
    </div>
  );
}
