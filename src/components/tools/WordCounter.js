'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, StatCard } from "@/components/tools/ToolUI";

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpace = text.replace(/\s/g, "").length;
    const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || [text.trim()]).length : 0;
    const paragraphs = text.trim() ? text.trim().split(/\n+/).length : 0;
    const lines = text.trim() ? text.split("\n").length : 0;
    return { words, characters, charactersNoSpace, sentences, paragraphs, lines };
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea
        value={text}
        onChange={setText}
        placeholder="Type or paste your text here…"
        ariaLabel="Text input for word counter"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.characters} />
        <StatCard label="No Spaces" value={stats.charactersNoSpace} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard label="Lines" value={stats.lines} />
      </div>
    </div>
  );
}
