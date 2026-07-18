'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

const ZONES = ["UTC", "America/New_York", "America/Los_Angeles", "America/Chicago", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Shanghai", "Asia/Kolkata", "Australia/Sydney", "Pacific/Auckland", "America/Sao_Paulo", "America/Mexico_City", "Africa/Cairo", "Asia/Dubai"];

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
        <div><label className="text-sm font-medium text-muted-foreground">From</label><select value={fromZone} onChange={(e) => setFromZone(e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">{ZONES.map((z) => <option key={z}>{z}</option>)}</select></div>
        <div><label className="text-sm font-medium text-muted-foreground">To</label><select value={toZone} onChange={(e) => setToZone(e.target.value)} className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">{ZONES.map((z) => <option key={z}>{z}</option>)}</select></div>
      </div>
      {result && (
        <div className="space-y-2">
          <div className="rounded-lg border border-border bg-slate-50 p-3 text-sm"><span className="text-slate-500">{fromZone}:</span> <span className="font-medium text-slate-800">{result.from}</span></div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm"><span className="text-primary">{toZone}:</span> <span className="font-bold text-primary">{result.to}</span></div>
        </div>
      )}
    </div>
  );
}
