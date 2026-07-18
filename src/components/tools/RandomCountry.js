'use client'
import { useState, useRef } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

// [name, continent, flag emoji]
const COUNTRIES = [
  ["Afghanistan", "Asia", "🇦🇫"], ["Albania", "Europe", "🇦🇱"], ["Algeria", "Africa", "🇩🇿"],
  ["Andorra", "Europe", "🇦🇩"], ["Angola", "Africa", "🇦🇴"], ["Antigua and Barbuda", "Americas", "🇦🇬"],
  ["Argentina", "Americas", "🇦🇷"], ["Armenia", "Asia", "🇦🇲"], ["Australia", "Oceania", "🇦🇺"],
  ["Austria", "Europe", "🇦🇹"], ["Azerbaijan", "Asia", "🇦🇿"], ["Bahamas", "Americas", "🇧🇸"],
  ["Bahrain", "Asia", "🇧🇭"], ["Bangladesh", "Asia", "🇧🇩"], ["Barbados", "Americas", "🇧🇧"],
  ["Belarus", "Europe", "🇧🇾"], ["Belgium", "Europe", "🇧🇪"], ["Belize", "Americas", "🇧🇿"],
  ["Benin", "Africa", "🇧🇯"], ["Bhutan", "Asia", "🇧🇹"], ["Bolivia", "Americas", "🇧🇴"],
  ["Bosnia and Herzegovina", "Europe", "🇧🇦"], ["Botswana", "Africa", "🇧🇼"], ["Brazil", "Americas", "🇧🇷"],
  ["Brunei", "Asia", "🇧🇳"], ["Bulgaria", "Europe", "🇧🇬"], ["Burkina Faso", "Africa", "🇧🇫"],
  ["Burundi", "Africa", "🇧🇮"], ["Cabo Verde", "Africa", "🇨🇻"], ["Cambodia", "Asia", "🇰🇭"],
  ["Cameroon", "Africa", "🇨🇲"], ["Canada", "Americas", "🇨🇦"], ["Central African Republic", "Africa", "🇨🇫"],
  ["Chad", "Africa", "🇹🇩"], ["Chile", "Americas", "🇨🇱"], ["China", "Asia", "🇨🇳"],
  ["Colombia", "Americas", "🇨🇴"], ["Comoros", "Africa", "🇰🇲"], ["Costa Rica", "Americas", "🇨🇷"],
  ["Croatia", "Europe", "🇭🇷"], ["Cuba", "Americas", "🇨🇺"], ["Cyprus", "Europe", "🇨🇾"],
  ["Czech Republic", "Europe", "🇨🇿"], ["Denmark", "Europe", "🇩🇰"], ["Djibouti", "Africa", "🇩🇯"],
  ["Dominica", "Americas", "🇩🇲"], ["Dominican Republic", "Americas", "🇩🇴"], ["Ecuador", "Americas", "🇪🇨"],
  ["Egypt", "Africa", "🇪🇬"], ["El Salvador", "Americas", "🇸🇻"], ["Equatorial Guinea", "Africa", "🇬🇶"],
  ["Eritrea", "Africa", "🇪🇷"], ["Estonia", "Europe", "🇪🇪"], ["Eswatini", "Africa", "🇸🇿"],
  ["Ethiopia", "Africa", "🇪🇹"], ["Fiji", "Oceania", "🇫🇯"], ["Finland", "Europe", "🇫🇮"],
  ["France", "Europe", "🇫🇷"], ["Gabon", "Africa", "🇬🇦"], ["Gambia", "Africa", "🇬🇲"],
  ["Georgia", "Asia", "🇬🇪"], ["Germany", "Europe", "🇩🇪"], ["Ghana", "Africa", "🇬🇭"],
  ["Greece", "Europe", "🇬🇷"], ["Grenada", "Americas", "🇬🇩"], ["Guatemala", "Americas", "🇬🇹"],
  ["Guinea", "Africa", "🇬🇳"], ["Guinea-Bissau", "Africa", "🇬🇼"], ["Guyana", "Americas", "🇬🇾"],
  ["Haiti", "Americas", "🇭🇹"], ["Honduras", "Americas", "🇭🇳"], ["Hungary", "Europe", "🇭🇺"],
  ["Iceland", "Europe", "🇮🇸"], ["India", "Asia", "🇮🇳"], ["Indonesia", "Asia", "🇮🇩"],
  ["Iran", "Asia", "🇮🇷"], ["Iraq", "Asia", "🇮🇶"], ["Ireland", "Europe", "🇮🇪"],
  ["Israel", "Asia", "🇮🇱"], ["Italy", "Europe", "🇮🇹"], ["Jamaica", "Americas", "🇯🇲"],
  ["Japan", "Asia", "🇯🇵"], ["Jordan", "Asia", "🇯🇴"], ["Kazakhstan", "Asia", "🇰🇿"],
  ["Kenya", "Africa", "🇰🇪"], ["Kiribati", "Oceania", "🇰🇮"], ["Kuwait", "Asia", "🇰🇼"],
  ["Kyrgyzstan", "Asia", "🇰🇬"], ["Laos", "Asia", "🇱🇦"], ["Latvia", "Europe", "🇱🇻"],
  ["Lebanon", "Asia", "🇱🇧"], ["Lesotho", "Africa", "🇱🇸"], ["Liberia", "Africa", "🇱🇷"],
  ["Libya", "Africa", "🇱🇾"], ["Liechtenstein", "Europe", "🇱🇮"], ["Lithuania", "Europe", "🇱🇹"],
  ["Luxembourg", "Europe", "🇱🇺"], ["Madagascar", "Africa", "🇲🇬"], ["Malawi", "Africa", "🇲🇼"],
  ["Malaysia", "Asia", "🇲🇾"], ["Maldives", "Asia", "🇲🇻"], ["Mali", "Africa", "🇲🇱"],
  ["Malta", "Europe", "🇲🇹"], ["Marshall Islands", "Oceania", "🇲🇭"], ["Mauritania", "Africa", "🇲🇷"],
  ["Mauritius", "Africa", "🇲🇺"], ["Mexico", "Americas", "🇲🇽"], ["Micronesia", "Oceania", "🇫🇲"],
  ["Moldova", "Europe", "🇲🇩"], ["Monaco", "Europe", "🇲🇨"], ["Mongolia", "Asia", "🇲🇳"],
  ["Montenegro", "Europe", "🇲🇪"], ["Morocco", "Africa", "🇲🇦"], ["Mozambique", "Africa", "🇲🇿"],
  ["Myanmar", "Asia", "🇲🇲"], ["Namibia", "Africa", "🇳🇦"], ["Nauru", "Oceania", "🇳🇷"],
  ["Nepal", "Asia", "🇳🇵"], ["Netherlands", "Europe", "🇳🇱"], ["New Zealand", "Oceania", "🇳🇿"],
  ["Nicaragua", "Americas", "🇳🇮"], ["Niger", "Africa", "🇳🇪"], ["Nigeria", "Africa", "🇳🇬"],
  ["North Korea", "Asia", "🇰🇵"], ["North Macedonia", "Europe", "🇲🇰"], ["Norway", "Europe", "🇳🇴"],
  ["Oman", "Asia", "🇴🇲"], ["Pakistan", "Asia", "🇵🇰"], ["Palau", "Oceania", "🇵🇼"],
  ["Panama", "Americas", "🇵🇦"], ["Papua New Guinea", "Oceania", "🇵🇬"], ["Paraguay", "Americas", "🇵🇾"],
  ["Peru", "Americas", "🇵🇪"], ["Philippines", "Asia", "🇵🇭"], ["Poland", "Europe", "🇵🇱"],
  ["Portugal", "Europe", "🇵🇹"], ["Qatar", "Asia", "🇶🇦"], ["Romania", "Europe", "🇷🇴"],
  ["Russia", "Europe", "🇷🇺"], ["Rwanda", "Africa", "🇷🇼"], ["Saint Kitts and Nevis", "Americas", "🇰🇳"],
  ["Saint Lucia", "Americas", "🇱🇨"], ["Saint Vincent and the Grenadines", "Americas", "🇻🇨"],
  ["Samoa", "Oceania", "🇼🇸"], ["San Marino", "Europe", "🇸🇲"], ["Sao Tome and Principe", "Africa", "🇸🇹"],
  ["Saudi Arabia", "Asia", "🇸🇦"], ["Senegal", "Africa", "🇸🇳"], ["Serbia", "Europe", "🇷🇸"],
  ["Seychelles", "Africa", "🇸🇨"], ["Sierra Leone", "Africa", "🇸🇱"], ["Singapore", "Asia", "🇸🇬"],
  ["Slovakia", "Europe", "🇸🇰"], ["Slovenia", "Europe", "🇸🇮"], ["Solomon Islands", "Oceania", "🇸🇧"],
  ["Somalia", "Africa", "🇸🇴"], ["South Africa", "Africa", "🇿🇦"], ["South Korea", "Asia", "🇰🇷"],
  ["South Sudan", "Africa", "🇸🇸"], ["Spain", "Europe", "🇪🇸"], ["Sri Lanka", "Asia", "🇱🇰"],
  ["Sudan", "Africa", "🇸🇩"], ["Suriname", "Americas", "🇸🇷"], ["Sweden", "Europe", "🇸🇪"],
  ["Switzerland", "Europe", "🇨🇭"], ["Syria", "Asia", "🇸🇾"], ["Taiwan", "Asia", "🇹🇼"],
  ["Tajikistan", "Asia", "🇹🇯"], ["Tanzania", "Africa", "🇹🇿"], ["Thailand", "Asia", "🇹🇭"],
  ["Timor-Leste", "Asia", "🇹🇱"], ["Togo", "Africa", "🇹🇬"], ["Tonga", "Oceania", "🇹🇴"],
  ["Trinidad and Tobago", "Americas", "🇹🇹"], ["Tunisia", "Africa", "🇹🇳"], ["Turkey", "Asia", "🇹🇷"],
  ["Turkmenistan", "Asia", "🇹🇲"], ["Tuvalu", "Oceania", "🇹🇻"], ["Uganda", "Africa", "🇺🇬"],
  ["Ukraine", "Europe", "🇺🇦"], ["United Arab Emirates", "Asia", "🇦🇪"], ["United Kingdom", "Europe", "🇬🇧"],
  ["United States", "Americas", "🇺🇸"], ["Uruguay", "Americas", "🇺🇾"], ["Uzbekistan", "Asia", "🇺🇿"],
  ["Vanuatu", "Oceania", "🇻🇺"], ["Vatican City", "Europe", "🇻🇦"], ["Venezuela", "Americas", "🇻🇪"],
  ["Vietnam", "Asia", "🇻🇳"], ["Yemen", "Asia", "🇾🇪"], ["Zambia", "Africa", "🇿🇲"],
  ["Zimbabwe", "Africa", "🇿🇼"],
];

const CONTINENTS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RandomCountry() {
  const [continent, setContinent] = useState("All");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const lastRef = useRef(null);

  const pool = continent === "All" ? COUNTRIES : COUNTRIES.filter((c) => c[1] === continent);

  const generate = () => {
    if (spinning || pool.length === 0) return;
    setSpinning(true);
    let ticks = 0;
    const maxTicks = 12;
    const interval = setInterval(() => {
      setResult(pool[Math.floor(Math.random() * pool.length)]);
      ticks++;
      if (ticks >= maxTicks) {
        clearInterval(interval);
        let final;
        do {
          final = pool[Math.floor(Math.random() * pool.length)];
        } while (final[0] === lastRef.current && pool.length > 1);
        lastRef.current = final[0];
        setResult(final);
        setHistory((h) => [final, ...h.filter((c) => c[0] !== final[0])].slice(0, 6));
        setSpinning(false);
      }
    }, 60);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-wrap justify-center gap-1.5">
        {CONTINENTS.map((c) => (
          <button
            key={c}
            onClick={() => setContinent(c)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              continent === c ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex h-32 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-slate-50">
        {result ? (
          <>
            <span className={`text-5xl transition-transform ${spinning ? "scale-90" : "scale-100"}`}>{result[2]}</span>
            <span className="text-xl font-bold text-slate-800">{result[0]}</span>
          </>
        ) : (
          <span className="text-4xl">🌍</span>
        )}
      </div>

      <button
        onClick={generate}
        disabled={spinning}
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
      >
        <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} /> {spinning ? "Rolling…" : "Generate Country"}
      </button>
      {result && <div><CopyButton value={result[0]} label="Copy" /></div>}

      {history.length > 0 && (
        <div className="border-t border-border pt-3">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Recent</div>
          <div className="flex flex-wrap justify-center gap-2">
            {history.map(([name, , flag], i) => (
              <button
                key={i}
                onClick={() => setResult(COUNTRIES.find((c) => c[0] === name))}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 py-1.5 text-sm hover:border-primary/40"
              >
                <span>{flag}</span><span className="text-slate-600">{name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
