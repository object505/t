'use client'
import { useState } from "react";

export default function ClipboardHistory() {
  const [items, setItems] = useState([]);

  const add = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && !items.includes(text)) setItems([text, ...items].slice(0, 20));
    } catch { /* clipboard read blocked */ }
  };

  const copy = async (text) => { await navigator.clipboard.writeText(text); };

  return (
    <div className="space-y-4">
      <button onClick={add} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90">Read Clipboard & Add</button>
      {items.length === 0 ? (
        <div className="rounded-lg border border-border bg-slate-50 px-4 py-3 text-center text-sm text-slate-400">No clipboard history yet. Click the button above to capture your current clipboard.</div>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-50 p-3">
              <span className="line-clamp-2 flex-1 break-all font-mono text-sm text-slate-700">{item}</span>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => copy(item)} className="rounded border border-border bg-white px-2 py-1 text-xs text-muted-foreground hover:border-primary/30">Copy</button>
                <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="rounded border border-border bg-white px-2 py-1 text-xs text-red-500 hover:bg-red-50">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
