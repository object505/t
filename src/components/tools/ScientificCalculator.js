'use client'
import { useState } from "react";

const FUNCTION_TOKENS = ["sin", "cos", "tan", "log", "ln"];
const OPERATORS = ["+", "-", "×", "÷", "^"];

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const [isDeg, setIsDeg] = useState(true);
  const [justCalculated, setJustCalculated] = useState(false);

  const lastSegmentHasDot = (str) => {
    const segments = str.split(/[+\-×÷^()]/);
    return segments[segments.length - 1].includes(".");
  };

  const append = (val) => {
    // After a result, digits/functions/parens start a fresh expression;
    // operators continue from the previous result.
    if (justCalculated) {
      setJustCalculated(false);
      if (OPERATORS.includes(val)) {
        setDisplay(display + val);
        return;
      }
      setDisplay(val === "." ? "0." : val);
      return;
    }

    if (val === "." && lastSegmentHasDot(display)) return; // block a 2nd decimal point in the same number

    setDisplay(display === "0" && val !== "." ? val : display + val);
  };

  const appendFunction = (name) => {
    // Auto-insert the opening parenthesis so "sin" + "30" + ")" + "=" actually parses
    const token = name === "√" ? "√(" : `${name}(`;
    if (justCalculated) {
      setJustCalculated(false);
      setDisplay(token);
      return;
    }
    setDisplay(display === "0" ? token : display + token);
  };

  const clear = () => {
    setDisplay("0");
    setExpr("");
    setJustCalculated(false);
  };

  const back = () => {
    if (justCalculated) { clear(); return; }
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const calc = () => {
    try {
      const sinFn = isDeg ? (x) => Math.sin((x * Math.PI) / 180) : Math.sin;
      const cosFn = isDeg ? (x) => Math.cos((x * Math.PI) / 180) : Math.cos;
      const tanFn = isDeg ? (x) => Math.tan((x * Math.PI) / 180) : Math.tan;

      let e = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, "Math.PI")
        .replace(/√/g, "Math.sqrt")
        .replace(/sin/g, "sinFn")
        .replace(/cos/g, "cosFn")
        .replace(/tan/g, "tanFn")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/\^/g, "**")
        .replace(/e\b/g, "Math.E");

      // Auto-close any function/parentheses the user didn't manually close, e.g. "sinFn(30"
      const opens = (e.match(/\(/g) || []).length;
      const closes = (e.match(/\)/g) || []).length;
      if (opens > closes) e += ")".repeat(opens - closes);

      const fn = new Function("sinFn", "cosFn", "tanFn", '"use strict"; return (' + e + ")");
      let result = fn(sinFn, cosFn, tanFn);

      if (typeof result !== "number" || !isFinite(result)) throw new Error("bad result");

      // Trim floating-point noise (e.g. 0.1 + 0.2 -> 0.30000000000000004)
      result = Math.round(result * 1e10) / 1e10;

      setExpr(display + " =");
      setDisplay(String(result));
      setJustCalculated(true);
    } catch {
      setDisplay("Error");
      setJustCalculated(true);
    }
  };

  const buttons = [
    ["sin", "cos", "tan", "π"],
    ["log", "ln", "√", "^"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  const handleClick = (b) => {
    if (b === "=") calc();
    else if (FUNCTION_TOKENS.includes(b) || b === "√") appendFunction(b);
    else append(b);
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-slate-900 p-4 text-right">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsDeg((d) => !d)}
            className="rounded-md border border-slate-700 px-2 py-0.5 text-[10px] font-medium text-slate-300 hover:bg-slate-800"
          >
            {isDeg ? "DEG" : "RAD"}
          </button>
          <div className="text-xs text-slate-400">{expr}</div>
        </div>
        <div className="overflow-hidden font-mono text-3xl font-bold text-white">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-2 rounded-lg border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-600 hover:bg-red-100">Clear</button>
        <button onClick={back} className="rounded-lg border border-border py-3 text-sm text-muted-foreground hover:bg-accent">⌫</button>
        <button onClick={() => append("(")} className="rounded-lg border border-border py-3 text-sm text-muted-foreground hover:bg-accent">(</button>
        {buttons.flat().map((b) => (
          <button
            key={b}
            onClick={() => handleClick(b)}
            className={`rounded-lg border py-3 text-sm font-medium ${
              OPERATORS.includes(b) ? "border-primary/30 bg-primary/5 text-primary" : b === "=" ? "bg-primary text-white" : "border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {b}
          </button>
        ))}
        <button onClick={() => append(")")} className="rounded-lg border border-border py-3 text-sm text-muted-foreground hover:bg-accent">)</button>
      </div>
    </div>
  );
}
