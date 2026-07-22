'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES, TOOLS } from '@/lib/toolsData'
import {
  Type,
  ShieldCheck,
  Image as ImageIcon,
  Calculator,
  Clock,
  Code2,
  Search,
  Palette,
  Dices,
  Share2,
  FileOutput,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Wrench,
  ArrowRight,
} from 'lucide-react'

const ICONS = {
  Type,
  ShieldCheck,
  Image: ImageIcon,
  Calculator,
  Clock,
  Code2,
  Search,
  Palette,
  Dices,
  Share2,
  FileOutput,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Wrench,
}

function CategoryCard({ cat, count }) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICONS[cat.icon] || Wrench

  return (
    <Link
      href={`/categories/${encodeURIComponent(cat.slug)}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className='group flex items-center gap-4 rounded-xl border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
      style={{
        borderColor: hovered ? `${cat.color}4D` : 'var(--border)',
      }}
    >
      <div
        className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors'
        style={{
          backgroundColor: hovered ? cat.color : `${cat.color}1A`,
          color: hovered ? '#fff' : cat.color,
        }}
      >
        <Icon className='h-5 w-5' />
      </div>
      <div className='min-w-0 flex-1'>
        <h3
          className='text-sm font-semibold transition-colors'
          style={{ color: hovered ? cat.color : undefined }}
        >
          {cat.name}
        </h3>
        <p className='text-xs text-muted-foreground'>
          {count} tool{count !== 1 ? 's' : ''}
        </p>
      </div>
      <ArrowRight
        className='h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5'
        style={{ color: hovered ? cat.color : 'var(--muted-foreground)' }}
      />
    </Link>
  )
}

export default function Categories() {
  return (
    <div className='mx-auto max-w-[1400px] px-4 py-8 lg:px-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-extrabold tracking-tight'>
          All Categories
        </h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          Browse {TOOLS.length} tools across {CATEGORIES.length} categories — everything runs in your browser.
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {CATEGORIES.map((cat) => {
          const count = TOOLS.filter((t) => t.category === cat.name).length
          return <CategoryCard key={cat.name} cat={cat} count={count} />
        })}
      </div>
    </div>
  )
}
