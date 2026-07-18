import React from 'react'
import {
  Briefcase,
  Calculator,
  Clock,
  Code2, Dices, FileOutput,
  FileText,
  Globe, GraduationCap,
  Image as ImageIcon, LayoutGrid,
  Palette,
  Search, Share2,
  ShieldCheck, TrendingUp,
  Type, Wrench, X
} from 'lucide-react'
import Link from 'next/link'
import { CATEGORIES, TOOLS } from '@/lib/toolsData'
import { AdSlot } from '@/components/shared/AdSlot'
import { usePathname } from 'next/navigation'

const ICONS = {
  Type,
  ShieldCheck,
  Image: ImageIcon,
  FileText,
  Calculator,
  Clock,
  Code2,
  Search,
  Globe,
  Palette,
  Dices,
  Share2,
  FileOutput,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Wrench
}

const navIcon = (iconName) => ICONS[iconName] || Wrench

const Sidebar = ({
  closeSidebar,
  sidebarOpen
}) => {
  const pathname = usePathname()

  const sidebarContent = () => (
    <nav className="flex flex-col gap-1 p-3" onClick={closeSidebar}>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary"
      >
        <LayoutGrid className="h-4 w-4" />
        All Tools
      </Link>
      {CATEGORIES.map((cat) => {
        const Icon = navIcon(cat.icon);
        const count = TOOLS.filter((t) => t.category === cat.name).length;
        const isActive = pathname === `/categories/${encodeURIComponent(cat.slug)}`;
        return (
          <Link
            key={cat.name}
            href={`/categories/${encodeURIComponent(cat.slug)}`}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-primary/10 font-medium text-primary"
                : "hover:bg-accent hover:text-primary"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 shrink-0" />
              {cat.name}
            </span>
            <span className="text-[10px] text-slate-400">{count}</span>
          </Link>
        );
      })}
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-background/50 lg:block scrollbar-thin">
        {sidebarContent()}
        <div className="px-3 pb-4">
          <AdSlot variant="tile" className="min-h-[180px]" />
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeSidebar} />
          <aside className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-background shadow-xl scrollbar-thin">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-bold">Menu</span>
              <button onClick={closeSidebar} className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent()}
          </aside>
        </div>
      )}
    </>
  )
}

export default Sidebar