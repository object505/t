'use client'
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, className, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

export function ToolTextarea({ value, onChange, placeholder, ariaLabel, rows = 8, className }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      rows={rows}
      spellCheck={false}
      className={cn(
        "w-full resize-y rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 scrollbar-thin",
        className
      )}
    />
  );
}

export function ToolInput(props) {
  const { label, className, ...rest } = props;
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-muted-foreground">{label}</label>}
      <input
        {...rest}
        className={cn(
          "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20",
          className
        )}
      />
    </div>
  );
}

export function ToolOutput({ value, placeholder = "Result will appear here", className, mono = true }) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "min-h-[120px] w-full rounded-lg border border-border bg-background px-4 py-3 shadow-inner scrollbar-thin",
        mono && "font-mono",
        "text-sm text-foreground whitespace-pre-wrap break-words",
        !value && "text-muted-foreground",
        className
      )}
    >
      {value || placeholder}
    </div>
  );
}

export function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-3 text-center shadow-sm">
      <div className="font-mono text-2xl font-bold text-primary">{value}</div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

export function ToolSection({ title, children, className }) {
  return (
    <div className={cn("space-y-3", className)}>
      {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
      {children}
    </div>
  );
}
