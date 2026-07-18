'use client'
import { useState, useMemo } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

export default function SqlFormatter() {
  const [input, setInput] = useState("");
  const [minify, setMinify] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    let sql = input.trim().replace(/\s+/g, " ");
    if (minify) return sql.replace(/\s*([(),])\s*/g, "$1").trim();
    const keywords = ["SELECT", "FROM", "WHERE", "AND", "OR", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "OUTER JOIN", "JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "UNION", "UNION ALL"];
    keywords.forEach((kw) => {
      sql = sql.replace(new RegExp(`\\b${kw}\\b`, "gi"), `\n${kw}`);
    });
    sql = sql.replace(/,\s*/g, ",\n  ");
    sql = sql.replace(/\n\s*\n/g, "\n").trim();
    if (sql.startsWith("\n")) sql = sql.slice(1);
    return sql;
  }, [input, minify]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setMinify(false)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${!minify ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>Format</button>
        <button onClick={() => setMinify(true)} className={`rounded-lg border px-4 py-1.5 text-sm font-medium ${minify ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>Minify</button>
      </div>
      <ToolTextarea value={input} onChange={setInput} placeholder="SELECT * FROM users WHERE id = 1" ariaLabel="SQL input" rows={5} />
      <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-900 p-4">
        <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all font-mono text-xs text-green-400 scrollbar-thin">{output || "Output…"}</pre>
        {output && <CopyButton value={output} />}
      </div>
    </div>
  );
}
