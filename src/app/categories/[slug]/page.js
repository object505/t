import React, { use } from 'react'
import { CATEGORIES, toolsByCategory } from '@/lib/toolsData'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ToolGrid from '@/components/shared/ToolGrid'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const catFind = CATEGORIES.filter((c) => c.slug === decoded)
  const category = catFind.length ? catFind[0] : null

  if (!category) return {} // falls back to parent metadata

  return {
    title: `Free ${category.name} tools - ToolZone`,
    description: `Browse our collection of free online ${category.name} tools. Fast, simple, and easy-to-use utilities designed to save time and solve everyday problems.`,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `Free ${category.name} tools - ToolZone`,
      description: `Browse our collection of free online ${category.name} tools. Fast, simple, and easy-to-use utilities designed to save time and solve everyday problems.`,
      type: 'website',
      url: `/categories/${category.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Free ${category.name} tools - ToolZone`,
      description: `Browse our collection of free online ${category.name} tools. Fast, simple, and easy-to-use utilities designed to save time and solve everyday problems.`,
    },
  };
}

const Page = ({ params }) => {
  const { slug } = use(params)
  const decoded = decodeURIComponent(slug)
  const catFind = CATEGORIES.filter((c) => c.slug === decoded)
  const category = catFind.length ? catFind[0] : null
  const tools = toolsByCategory(category?.name);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3"/>
        <span className="font-medium text-foreground">{category?.name}</span>
      </nav>
      <h1 className="mb-1 text-2xl font-bold tracking-tight">{category?.name}</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        {tools.length} tool{tools.length !== 1 ? "s" : ""} in this category
      </p>
      {tools.length > 0 ? (
        <ToolGrid tools={tools}/>
      ) : (
        <p className="text-sm text-muted-foreground">No tools found in this category.</p>
      )}
    </div>
  )
}

export default Page