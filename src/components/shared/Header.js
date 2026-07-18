'use client'
import React from 'react'
import Link from 'next/link'
import {
  Search,
  Menu
} from 'lucide-react'
import { ModeToggle } from '@/components/ModeToggle'
import Image from 'next/image'

const Header = ({
  setSidebarOpen,
  setPaletteOpen
}) => {

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-3 px-4 lg:px-6">
        <button
          className="rounded-lg p-2 hover:bg-accent lg:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/toolzone-logo.svg"
            alt="ToolZone"
            width={140}
            height={42}
            priority
            loading='eager'
            className='dark:hidden'
          />
          <Image
            src="/toolzone-logo-dark.svg"
            alt="ToolZone"
            width={140}
            height={42}
            priority
            loading='eager'
            className='hidden dark:block'
          />
        </Link>

        <button
          onClick={() => setPaletteOpen(true)}
          className="ml-auto flex items-center gap-2 rounded-lg border border-border bg-slate-50 px-3 py-2 text-sm text-slate-400 transition-colors hover:border-primary/30 hover:text-slate-600 sm:w-72 lg:w-96"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search</span>
          <kbd className="hidden rounded border border-border bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-400 sm:block">
            ⌘K
          </kbd>
        </button>

        <ModeToggle />
      </div>
    </header>
  )
}

export default Header