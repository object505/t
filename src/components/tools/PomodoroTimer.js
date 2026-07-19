'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

const DEFAULT_DURATIONS = { focus: 25, short: 5, long: 15 };
const MODE_LABELS = { focus: "Focus", short: "Short Break", long: "Long Break" };
const MODE_COLORS = { focus: "bg-primary", short: "bg-emerald-500", long: "bg-blue-500" };

export default function PomodoroTimer() {
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_DURATIONS.focus * 60);
  const [running, setRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const playChime = useCallback(() => {
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // audio not supported/blocked, fail silently
    }
  }, []);

  const switchMode = useCallback((newMode, autoStart = false) => {
    setMode(newMode);
    setSecondsLeft(durations[newMode] * 60);
    setRunning(autoStart);
  }, [durations]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          playChime();
          if (mode === "focus") {
            const newCount = sessionsCompleted + 1;
            setSessionsCompleted(newCount);
            const next = newCount % 4 === 0 ? "long" : "short";
            switchMode(next, false);
          } else {
            switchMode("focus", false);
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, mode, sessionsCompleted, switchMode, playChime]);

  const toggle = () => setRunning((r) => !r);
  const reset = () => { setRunning(false); setSecondsLeft(durations[mode] * 60); };

  const updateDuration = (key, val) => {
    const num = Math.max(1, Math.min(120, parseInt(val) || 1));
    setDurations((d) => ({ ...d, [key]: num }));
    if (key === mode && !running) setSecondsLeft(num * 60);
  };

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const totalSeconds = durations[mode] * 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-center gap-1.5">
        {Object.keys(MODE_LABELS).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m, false)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              mode === m ? `${MODE_COLORS[m]} text-white` : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <div className="relative mx-auto flex h-56 w-56 items-center justify-center">
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="6" />
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke={mode === "focus" ? "#6366f1" : mode === "short" ? "#10b981" : "#3b82f6"}
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div>
          <div className="font-mono text-5xl font-bold">{mins}:{secs}</div>
          <div className="mt-1 text-xs text-muted-foreground">{MODE_LABELS[mode]}</div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button onClick={toggle} className="flex items-center gap-1.5 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90">
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={reset} className="rounded-lg border border-border p-2.5 text-slate-500 hover:bg-accent">
          <RotateCcw className="h-4 w-4" />
        </button>
        <button onClick={() => setShowSettings((s) => !s)} className="rounded-lg border border-border p-2.5 text-slate-500 hover:bg-accent">
          <Settings className="h-4 w-4" />
        </button>
      </div>

      <div className="text-xs text-slate-400">
        🍅 {sessionsCompleted} focus session{sessionsCompleted !== 1 ? "s" : ""} completed
      </div>

      {showSettings && (
        <div className="grid grid-cols-3 gap-2 rounded-lg border border-border p-3">
          {Object.keys(MODE_LABELS).map((m) => (
            <div key={m} className="space-y-1">
              <label className="text-[10px] font-medium uppercase text-slate-400">{MODE_LABELS[m]} (min)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={durations[m]}
                onChange={(e) => updateDuration(m, e.target.value)}
                className="w-full rounded-lg border border-border px-2 py-1.5 text-center text-sm outline-none focus:border-primary"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
