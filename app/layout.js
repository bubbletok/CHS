import { Space_Grotesk, IBM_Plex_Mono, Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import CursorSpotlight from '@/components/effects/CursorSpotlight'
import Loader from '@/components/effects/Loader'
import Nav from '@/components/ui/Nav'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://chs-xi-brown.vercel.app'),
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
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${notoSansKR.variable}`}
    >
      <body className="font-sans antialiased">
        <CursorSpotlight />
        <div className="grain-overlay" aria-hidden="true" />
        <div className="relative z-[1]">
          <Nav />
          {children}
        </div>
        <Loader />
      </body>
    </html>
  )
}
