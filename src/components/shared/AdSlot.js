"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CLIENT_ID = "ca-pub-7682472904147708";

const SLOT_IDS = {
  banner: "2901864617",
  sidebar: "9195810223",
  tile: "3061646714",
};

const SIZES = {
  banner: { width: 728, height: 90, format: "auto", fullWidthResponsive: true },
  sidebar: { width: 300, height: 600 },
  // In-feed ads use "fluid" + a layout key from AdSense, not auto/full-width-responsive
  tile: { format: "fluid", layoutKey: "-h3-5+1v-2l-d" },
};

export function AdSlot({ variant = "tile", className, label = "Sponsored", slot }) {
  const insRef = useRef(null);

  const adSlot = slot || SLOT_IDS[variant];
  const size = SIZES[variant] || {};

  useEffect(() => {
    const ins = insRef.current;
    if (!ins) return;

    if (ins.getAttribute("data-adsbygoogle-status")) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense push failed:", err);
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return <PlaceholderTile variant={variant} className={className} label={label} />;
  }

  return (
    <ins
      ref={insRef}
      className={cn("adsbygoogle block", className)}
      style={{
        display: "block",
        ...(size.width ? { width: size.width, height: size.height } : {}),
      }}
      data-ad-client={CLIENT_ID}
      data-ad-slot={adSlot}
      {...(size.format ? { "data-ad-format": size.format } : {})}
      {...(size.layoutKey ? { "data-ad-layout-key": size.layoutKey } : {})}
      {...(size.fullWidthResponsive ? { "data-full-width-responsive": "true" } : {})}
    />
  );
}

function PlaceholderTile({ variant, className, label }) {
  const base =
    "flex items-center justify-center border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100/60 text-slate-400";

  const dims =
    variant === "banner"
      ? "h-[90px] w-full rounded-xl text-xs font-medium uppercase tracking-widest"
      : variant === "sidebar"
        ? "h-[600px] w-full rounded-xl text-xs font-medium"
        : "h-full min-h-[150px] rounded-xl text-xs font-medium";

  return (
    <div className={cn(base, dims, className)}>
      <div className="text-center">
        <div className="text-[10px] font-semibold text-slate-300">{label}</div>
        <div className="mt-0.5">
          Google Ad{variant === "banner" ? " · 728×90" : variant === "sidebar" ? " · 300×600" : ""}
        </div>
      </div>
    </div>
  );
}
