'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const STREETS = ["Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine Rd", "Elm St", "Washington Blvd", "Park Ave", "Lake Dr", "Hill Rd", "River Rd", "Sunset Blvd", "First St", "Second Ave", "Highland Ave"];
const CITIES = [["Springfield", "IL"], ["Portland", "OR"], ["Austin", "TX"], ["Denver", "CO"], ["Seattle", "WA"], ["Boston", "MA"], ["Atlanta", "GA"], ["Phoenix", "AZ"], ["Nashville", "TN"], ["Miami", "FL"], ["Chicago", "IL"], ["Dallas", "TX"]];

export default function RandomAddress() {
  const [addr, setAddr] = useState("");

  const generate = () => {
    const num = Math.floor(Math.random() * 9999) + 1;
    const street = STREETS[Math.floor(Math.random() * STREETS.length)];
    const [city, state] = CITIES[Math.floor(Math.random() * CITIES.length)];
    const zip = String(Math.floor(Math.random() * 90000) + 10000);
    setAddr(`${num} ${street}\n${city}, ${state} ${zip}`);
  };

  return (
    <div className="space-y-4">
      <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Generate Address</button>
      {addr && (
        <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-50 p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800">{addr}</pre>
          <CopyButton value={addr} />
        </div>
      )}
    </div>
  );
}
