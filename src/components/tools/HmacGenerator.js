'use client'
import { useState, useEffect } from "react";
import { ToolInput, ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

const ALGOS = ["SHA-1", "SHA-256", "SHA-512"];

export default function HmacGenerator() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [hmac, setHmac] = useState("");

  useEffect(() => {
    if (!text || !key) { setHmac(""); return; }
    (async () => {
      const enc = new TextEncoder();
      const keyData = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: algo }, false, ["sign"]);
      const sig = await crypto.subtle.sign("HMAC", keyData, enc.encode(text));
      const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
      setHmac(hex);
    })();
  }, [text, key, algo]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Message to sign…" ariaLabel="Message input" />
      <ToolInput label="Secret key" value={key} onChange={(e) => setKey(e.target.value)} placeholder="my-secret-key" />
      <div className="flex gap-2">
        {ALGOS.map((a) => (
          <button key={a} onClick={() => setAlgo(a)} className={`rounded-lg border px-3 py-1 text-xs font-medium ${algo === a ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"}`}>{a}</button>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-4">
        <code className="break-all font-mono text-sm text-slate-800">{hmac || "—"}</code>
        {hmac && <CopyButton value={hmac} />}
      </div>
    </div>
  );
}
