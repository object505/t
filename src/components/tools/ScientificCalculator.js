'use client'
import { useState } from "react";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");

  const append = (val) => { setDisplay(display === "0" ? val : display + val); };
  const clear = () => { setDisplay("0"); setExpr(""); };
  const back = () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0");

  const calc = () => {
    try {
      let e = display.replace(/×/g, "*").replace(/÷/g, "/").replace(/π/g, "Math.PI").replace(/√/g, "Math.sqrt").replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan").replace(/log/g, "Math.log10").replace(/ln/g, "Math.log").replace(/\^/g, "**").replace(/e\b/g, "Math.E");
      const result = Function('"use strict";return (' + e + ')')();
      setExpr(display + " =");
      setDisplay(String(result));
    } catch { setDisplay("Error"); }
  };

  const buttons = [
    ["sin", "cos", "tan", "π"],
    ["log", "ln", "√", "^"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-slate-900 p-4 text-right">
        <div className="text-xs text-slate-400">{expr}</div>
        <div className="font-mono text-3xl font-bold text-white overflow-hidden">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-2 rounded-lg border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-600 hover:bg-red-100">Clear</button>
        <button onClick={back} className="rounded-lg border border-border py-3 text-sm text-muted-foreground hover:bg-accent">⌫</button>
        <button onClick={() => append("(")} className="rounded-lg border border-border py-3 text-sm text-muted-foreground hover:bg-accent">(</button>
        {buttons.flat().map((b) => (
          <button key={b} onClick={() => b === "=" ? calc() : append(b)} className={`rounded-lg border py-3 text-sm font-medium ${["÷", "×", "-", "+"].includes(b) ? "border-primary/30 bg-primary/5 text-primary" : b === "=" ? "bg-primary text-white" : "border-border text-muted-foreground hover:bg-accent"}`}>{b}</button>
        ))}
        <button onClick={() => append(")")} className="rounded-lg border border-border py-3 text-sm text-muted-foreground hover:bg-accent">)</button>
      </div>
    </div>
  );
}
