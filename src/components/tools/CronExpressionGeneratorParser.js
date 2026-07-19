'use client'
import { useState, useMemo } from "react";
import { CopyButton, ToolInput } from '@/components/tools/ToolUI'

const PRESETS = [
  { label: "Every minute", expr: "* * * * *" },
  { label: "Every hour", expr: "0 * * * *" },
  { label: "Every day at midnight", expr: "0 0 * * *" },
  { label: "Every day at 9am", expr: "0 9 * * *" },
  { label: "Every Monday at 9am", expr: "0 9 * * 1" },
  { label: "First day of every month", expr: "0 0 1 * *" },
  { label: "Every 15 minutes", expr: "*/15 * * * *" },
  { label: "Every weekday at 6pm", expr: "0 18 * * 1-5" },
];

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function describeField(value, unit, names) {
  if (value === "*") return `every ${unit}`;
  if (value.includes("/")) {
    const [range, step] = value.split("/");
    return range === "*" ? `every ${step} ${unit}s` : `every ${step} ${unit}s, within ${range}`;
  }
  if (value.includes("-")) {
    const [start, end] = value.split("-");
    const label = names ? `${names[+start]}–${names[+end]}` : `${start}–${end}`;
    return `${unit} ${label}`;
  }
  if (value.includes(",")) {
    const parts = value.split(",");
    const label = names ? parts.map((p) => names[+p]).join(", ") : parts.join(", ");
    return `${unit}(s) ${label}`;
  }
  return names ? names[+value] : value;
}

function describeCron(expr) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid: a cron expression needs exactly 5 fields (minute hour day month weekday).";
  const [min, hour, dom, mon, dow] = parts;

  const fieldPattern = /^(\*|\d+|\d+-\d+|\d+(,\d+)*|\*\/\d+|\d+-\d+\/\d+)$/;
  for (const p of parts) {
    if (!fieldPattern.test(p)) return `Invalid field: "${p}" isn't a recognized cron pattern.`;
  }

  const bits = [];
  bits.push(min === "*" ? "every minute" : `at minute ${describeField(min, "minute")}`);
  if (hour !== "*") bits.push(`past hour ${describeField(hour, "hour")}`);
  else if (min !== "*") bits.push("of every hour");
  if (dom !== "*") bits.push(`on day ${describeField(dom, "day")} of the month`);
  if (mon !== "*") bits.push(`in ${describeField(mon, "month", ["", ...MONTHS])}`);
  if (dow !== "*") bits.push(`on ${describeField(dow, "day", WEEKDAYS)}`);

  return bits.join(", ");
}

export default function CronGenerator() {
  const [minute, setMinute] = useState("0");
  const [hour, setHour] = useState("9");
  const [dom, setDom] = useState("*");
  const [month, setMonth] = useState("*");
  const [dow, setDow] = useState("*");
  const [rawInput, setRawInput] = useState("");

  const builtExpr = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const parsedExpr = rawInput.trim() || builtExpr;
  const description = useMemo(() => describeCron(parsedExpr), [parsedExpr]);

  const applyPreset = (expr) => {
    const [m, h, d, mo, w] = expr.split(" ");
    setMinute(m); setHour(h); setDom(d); setMonth(mo); setDow(w);
    setRawInput("");
  };

  return (
    <div className="space-y-4">
      <div>
        <ToolInput
          type="text"
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder="e.g. 0 9 * * 1-5"
          label='Paste a cron expression to explain it'
        />
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
        <div className="font-mono text-lg font-bold text-primary">{parsedExpr}</div>
        <div className="mt-1 text-sm text-slate-600">{description}</div>
      </div>

      {!rawInput.trim() && (
        <>
          <div className="grid grid-cols-5 gap-2">
            {[
              ["Minute", minute, setMinute],
              ["Hour", hour, setHour],
              ["Day (mo)", dom, setDom],
              ["Month", month, setMonth],
              ["Day (wk)", dow, setDow],
            ].map(([label, val, setter]) => (
              <div key={label} className="space-y-1">
                <label className="text-[10px] font-medium uppercase text-slate-400">{label}</label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full rounded-lg border border-border px-2 py-1.5 text-center font-mono text-sm outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <span className="text-xs text-slate-400">Copy expression</span>
            <CopyButton value={builtExpr} label="" />
          </div>
        </>
      )}

      <div>
        <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">Presets</div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.expr}
              onClick={() => applyPreset(p.expr)}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
