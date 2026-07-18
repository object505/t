'use client'
import { useEffect, useRef } from "react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from 'cmdk'
import { TOOLS } from "@/lib/toolsData";
import { Search, X } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function CommandPalette({ open, setOpen }) {
  const router = useRouter()
  const listRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleSelect = (slug) => {
    setOpen(false);
    router.push(`/${slug}`)
  }

  const resetScroll = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: 0 });
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Search tools" className="flex flex-col">
          <div className="flex items-center gap-2.5 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <CommandInput
              autoFocus
              onValueChange={resetScroll}
              placeholder="Search 100+ tools…"
              className="h-14 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button onClick={() => setOpen(false)} className="rounded-md p-1 text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <CommandList ref={listRef} className="max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
            <CommandEmpty className="py-8 text-center text-sm text-slate-400">No tools found.</CommandEmpty>
            {TOOLS.map((tool) => (
              <CommandItem
                key={tool.slug}
                value={`${tool.name} ${tool.category} ${tool.description}`}
                onSelect={() => handleSelect(tool.slug)}
                className="flex cursor-pointer flex-col gap-0.5 rounded-lg px-3 py-2.5 aria-selected:bg-primary/5 aria-selected:text-primary"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-800 group-aria-selected:text-primary">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{tool.category}</span>
                </div>
                <span className="line-clamp-1 text-xs text-slate-400">{tool.description}</span>
              </CommandItem>
            ))}
          </CommandList>
          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-slate-400">
            <span>Navigate with ↑ ↓</span>
            <span>
              <kbd className="rounded border border-border bg-slate-50 px-1.5 py-0.5 font-mono">Esc</kbd> to close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
