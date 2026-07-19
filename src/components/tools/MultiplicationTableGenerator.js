'use client'
import { useState } from "react";
import { ToolInput } from '@/components/tools/ToolUI'

export default function MultiplicationTable() {
  const [number, setNumber] = useState(5);
  const [rangeEnd, setRangeEnd] = useState(12);

  const rows = Array.from({ length: rangeEnd }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <ToolInput
            type="number"
            label="Table for"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-1">
          <ToolInput
            type="number"
            label="Up to ×"
            min="1"
            max="50"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        {rows.map((i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-2 text-sm ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
          >
            <span className="text-slate-500">
              {number} × {i}
            </span>
            <span className="font-mono font-bold text-slate-800">{number * i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
