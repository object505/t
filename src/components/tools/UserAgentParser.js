'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

export default function UserAgentParser() {
  const [ua, setUa] = useState(navigator.userAgent);

  const parsed = useMemo(() => {
    if (!ua.trim()) return null;
    const browser = ua.match(/(Firefox|Chrome|Safari|Edge|Opera|OPR|MSIE|Trident)\/[\d.]+/)?.[0] || "Unknown";
    const os = ua.match(/(Windows NT [\d.]+|Mac OS X [\d_]+|Android [\d.]+|iPhone OS [\d_]+|Linux|CrOS)/)?.[0]?.replace(/_/g, ".") || "Unknown";
    const device = /iPad|Tablet/i.test(ua) ? "Tablet" : /Mobile|Android|iPhone/i.test(ua) ? "Mobile" : "Desktop";
    const engine = ua.match(/(Gecko|WebKit|Blink|Trident|Presto)/)?.[0] || "Unknown";
    return { browser, os, device, engine };
  }, [ua]);

  return (
    <div className="space-y-4">
      <ToolInput label="User Agent string" value={ua} onChange={(e) => setUa(e.target.value)} className="font-mono text-xs" />
      {parsed && (
        <div className="overflow-hidden rounded-lg border border-border">
          {[["Browser", parsed.browser], ["Operating System", parsed.os], ["Device Type", parsed.device], ["Engine", parsed.engine]].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-border px-4 py-2 text-sm last:border-0">
              <span className="text-slate-500">{label}</span>
              <code className="font-mono text-slate-700">{value}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
