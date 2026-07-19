'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { Plus, Minus } from "lucide-react";

const ALIGN_OPTIONS = [
  { value: "none", label: "Default", syntax: "---" },
  { value: "left", label: "Left", syntax: ":--" },
  { value: "center", label: "Center", syntax: ":-:" },
  { value: "right", label: "Right", syntax: "--:" },
];

export default function MarkdownTableGenerator() {
  const [headers, setHeaders] = useState(["Name", "Role", "Location"]);
  const [rows, setRows] = useState([
    ["Alice", "Engineer", "Remote"],
    ["Bob", "Designer", "NYC"],
  ]);
  const [alignments, setAlignments] = useState(["none", "none", "none"]);

  const addColumn = () => {
    setHeaders((h) => [...h, `Column ${h.length + 1}`]);
    setRows((rs) => rs.map((r) => [...r, ""]));
    setAlignments((a) => [...a, "none"]);
  };

  const removeColumn = (i) => {
    if (headers.length <= 1) return;
    setHeaders((h) => h.filter((_, idx) => idx !== i));
    setRows((rs) => rs.map((r) => r.filter((_, idx) => idx !== i)));
    setAlignments((a) => a.filter((_, idx) => idx !== i));
  };

  const addRow = () => setRows((rs) => [...rs, headers.map(() => "")]);
  const removeRow = (i) => setRows((rs) => rs.filter((_, idx) => idx !== i));

  const updateHeader = (i, val) => setHeaders((h) => h.map((x, idx) => (idx === i ? val : x)));
  const updateCell = (r, c, val) => setRows((rs) => rs.map((row, ri) => (ri === r ? row.map((x, ci) => (ci === c ? val : x)) : row)));
  const cycleAlign = (i) => {
    setAlignments((a) =>
      a.map((x, idx) => {
        if (idx !== i) return x;
        const order = ["none", "left", "center", "right"];
        return order[(order.indexOf(x) + 1) % order.length];
      })
    );
  };

  const colWidth = (i) => Math.max(headers[i].length, ...rows.map((r) => (r[i] || "").length), 3);

  const markdown = (() => {
    const widths = headers.map((_, i) => colWidth(i));
    const headerLine = "| " + headers.map((h, i) => h.padEnd(widths[i])).join(" | ") + " |";
    const sepLine =
      "| " +
      alignments
        .map((a, i) => {
          const w = widths[i];
          if (a === "center") return ":" + "-".repeat(Math.max(w - 2, 1)) + ":";
          if (a === "left") return ":" + "-".repeat(Math.max(w - 1, 1));
          if (a === "right") return "-".repeat(Math.max(w - 1, 1)) + ":";
          return "-".repeat(w);
        })
        .join(" | ") +
      " |";
    const rowLines = rows.map((r) => "| " + r.map((cell, i) => (cell || "").padEnd(widths[i])).join(" | ") + " |");
    return [headerLine, sepLine, ...rowLines].join("\n");
  })();

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
          <tr className="bg-card">
            {headers.map((h, i) => (
              <th key={i} className="border-b border-border p-1">
                <div className="flex items-center gap-1">
                  <input
                    value={h}
                    onChange={(e) => updateHeader(i, e.target.value)}
                    className="w-full min-w-[80px] rounded border border-border bg-background px-2 py-1 text-xs font-semibold outline-none focus:border-primary"
                  />
                  <button onClick={() => cycleAlign(i)} title="Cycle alignment" className="shrink-0 rounded border border-border bg-background px-1.5 py-1 text-[10px] text-foreground hover:text-primary">
                    {ALIGN_OPTIONS.find((a) => a.value === alignments[i])?.label[0]}
                  </button>
                  <button onClick={() => removeColumn(i)} className="shrink-0 rounded p-1 text-slate-300 hover:text-rose-500">
                    <Minus className="h-3 w-3" />
                  </button>
                </div>
              </th>
            ))}
            <th className="border-b border-border p-1">
              <button onClick={addColumn} className="rounded p-1 text-slate-400 hover:text-primary">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </th>
          </tr>
          </thead>
          <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="border-b border-border p-1">
                  <input
                    value={cell}
                    onChange={(e) => updateCell(ri, ci, e.target.value)}
                    className="w-full min-w-[80px] rounded border border-border px-2 py-1 text-xs outline-none focus:border-primary"
                  />
                </td>
              ))}
              <td className="border-b border-border p-1">
                <button onClick={() => removeRow(ri)} className="rounded p-1 text-slate-300 hover:text-rose-500">
                  <Minus className="h-3.5 w-3.5" />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <button onClick={addRow} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-sm text-slate-500 hover:border-primary/40 hover:text-primary">
        <Plus className="h-4 w-4" /> Add Row
      </button>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Markdown output</span>
          <CopyButton value={markdown} label="Copy" />
        </div>
        <pre className="overflow-auto rounded-lg bg-slate-900 p-3 font-mono text-xs text-slate-100">{markdown}</pre>
      </div>
    </div>
  );
}
