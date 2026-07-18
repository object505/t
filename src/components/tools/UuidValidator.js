'use client'
import { useState, useMemo } from "react";
import { ToolInput } from "@/components/tools/ToolUI";

const REGEX = { v1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i, v4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i };

export default function UuidValidator() {
  const [uuid, setUuid] = useState("");
  const result = useMemo(() => {
    if (!uuid.trim()) return null;
    const v = uuid.trim();
    if (REGEX.v4.test(v)) return { valid: true, version: "UUID v4" };
    if (REGEX.v1.test(v)) return { valid: true, version: "UUID v1" };
    return { valid: false, version: null };
  }, [uuid]);

  return (
    <div className="space-y-4">
      <ToolInput label="UUID" value={uuid} onChange={(e) => setUuid(e.target.value)} placeholder="550e8400-e29b-41d4-a716-446655440000" className="font-mono" />
      {result && (
        <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${result.valid ? "border-green-200 bg-green-50 text-green-600" : "border-red-200 bg-red-50 text-red-600"}`}>
          {result.valid ? `✓ Valid ${result.version}` : "✗ Invalid UUID format"}
        </div>
      )}
    </div>
  );
}
