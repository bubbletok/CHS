import './globals.css'

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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#101114' },
  ],
}

// 첫 페인트 전에 테마를 확정해 화면이 번쩍이는 것을 막는다.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+KR:wght@400;500;700&family=Playfair+Display:ital,wght@1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
