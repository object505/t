'use client'
import { useState } from "react";
import { ToolInput } from '@/components/tools/ToolUI'

function formatComplex(re, im) {
  const r = Math.round(re * 1000) / 1000;
  const i = Math.round(Math.abs(im) * 1000) / 1000;
  return `${r} ${im < 0 ? "-" : "+"} ${i}i`;
}

export default function QuadraticSolver() {
  const [a, setA] = useState("1");
  const [b, setB] = useState("-3");
  const [c, setC] = useState("2");

  const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c);
  const validInputs = [A, B, C].every((n) => !isNaN(n));

  let result = null;
  if (validInputs) {
    if (A === 0) {
      if (B === 0) {
        result = C === 0 ? { type: "infinite" } : { type: "none" };
      } else {
        result = { type: "linear", x: -C / B };
      }
    } else {
      const discriminant = B * B - 4 * A * C;
      if (discriminant > 0) {
        const sqrtD = Math.sqrt(discriminant);
        result = {
          type: "two-real",
          x1: Math.round(((-B + sqrtD) / (2 * A)) * 1e8) / 1e8,
          x2: Math.round(((-B - sqrtD) / (2 * A)) * 1e8) / 1e8,
          discriminant,
        };
      } else if (discriminant === 0) {
        result = { type: "one-real", x: Math.round((-B / (2 * A)) * 1e8) / 1e8, discriminant };
      } else {
        const re = -B / (2 * A);
        const im = Math.sqrt(-discriminant) / (2 * A);
        result = { type: "complex", re, im, discriminant };
      }
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">ax² + bx + c = 0</p>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <ToolInput
            type='number'
            value={a}
            onChange={(e) => setA(e.target.value)}
            label='a'
          />
        </div>

        <div className="space-y-1">
          <ToolInput
            type='number'
            value={b}
            onChange={(e) => setB(e.target.value)}
            label='b'
          />
        </div>

        <div className="space-y-1">
          <ToolInput
            type='number'
            value={c}
            onChange={(e) => setC(e.target.value)}
            label='c'
          />
        </div>
      </div>

      {!validInputs ? (
        <div className="rounded-lg border border-border bg-slate-50 p-4 text-center text-sm text-slate-400">Enter valid numbers for a, b, and c</div>
      ) : (
        <div className="rounded-xl border border-border bg-slate-50 p-4 text-center">
          {result.type === "infinite" && <div className="text-slate-700">Infinitely many solutions (0 = 0)</div>}
          {result.type === "none" && <div className="text-rose-600">No solution (equation is a false statement)</div>}
          {result.type === "linear" && (
            <>
              <div className="text-xs text-slate-400">a = 0, so this is linear: bx + c = 0</div>
              <div className="mt-1 font-mono text-xl font-bold text-primary">x = {result.x}</div>
            </>
          )}
          {result.type === "two-real" && (
            <>
              <div className="text-xs text-slate-400">Discriminant = {result.discriminant} (two real roots)</div>
              <div className="mt-1 space-y-0.5 font-mono text-xl font-bold text-primary">
                <div>x₁ = {result.x1}</div>
                <div>x₂ = {result.x2}</div>
              </div>
            </>
          )}
          {result.type === "one-real" && (
            <>
              <div className="text-xs text-slate-400">Discriminant = 0 (repeated root)</div>
              <div className="mt-1 font-mono text-xl font-bold text-primary">x = {result.x}</div>
            </>
          )}
          {result.type === "complex" && (
            <>
              <div className="text-xs text-slate-400">Discriminant = {result.discriminant} (complex roots)</div>
              <div className="mt-1 space-y-0.5 font-mono text-xl font-bold text-primary">
                <div>x₁ = {formatComplex(result.re, result.im)}</div>
                <div>x₂ = {formatComplex(result.re, -result.im)}</div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
