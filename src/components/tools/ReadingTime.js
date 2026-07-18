'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, StatCard } from "@/components/tools/ToolUI";

export default function ReadingTime() {
  const [text, setText] = useState("");
  const { words, minutes, seconds } = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const totalSeconds = Math.ceil((words / 200) * 60);
    return { words, minutes: Math.floor(totalSeconds / 60), seconds: totalSeconds % 60 };
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Paste your text to estimate reading time…" ariaLabel="Text input" />
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Words" value={words} />
        <StatCard label="Minutes" value={minutes} />
        <StatCard label="Seconds" value={seconds} />
      </div>
      <p className="text-xs text-slate-400">Based on an average reading speed of 200 words per minute.</p>
    </div>
  );
}
