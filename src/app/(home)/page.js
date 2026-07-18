'use client'
import React, { useMemo, useState } from 'react'
import { CATEGORIES, TOOLS } from '@/lib/toolsData'
import { AdSlot } from '@/components/shared/AdSlot'
import ToolGrid from '@/components/shared/ToolGrid'
import Link from 'next/link'
import { Search, Sparkles, Zap, Shield, Cpu } from 'lucide-react'

const Home = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return TOOLS

    const q = query.toLowerCase()

    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-white dark:from-background to-slate-50 dark:to-slate-950">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#282828_1px,transparent_1px),linear-gradient(to_bottom,#282828_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center lg:py-24">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-300 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {TOOLS.length} precision tools · 100% client-side
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            The utility workbench for{" "}
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              everything
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground lg:text-lg">
            Text, security, images, calculators, developer tools and more - fast, private, and free.
            Everything runs in your browser.
          </p>

          {/* Command search */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a tool…"
                className="h-14 w-full rounded-xl border border-border bg-white pl-12 pr-4 text-base text-slate-800 shadow-lg shadow-slate-200/50 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>

          {/* Trust badges */}
          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-500" /> Instant results</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-green-500" /> Private & secure</span>
            <span className="flex items-center gap-1.5"><Cpu className="h-4 w-4 text-primary" /> No sign-up needed</span>
          </div>
        </div>
      </section>

      {/* Categories quick-nav */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1400px] px-4 py-4 lg:px-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/categories/${encodeURIComponent(cat.slug)}`}
                className="rounded-full border border-border bg-slate-50 dark:bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tool grid */}
      <section className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            {query ? `Results for “${query}”` : "All tools"}
            <span className="ml-2 text-sm font-normal text-muted-foreground">({filtered.length})</span>
          </h2>
        </div>

        {filtered.length > 0 ? (
          <ToolGrid tools={filtered} />
        ) : (
          <div className="rounded-xl border border-dashed border-border py-20 text-center">
            <p className="text-sm text-muted-foreground">No tools match your search. Try another term.</p>
          </div>
        )}

        <div className="mt-8">
          <AdSlot variant="banner" />
        </div>
      </section>
    </div>
  )
}

export default Home