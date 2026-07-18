'use client'
import { useState } from "react";
import { ToolInput, CopyButton } from "@/components/tools/ToolUI";
import { Download } from "lucide-react";

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const extract = () => {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
    setVideoId(m ? m[1] : "");
  };

  const sizes = [
    { label: "Max Resolution", suffix: "maxresdefault", w: 1280 },
    { label: "High Quality", suffix: "hqdefault", w: 480 },
    { label: "Medium Quality", suffix: "mqdefault", w: 320 },
    { label: "Standard", suffix: "sddefault", w: 640 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex w-full gap-2">
        <div className='flex-1'>
          <ToolInput
            label="YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
        <button onClick={extract} className="mt-6 shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">Get</button>
      </div>
      {videoId && (
        <div className="grid gap-4 sm:grid-cols-2">
          {sizes.map((s) => (
            <div key={s.suffix}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{s.label} ({s.w}px)</span>
                <a href={`https://img.youtube.com/vi/${videoId}/${s.suffix}.jpg`} target="_blank" rel="noopener" download className="text-primary hover:underline"><Download className="inline h-3 w-3" /> Download</a>
              </div>
              <img src={`https://img.youtube.com/vi/${videoId}/${s.suffix}.jpg`} alt={s.label} className="w-full rounded-lg border border-border" onError={(e) => e.target.style.display = "none"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
