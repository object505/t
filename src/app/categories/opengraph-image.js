import { ImageResponse } from 'next/og'
import Logo from '@/components/shared/Logo'
import { CATEGORIES, TOOLS } from '@/lib/toolsData'

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateImageMetadata() {
  return [
    {
      id: 'og',
      alt: `Categories - ToolZone`,
      size,
      contentType,
    },
  ];
}

export default async function Image() {
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
          Free Online Tools
        </div>
        <div style={{ margin: '20px auto 0', maxWidth: '70%', fontSize: 20, fontWeight: 400 }}>
          {`Browse ${TOOLS.length} tools across ${CATEGORIES.length} categories — everything runs in your browser.`}
        </div>
      </div>
    ),
    { ...size }
  );
}