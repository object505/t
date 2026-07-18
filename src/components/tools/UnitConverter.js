'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

const UNITS = {
  Area: { units: { m2: 1, km2: 1000000, cm2: 0.0001, mm2: 0.000001, ha: 10000, acre: 4046.86, ft2: 0.092903, in2: 0.00064516, mi2: 2589988.11 } },
  "Data Transfer Rate": { units: { bps: 1, kbps: 1000, Mbps: 1e6, Gbps: 1e9, Tbps: 1e12, Bps: 8, KBps: 8000, MBps: 8e6, GBps: 8e9 } },
  "Digital Storage": { units: { bit: 0.125, byte: 1, KB: 1000, MB: 1e6, GB: 1e9, TB: 1e12, PB: 1e15 } },
  Energy: { units: { J: 1, kJ: 1000, cal: 4.184, kcal: 4184, Wh: 3600, kWh: 3.6e6, eV: 1.602176634e-19, BTU: 1055.06 } },
  Frequency: { units: { Hz: 1, kHz: 1000, MHz: 1e6, GHz: 1e9, THz: 1e12 } },
  "Fuel Economy": { units: { mpg: "mpg", mpgUK: "mpgUK", kml: "kml", L100km: "L100km" } },
  Length: { units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254, nmi: 1852 } },
  Mass: { units: { kg: 1, g: 0.001, mg: 0.000001, t: 1000, lb: 0.453592, oz: 0.0283495, st: 6.35029 } },
  "Plane Angle": { units: { deg: 1, rad: 57.29578, grad: 0.9, arcmin: 1 / 60, arcsec: 1 / 3600 } },
  Pressure: { units: { Pa: 1, kPa: 1000, MPa: 1e6, bar: 100000, atm: 101325, psi: 6894.76, torr: 133.322, mmHg: 133.322 } },
  Speed: { units: { "m/s": 1, "km/h": 0.277778, mph: 0.44704, knot: 0.514444, "ft/s": 0.3048 } },
  Temperature: { units: { C: "C", F: "F", K: "K" } },
  Time: { units: { s: 1, ms: 0.001, min: 60, h: 3600, day: 86400, week: 604800, month: 2629746, year: 31556952 } },
  Volume: { units: { L: 1, mL: 0.001, gal: 3.78541, qt: 0.946353, pt: 0.473176, cup: 0.236588, floz: 0.0295735, m3: 1000 } },
};

const LABELS = {
  m2: "Square meter (m²)", km2: "Square kilometer (km²)", cm2: "Square centimeter (cm²)", mm2: "Square millimeter (mm²)",
  ha: "Hectare (ha)", acre: "Acre (acre)", ft2: "Square foot (ft²)", in2: "Square inch (in²)", mi2: "Square mile (mi²)",

  bps: "Bit per second (bps)", kbps: "Kilobit per second (kbps)", Mbps: "Megabit per second (Mbps)", Gbps: "Gigabit per second (Gbps)", Tbps: "Terabit per second (Tbps)",
  Bps: "Byte per second (Bps)", KBps: "Kilobyte per second (KBps)", MBps: "Megabyte per second (MBps)", GBps: "Gigabyte per second (GBps)",

  bit: "Bit (bit)", byte: "Byte (byte)", KB: "Kilobyte (KB)", MB: "Megabyte (MB)", GB: "Gigabyte (GB)", TB: "Terabyte (TB)", PB: "Petabyte (PB)",

  J: "Joule (J)", kJ: "Kilojoule (kJ)", cal: "Calorie (cal)", kcal: "Kilocalorie (kcal)", Wh: "Watt-hour (Wh)", kWh: "Kilowatt-hour (kWh)", eV: "Electronvolt (eV)", BTU: "British thermal unit (BTU)",

  Hz: "Hertz (Hz)", kHz: "Kilohertz (kHz)", MHz: "Megahertz (MHz)", GHz: "Gigahertz (GHz)", THz: "Terahertz (THz)",

  mpg: "Mile per gallon (mpg)", mpgUK: "Mile per gallon UK (mpg UK)", kml: "Kilometer per liter (km/L)", L100km: "Liter per 100 km (L/100km)",

  m: "Meter (m)", km: "Kilometer (km)", cm: "Centimeter (cm)", mm: "Millimeter (mm)", mi: "Mile (mi)", yd: "Yard (yd)", ft: "Foot (ft)", in: "Inch (in)", nmi: "Nautical mile (nmi)",

  kg: "Kilogram (kg)", g: "Gram (g)", mg: "Milligram (mg)", t: "Tonne (t)", lb: "Pound (lb)", oz: "Ounce (oz)", st: "Stone (st)",

  deg: "Degree (deg)", rad: "Radian (rad)", grad: "Gradian (grad)", arcmin: "Arcminute (arcmin)", arcsec: "Arcsecond (arcsec)",

  Pa: "Pascal (Pa)", kPa: "Kilopascal (kPa)", MPa: "Megapascal (MPa)", bar: "Bar (bar)", atm: "Atmosphere (atm)", psi: "Pound per square inch (psi)", torr: "Torr (torr)", mmHg: "Millimeter of mercury (mmHg)",

  "m/s": "Meter per second (m/s)", "km/h": "Kilometer per hour (km/h)", mph: "Mile per hour (mph)", knot: "Knot (kn)", "ft/s": "Foot per second (ft/s)",

  C: "Celsius (°C)", F: "Fahrenheit (°F)", K: "Kelvin (K)",

  s: "Second (s)", ms: "Millisecond (ms)", min: "Minute (min)", h: "Hour (h)", day: "Day (day)", week: "Week (week)", month: "Month (month)", year: "Year (year)",

  L: "Liter (L)", mL: "Milliliter (mL)", gal: "Gallon (gal)", qt: "Quart (qt)", pt: "Pint (pt)", cup: "Cup (cup)", floz: "Fluid ounce (fl oz)", m3: "Cubic meter (m³)",
};

function unitLabel(u) {
  return LABELS[u] ?? u;
}

function convertTemp(val, from, to) {
  let c;
  if (from === "C") c = val;
  else if (from === "F") c = (val - 32) * 5 / 9;
  else c = val - 273.15;
  if (to === "C") return c;
  if (to === "F") return c * 9 / 5 + 32;
  return c + 273.15;
}

// Fuel economy isn't linear (mpg vs L/100km are inversely related), so it needs its own conversion path.
function toKmPerL(val, unit) {
  if (unit === "kml") return val;
  if (unit === "mpg") return val * 0.425144;
  if (unit === "mpgUK") return val * 0.354006;
  if (unit === "L100km") return 100 / val;
}
function fromKmPerL(kml, unit) {
  if (unit === "kml") return kml;
  if (unit === "mpg") return kml / 0.425144;
  if (unit === "mpgUK") return kml / 0.354006;
  if (unit === "L100km") return 100 / kml;
}
function convertFuelEconomy(val, from, to) {
  return fromKmPerL(toKmPerL(val, from), to);
}

function convert(val, category, from, to) {
  if (category === "Temperature") return convertTemp(val, from, to);
  if (category === "Fuel Economy") return convertFuelEconomy(val, from, to);
  const cat = UNITS[category];
  return (val * cat.units[from]) / cat.units[to];
}

export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [value, setValue] = useState("1");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!v) return null;
    return convert(v, category, from, to);
  }, [value, from, to, category]);

  const units = Object.keys(UNITS[category].units);

  return (
    <div className="space-y-4">
      <select
        value={category}
        onChange={(e) => {
          const c = e.target.value;
          setCategory(c);
          const ks = Object.keys(UNITS[c].units);
          setFrom(ks[0]);
          setTo(ks[1]);
        }}
        className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
        aria-label="Unit category"
      >
        {Object.keys(UNITS).map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
        <div><ToolInput type="number" label="From" value={value} onChange={(e) => setValue(e.target.value)} /></div>
        <button onClick={() => { const t = from; setFrom(to); setTo(t); }} className="rounded-lg border border-border px-2 py-1.5 text-slate-500 hover:border-primary/30">⇄</button>
        <div>
          <label className="text-sm font-medium text-muted-foreground">To</label>
          <div className="mt-1 rounded-lg border border-border bg-slate-50 px-3 py-2 font-mono text-sm text-slate-800">{result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "—"}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">
          {units.map((u) => <option key={u} value={u}>{unitLabel(u)}</option>)}
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary">
          {units.map((u) => <option key={u} value={u}>{unitLabel(u)}</option>)}
        </select>
      </div>
    </div>
  );
}
