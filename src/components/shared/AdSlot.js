import { cn } from "@/lib/utils";

/**
 * Native Utility Ad — styled to blend into the tool grid ("Native Utility Ads").
 * Replace the inner content with your Google AdSense slot code when ready.
 */
export function AdSlot({ variant = "tile", className, label = "Sponsored" }) {
  const base =
    "flex items-center justify-center border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100/60 text-slate-400";

  if (variant === "banner") {
    return (
      <div className={cn(base, "h-[90px] w-full rounded-xl text-xs font-medium uppercase tracking-widest", className)}>
        <div className="text-center">
          <div className="text-[10px] font-semibold text-slate-300">{label}</div>
          <div className="mt-0.5">Google Ad · 728×90</div>
        </div>
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className={cn(base, "h-[600px] w-full rounded-xl text-xs font-medium", className)}>
        <div className="text-center">
          <div className="text-[10px] font-semibold text-slate-300">{label}</div>
          <div className="mt-0.5">Google Ad · 300×600</div>
        </div>
      </div>
    );
  }

  // tile — matches grid tool cards
  return (
    <div className={cn(base, "h-full min-h-[150px] rounded-xl text-xs font-medium", className)}>
      <div className="text-center">
        <div className="text-[10px] font-semibold text-slate-300">{label}</div>
        <div className="mt-0.5">Google Ad</div>
      </div>
    </div>
  );
}