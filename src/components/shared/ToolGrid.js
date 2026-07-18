import React from 'react'
import { AdSlot } from '@/components/shared/AdSlot'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ToolGrid = ({ tools }) => {
  const tiles = [];
  tools.forEach((tool, i) => {
    tiles.push({ type: "tool", tool, key: tool.slug });
    // Insert ad after the 3rd and 9th visible tools
    if (i === 3 || i === 9) {
      tiles.push({ type: "ad", key: `ad-${i}` });
    }
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {tiles.map((tile) => {
        if (tile.type === "ad") {
          return <AdSlot key={tile.key} variant="tile" className="min-h-[150px]" />;
        }

        const tool = tile.tool

        return (
          <Link
            key={tile.key}
            href={`/${tool.slug}`}
            className="group relative flex flex-col rounded-xl border border-border bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <div className="mb-2 flex items-start justify-between">
              <h3 className="text-sm font-semibold leading-snug group-hover:text-primary">
                {tool.name}
              </h3>
            </div>
            <p className="mb-3 line-clamp-2 flex-1 text-xs leading-relaxed text-foreground">{tool.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{tool.category}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </Link>
        );
      })}
    </div>
  )
}

export default ToolGrid