'use client'
import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/toolsData'
import { AdSlot } from '@/components/shared/AdSlot'

const ToolShell = ({ tool, children }) => {
  const catFind = CATEGORIES.filter((c) => c.name === tool.category)
  const category = catFind.length ? catFind[0] : null

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 lg:px-6">
    {/* Breadcrumb */}
  <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
    <Link href="/" className="hover:text-primary">Home</Link>
    <ChevronRight className="h-3 w-3" />
    <Link href={`/categories/${encodeURIComponent(category?.slug)}`} className="hover:text-primary">
      {tool.category}
    </Link>
    <ChevronRight className="h-3 w-3" />
    <span className="font-medium text-foreground">{tool.name}</span>
  </nav>

  {/* Title */}
  <div className="mb-6">
    <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">{tool.name}</h1>
    <p className="mt-1.5 text-sm text-muted-foreground lg:text-base">{tool.description}</p>
  </div>

  {/* Tool + sidebar ad */}
  <div className="flex gap-6">
    <div className="min-w-0 flex-1">
      <div className="rounded-xl border border-border bg-background p-5 shadow-sm lg:p-6">{children}</div>

      {/* Horizontal ad between tool and docs */}
      <div className="my-6">
        <AdSlot variant="banner" />
      </div>

      {/* SEO content */}
      <section className="prose prose-sm max-w-none prose-headings:text-slate-700 prose-p:text-slate-500 prose-li:text-slate-500">
        <h2 className="text-base font-semibold">About the {tool.name}</h2>
        <p className='text-muted-foreground'>{tool.description}</p>
        <p className='text-muted-foreground mb-3'>
          This tool runs entirely in your browser — your data never leaves your device. It's fast, private,
          and free to use as often as you need. No sign-up, no upload, no tracking of your content.
        </p>
        <h3 className="text-sm font-semibold">How to use</h3>
        <ul className='text-muted-foreground mb-3'>
          <li>Enter or paste your input in the field above.</li>
          <li>The result updates automatically as you type.</li>
          <li>Use the copy button to copy the output to your clipboard.</li>
        </ul>
        <p className='text-muted-foreground'>
          Explore more tools in the{" "}
          <Link href={`/categories/${encodeURIComponent(category?.slug)}`} className="text-primary hover:underline">
            {tool.category}
          </Link>{" "}
          category.
        </p>
      </section>
    </div>

    {/* Sidebar ad — desktop only */}
    <aside className="hidden w-[300px] shrink-0 xl:block">
      <div className="sticky top-20">
        <AdSlot variant="sidebar" />
      </div>
    </aside>
  </div>
</div>
  )
}

export default ToolShell