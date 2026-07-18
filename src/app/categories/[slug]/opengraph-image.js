import { ImageResponse } from 'next/og'
import Logo from '@/components/shared/Logo'
import { use } from 'react'
import { CATEGORIES } from '@/lib/toolsData'

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateImageMetadata({ params }) {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const catFind = CATEGORIES.filter((c) => c.slug === decoded)
  const category = catFind.length ? catFind[0] : null

  if (!category) return {}

  return [
    {
      id: 'og',
      alt: `${category.name} - ToolZone`,
      size,
      contentType,
    },
  ];
}

export default async function Image({ params }) {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const catFind = CATEGORIES.filter((c) => c.slug === decoded)
  const category = catFind.length ? catFind[0] : null

  if (!category) return {} // falls back to parent metadata

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#ffffff',
          color: '#000000',
          fontSize: 70,
          fontWeight: 700,
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <Logo />
        <div style={{ margin: '50px auto 0', maxWidth: '70%' }}>
          {`Free ${category.name} tools`}
        </div>
        <div style={{ margin: '20px auto 0', maxWidth: '70%', fontSize: 20, fontWeight: 400 }}>
          {`Browse our collection of free online ${category.name} tools. Fast, simple, and easy-to-use utilities designed to save time and solve everyday problems.`}
        </div>
      </div>
    ),
    { ...size }
  );
}