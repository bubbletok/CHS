import './globals.css'

export const metadata = {
  title: '이름 — 게임 프로그래머',
  description: 'Unity & Unreal 게임 프로그래머 포트폴리오',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-bg text-ink antialiased">{children}</body>
    </html>
  )
}
