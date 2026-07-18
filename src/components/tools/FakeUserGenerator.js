'use client'
import { useState } from "react";
import { CopyButton } from "@/components/tools/ToolUI";
import { RefreshCw } from "lucide-react";

const FIRST = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"];
const LAST = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "example.com", "mail.com"];
const STREETS = ["Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine Rd"];
const CITIES = [["Springfield", "IL"], ["Portland", "OR"], ["Austin", "TX"], ["Denver", "CO"], ["Seattle", "WA"]];

export default function FakeUserGenerator() {
  const [users, setUsers] = useState([]);

  const generate = () => {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    setUsers(Array.from({ length: 3 }, () => {
      const first = pick(FIRST), last = pick(LAST);
      return {
        name: `${first} ${last}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@${pick(DOMAINS)}`,
        phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${pick(STREETS)}, ${pick(CITIES).join(", ")} ${String(Math.floor(Math.random() * 90000) + 10000)}`,
      };
    }));
  };

  return (
    <div className="space-y-4">
      <button onClick={generate} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"><RefreshCw className="h-4 w-4" /> Generate Users</button>
      {users.map((u, i) => (
        <div key={i} className="rounded-lg border border-border bg-slate-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-slate-800">{u.name}</span>
            <CopyButton value={`${u.name}\n${u.email}\n${u.phone}\n${u.address}`} label="" />
          </div>
          <div className="space-y-0.5 text-sm text-slate-500">
            <div>📧 {u.email}</div>
            <div>📞 {u.phone}</div>
            <div>📍 {u.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
