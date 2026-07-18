'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";

export default function ColorPicker() {
  const [color, setColor] = useState("#2563eb");
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-16 w-24 cursor-pointer rounded-lg border border-border" />
        <div className="space-y-1">
          <div className="font-mono text-2xl font-bold text-slate-900">{color.toUpperCase()}</div>
          <div className="text-sm text-slate-500">Pick a color to get its values</div>
        </div>
      </div>
      <div className="rounded-lg border border-border" style={{ backgroundColor: color, minHeight: 80 }} />
      <div className="flex justify-end">
        <CopyButton value={color.toUpperCase()} label="Copy HEX" />
      </div>
    </div>
  );
}
