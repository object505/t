'use client'
import { useState, useEffect } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";

export default function UnixTimestamp() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [ts, setTs] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const tsToDate = (() => {
    if (!ts) return "";
    const d = new Date(parseInt(ts) * 1000);
    return isNaN(d) ? "Invalid timestamp" : d.toLocaleString();
  })();

  const dateToTs = (() => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d) ? "" : Math.floor(d.getTime() / 1000);
  })();

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-slate-50 p-4 text-center">
        <div className="text-xs uppercase tracking-wide text-slate-400">Current Unix timestamp</div>
        <div className="mt-1 font-mono text-3xl font-bold text-primary">{now}</div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <ToolInput type="number" label="Timestamp → Date" value={ts} onChange={(e) => setTs(e.target.value)} placeholder="1700000000" />
          <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2">
            <code className="text-sm text-slate-700">{tsToDate || "—"}</code>
            {tsToDate && tsToDate !== "Invalid timestamp" && <CopyButton value={tsToDate} label="" />}
          </div>
        </div>
        <div className="space-y-2">
          <ToolInput type="datetime-local" label="Date → Timestamp" value={date} onChange={(e) => setDate(e.target.value)} />
          <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2">
            <code className="font-mono text-sm text-slate-700">{dateToTs || "—"}</code>
            {dateToTs && <CopyButton value={String(dateToTs)} label="" />}
          </div>
        </div>
      </div>
    </div>
  );
}
