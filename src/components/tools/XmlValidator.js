'use client'
import { useState, useMemo } from "react";
import { ToolTextarea } from "@/components/tools/ToolUI";

export default function XmlValidator() {
  const [input, setInput] = useState("");
  const result = useMemo(() => {
    if (!input.trim()) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/xml");
    const error = doc.querySelector("parsererror");
    if (error) return { valid: false, message: error.textContent.split("\n")[0] };
    return { valid: true, message: "Valid XML ✓" };
  }, [input]);

  return (
    <div className="space-y-3">
      <ToolTextarea value={input} onChange={setInput} placeholder="<root><item>value</item></root>" ariaLabel="XML input" rows={6} />
      {result && (
        <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${result.valid ? "border-green-200 bg-green-50 text-green-600" : "border-red-200 bg-red-50 text-red-600"}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}
