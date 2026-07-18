'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { loadDictionary, scoreWord, unscramble } from '@/lib/wordEngine'
import { ToolInput } from '@/components/tools/ToolUI'
import { X, ArrowDown, Loader2, Shuffle, Search } from 'lucide-react'

function Tile({ char, i }) {
  return (
    <span
      className="animate-tile-pop inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-[#f4e4c1] text-[#3a2c1a] font-bold text-lg shadow-[0_2px_0_rgba(0,0,0,0.18)] border border-[#e0cfa4] uppercase"
      style={{ animationDelay: `${i * 30}ms` }}
    >
            {char}
        </span>
  );
}

const WordUnscrambler = () => {
  const [letters, setLetters] = useState('');
  const [dict, setDict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [showAdv, setShowAdv] = useState(false);
  const [opts, setOpts] = useState({ startsWith: '', endsWith: '', contains: '', exactLength: 0 });
  const resultsRef = useRef(null);

  useEffect(() => {
    loadDictionary().then((d) => {
      setDict(d);
      setLoading(false);
    });
  }, []);

  const runSearch = () => {
    if (!dict || !letters.trim()) return;
    const res = unscramble(dict, letters, {
      startsWith: opts.startsWith,
      endsWith: opts.endsWith,
      contains: opts.contains,
      exactLength: Number(opts.exactLength) || 0,
      minLength: 2,
    });
    setResults(res);
    setSearched(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const grouped = useMemo(() => {
    const map = new Map();
    for (const w of results) {
      if (!map.has(w.length)) map.set(w.length, []);
      map.get(w.length).push(w);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [results]);

  const clean = letters.replace(/[^a-zA-Z?*]/g, '').split('');

  return (
    <div className="space-y-4">
      <div>
        <p className='text-sm mb-4'>Type your jumbled tiles and find every valid word, sorted by length and Scrabble score.<br/> Use ? for a blank wildcard.</p>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/30" />
          <ToolInput
            label=''
            value={letters}
            onChange={(e) => setLetters(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runSearch()}
            placeholder='e.g. listen?'
            className='pl-12'
          />

          {letters && (
            <button onClick={() => { setLetters(''); setSearched(false); }} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-foreground/40 hover:bg-black/5 hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {clean.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {clean.slice(0, 15).map((c, i) => <Tile key={i} char={c} i={i} />)}
          </div>
        )}

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={runSearch}
            disabled={loading || !letters.trim()}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-[0_4px_0_rgba(0,0,0,0.2)] transition active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.2)] disabled:opacity-50"
          >
            {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Loading dictionary…</> : <><Shuffle className="h-5 w-5" /> Unscramble</>}
          </button>
          <button
            onClick={() => setShowAdv((v) => !v)}
            className="rounded-xl border-2 border-foreground/10 px-5 py-3.5 font-semibold text-foreground/70 transition hover:border-secondary hover:text-secondary"
          >
            Filters
          </button>
        </div>

        {showAdv && (
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 text-left">
            {[
              { k: 'startsWith', l: 'Starts with' },
              { k: 'contains', l: 'Contains' },
              { k: 'endsWith', l: 'Ends with' },
            ].map((f) => (
              <label key={f.k} className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-foreground/40">{f.l}</span>
                <input
                  value={opts[f.k]}
                  onChange={(e) => setOpts((o) => ({ ...o, [f.k]: e.target.value }))}
                  className="rounded-lg bg-slate-100 dark:bg-slate-300/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/40 lowercase"
                />
              </label>
            ))}
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-foreground/40">Length</span>
              <input
                type="number"
                min="0"
                value={opts.exactLength || ''}
                onChange={(e) => setOpts((o) => ({ ...o, exactLength: e.target.value }))}
                className="rounded-lg bg-slate-100 dark:bg-slate-300/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-secondary/40"
              />
            </label>
          </div>
        )}
      </div>
      {!searched && (
        <p className="mt-5 flex items-center justify-center gap-1.5 text-sm text-foreground/40">
          <ArrowDown className="h-4 w-4" /> Results appear right here
        </p>
      )}

      <section ref={resultsRef} className="relative z-10 mx-auto max-w-4xl lg:px-5 py-8 scroll-mt-10">
        {searched && (
          results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-foreground/15 bg-card/60 p-12 text-center">
              <p className="font-display text-2xl font-bold">No words found</p>
              <p className="mt-2 text-foreground/50">Try different letters or add a <span className="font-mono">?</span> wildcard.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-bold">
                  {results.length} word{results.length !== 1 ? 's' : ''} found
                </h2>
                <span className="text-sm text-foreground/50">sorted by length</span>
              </div>
              <div className="space-y-6">
                {grouped.map(([len, words]) => (
                  <div key={len}>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-primary/10 px-2 text-sm font-bold text-primary">{len}</span>
                      <span className="text-sm font-semibold uppercase tracking-wide text-foreground/40">letter words</span>
                      <span className="h-px flex-1 bg-black/5" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {words.map((w) => (
                        <span key={w} className="group inline-flex items-center gap-1.5 rounded-lg border border-black/5 bg-card px-3 py-1.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md">
                            <span className="capitalize">{w}</span>
                            <span className="text-xs font-bold text-muted-foreground">{scoreWord(w)}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </section>
    </div>
  )
}

export default WordUnscrambler