'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

const ALL_ZONES = Intl.supportedValuesOf("timeZone").sort();

function ZoneSelect({ label, value, onChange }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return ALL_ZONES.slice(0, 50); // cap initial list for perf
    const q = query.toLowerCase();
    return ALL_ZONES.filter((z) => z.toLowerCase().includes(q)).slice(0, 50);
  }, [query]);

  return (
    <div className="relative">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <input
        type="text"
        value={open ? query : value}
        onFocus={() => { setOpen(true); setQuery(""); }}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search timezone..."
        className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
      />
      {open && (
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-background shadow-md text-sm">
          {filtered.length === 0 && (
            <li className="px-3 py-2 text-muted-foreground">No matches</li>
          )}
          {filtered.map((z) => (
            <li
              key={z}
              onMouseDown={() => { onChange(z); setOpen(false); }}
              className="cursor-pointer px-3 py-2 hover:bg-accent hover:text-primary"
            >
              {z}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function TimeZoneConverter() {
  const [time, setTime] = useState(new Date().toISOString().slice(0, 16));
  const [fromZone, setFromZone] = useState("UTC");
  const [toZone, setToZone] = useState("America/New_York");

  const result = useMemo(() => {
    if (!time) return null;
    try {
      const date = new Date(time + ":00");
      const fromFmt = new Intl.DateTimeFormat("en-US", { timeZone: fromZone, dateStyle: "full", timeStyle: "long" });
      const toFmt = new Intl.DateTimeFormat("en-US", { timeZone: toZone, dateStyle: "full", timeStyle: "long" });
      return { from: fromFmt.format(date), to: toFmt.format(date) };
    } catch { return null; }
  }, [time, fromZone, toZone]);

  return (
    <div className="space-y-4">
      <ToolInput type="datetime-local" label="Date & time" value={time} onChange={(e) => setTime(e.target.value)} />
      <div className="grid gap-3 sm:grid-cols-2">
        <ZoneSelect label="From" value={fromZone} onChange={setFromZone} />
        <ZoneSelect label="To" value={toZone} onChange={setToZone} />
      </div>
      {result && (
        <div className="space-y-2">
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-sm"><span className="text-slate-500">{fromZone}:</span> <span className="font-medium text-slate-800">{result.from}</span></div>
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-sm"><span className="text-slate-500">{toZone}:</span> <span className="font-medium text-slate-800">{result.to}</span></div>
        </div>
      )}
    </div>
  );
}