import { getTool } from '@/lib/toolsData'
import { ImageResponse } from 'next/og'
import Logo from '@/components/shared/Logo'

export const runtime = 'edge'; // fast, works well with ImageResponse
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateImageMetadata({ params }) {
  const { slug } = await params;
  const tool = await getTool(slug)

  if (!tool) return {}

  return [
    {
      id: 'og',
      alt: `${tool.name} - ToolZone`,
      size,
      contentType,
    },
  ];
}

export default async function Image({ params }) {
  const { slug } = await params
  const tool = await getTool(slug)

  if (!tool) return {} // falls back to parent metadata

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
          {tool.name}
        </div>
        <div style={{ margin: '20px auto 0', maxWidth: '60%', fontSize: 20, fontWeight: 400 }}>
          {tool.description}
        </div>
      </div>
    ),
    { ...size }
  );
}