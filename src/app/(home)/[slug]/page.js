import React from 'react'
import { TOOL_COMPONENTS } from '@/lib/toolRegistry'
import { getTool } from '@/lib/toolsData'
import ToolShell from '@/components/shared/ToolShell'
import ComingSoon from '@/components/shared/ComingSoon'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tool = await getTool(slug)

  if (!tool) return {} // falls back to parent metadata

  return {
    title: `${tool.name} - ToolZone`,
    description: tool.description,
    alternates: {
      canonical: `/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} - ToolZone`,
      description: tool.description,
      type: 'website',
      url: `/${tool.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - ToolZone`,
      description: tool.description,
    },
  };
}

const Page = async ({ params }) => {
  const { slug } = await params
  const tool = await getTool(slug)

  if (!tool) return notFound()

  const ToolComponent = TOOL_COMPONENTS[slug]

  return (
    <ToolShell tool={tool}>
      {ToolComponent ? <ToolComponent/> : <ComingSoon/>}
    </ToolShell>
  )
}

export default Page