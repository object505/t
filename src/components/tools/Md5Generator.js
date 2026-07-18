'use client'
import { useState, useEffect } from "react";
import { ToolTextarea, CopyButton } from "@/components/tools/ToolUI";

// Compact MD5 implementation
function md5(str) {
  function r(n, r) { return (n >>> r) | (n << (32 - r)); }
  function a(n, t) { return (n + t) & 0xFFFFFFFF; }
  function f(n, t, r, e) {
    if (n < 16) return a(t & r, ~t & e);
    if (n < 32) return a(t & e, r & ~e);
    if (n < 48) return a(t ^ r ^ e);
    return a(r ^ (t | ~e));
  }
  const s = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
  const k = [0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391];

  const bytes = new TextEncoder().encode(str);
  const origLen = bytes.length;
  const withPad = [...bytes];
  withPad.push(0x80);
  while ((withPad.length % 64) !== 56) withPad.push(0);
  const bits = BigInt(origLen * 8);
  for (let i = 0; i < 8; i++) withPad.push(Number((bits >> BigInt(i * 8)) & 0xFFn));

  let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476;

  for (let off = 0; off < withPad.length; off += 64) {
    const M = [];
    for (let i = 0; i < 16; i++) M.push(withPad[off + i * 4] | (withPad[off + i * 4 + 1] << 8) | (withPad[off + i * 4 + 2] << 16) | (withPad[off + i * 4 + 3] << 24));
    let A = h0, B = h1, C = h2, D = h3;
    for (let i = 0; i < 64; i++) {
      const g = i < 16 ? i : i < 32 ? (5 * i + 1) % 16 : i < 48 ? (3 * i + 5) % 16 : (7 * i) % 16;
      const F = f(i, B, C, D);
      const tmp = D; D = C; C = B;
      B = a(B, a(r(a(A, a(F, a(k[i], M[g]))), s[i]), A));
      A = tmp;
    }
    h0 = a(h0, A); h1 = a(h1, B); h2 = a(h2, C); h3 = a(h3, D);
  }

  const toHex = (n) => ("00000000" + (n >>> 0).toString(16)).slice(-8);
  return toHex(h0) + toHex(h1) + toHex(h2) + toHex(h3);
}

export default function Md5Generator() {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (!text) { setHash(""); return; }
    setHash(md5(text));
  }, [text]);

  return (
    <div className="space-y-4">
      <ToolTextarea value={text} onChange={setText} placeholder="Enter text to hash…" ariaLabel="Text input" />
      <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 p-4">
        <code className="break-all font-mono text-sm text-slate-800">{hash || "—"}</code>
        {hash && <CopyButton value={hash} />}
      </div>
      <p className="text-xs text-slate-400">MD5 is computed in your browser. Note: MD5 is not secure for cryptographic purposes.</p>
    </div>
  );
}
