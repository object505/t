'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const FIRST = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Daniel", "Nancy", "Matthew", "Lisa", "Anthony", "Betty", "Mark", "Sandra", "Donald", "Ashley"];
const LAST = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];

export default function RandomNameGenerator() {
  const [count, setCount] = useState(5);
  const [names, setNames] = useState([]);

  const generate = () => {
    setNames(Array.from({ length: count }, () => `${FIRST[Math.floor(Math.random() * FIRST.length)]} ${LAST[Math.floor(Math.random() * LAST.length)]}`));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <div className="space-y-1.5"><label className="text-sm font-medium text-muted-foreground">Count</label><input type="number" min="1" max="50" value={count} onChange={(e) => setCount(Math.max(1, Math.min(50, +e.target.value)))} className="w-24 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" /></div>
        <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Generate</button>
      </div>
      {names.length > 0 && (
        <div className="space-y-1.5">
          {names.map((n, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2">
              <span className="text-sm text-slate-700">{n}</span>
              <CopyButton value={n} label="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
