'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, StatCard } from "@/components/tools/ToolUI";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => ({
    total: text.length,
    noSpaces: text.replace(/\s/g, "").length,
    spaces: (text.match(/\s/g) || []).length,
  }), [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Type or paste text…" ariaLabel="Text input" />
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="With Spaces" value={stats.total} />
        <StatCard label="No Spaces" value={stats.noSpaces} />
        <StatCard label="Spaces Only" value={stats.spaces} />
      </div>
    </div>
  );
}
