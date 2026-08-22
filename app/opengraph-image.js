import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0a0b0d',
          color: '#f5f5f4',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: '0.2em', color: '#8a8f98', textTransform: 'uppercase' }}>
          Do, Whatever
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 24 }}>Hongsong Choi</div>
        <div style={{ fontSize: 32, color: '#c4c8ce', marginTop: 24 }}>
          Unity &amp; Unreal · Game Programmer
        </div>
      </div>
    ),
    { ...size }
  )
}
