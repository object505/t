'use client'
import { useState } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

function b64UrlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach((b) => bin += String.fromCharCode(b));
  return btoa(bin).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export default function JwtGenerator() {
  const [header, setHeader] = useState('{"alg":"HS256","typ":"JWT"}');
  const [payload, setPayload] = useState('{"sub":"1234567890","name":"John Doe","iat":1516239022}');
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [token, setToken] = useState("");

  const generate = async () => {
    try {
      const h = b64UrlEncode(header);
      const p = b64UrlEncode(payload);
      const data = `${h}.${p}`;
      const enc = new TextEncoder();
      const keyData = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      const sig = await crypto.subtle.sign("HMAC", keyData, enc.encode(data));
      const sigHex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
      const sigB64 = sigHex.match(/.{1,2}/g).map((h) => String.fromCharCode(parseInt(h, 16))).join("");
      setToken(`${data}.${btoa(sigB64).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")}`);
    } catch (e) {
      setToken("Error: " + e.message);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Header (JSON)</label>
        <textarea value={header} onChange={(e) => setHeader(e.target.value)} rows={2} className="w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Payload (JSON)</label>
        <textarea value={payload} onChange={(e) => setPayload(e.target.value)} rows={4} className="w-full rounded-lg border border-border px-3 py-2 font-mono text-sm outline-none focus:border-primary" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Secret key</label>
        <input value={secret} onChange={(e) => setSecret(e.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
      </div>
      <button onClick={generate} className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary/90">Generate JWT</button>
      {token && (
        <div className="flex items-start justify-between gap-2 rounded-lg border border-border bg-slate-50 p-4">
          <code className="break-all font-mono text-xs text-slate-800">{token}</code>
          <CopyButton value={token} />
        </div>
      )}
    </div>
  );
}
