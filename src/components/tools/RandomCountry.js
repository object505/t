'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const COUNTRIES = ["United States", "Canada", "United Kingdom", "France", "Germany", "Italy", "Spain", "Portugal", "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Norway", "Denmark", "Finland", "Poland", "Russia", "Ukraine", "Turkey", "Greece", "Brazil", "Argentina", "Mexico", "Colombia", "Chile", "Peru", "Japan", "China", "South Korea", "India", "Thailand", "Vietnam", "Indonesia", "Philippines", "Malaysia", "Singapore", "Australia", "New Zealand", "South Africa", "Egypt", "Morocco", "Nigeria", "Kenya", "Saudi Arabia", "UAE", "Israel", "Iceland", "Ireland", "Czech Republic"];

export default function RandomCountry() {
  const [country, setCountry] = useState("");

  const generate = () => setCountry(COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]);

  return (
    <div className="space-y-4 text-center">
      <div className="flex h-32 items-center justify-center rounded-xl border border-border bg-slate-50">
        <span className="text-2xl font-bold text-slate-800">{country || "🌍"}</span>
      </div>
      <button onClick={generate} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Generate Country</button>
      {country && <div><CopyButton value={country} label="Copy" /></div>}
    </div>
  );
}
