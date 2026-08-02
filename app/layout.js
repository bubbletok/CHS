import './globals.css'
import CursorSpotlight from '@/components/effects/CursorSpotlight'
import Loader from '@/components/effects/Loader'

export const metadata = {
  title: 'Do, Whatever',
  description:
    'Unity & Unreal 게임 프로그래머 최홍송의 포트폴리오. 성능 최적화, 아키텍처 설계, 인프라 구축.',
  openGraph: {
    siteName: 'Do, Whatever',
    title: 'Do, Whatever — 최홍송 · Game Programmer',
    description: '게임 개발과 관련된 무엇이든 합니다 — Unity & Unreal',
    type: 'website',
  },
}

export const viewport = {
  themeColor: '#0a0b0d',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <CursorSpotlight />
        <div className="grain-overlay" aria-hidden="true" />
        <div className="relative z-[1]">{children}</div>
        <Loader />
      </body>
    </html>
  )
}
