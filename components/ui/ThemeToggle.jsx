'use client'

import { useEffect, useState } from 'react'

/**
 * 라이트/다크 토글.
 * 최초 테마는 layout.js의 인라인 스크립트가 페인트 전에 이미 정해 두었으므로,
 * 여기서는 그 값을 읽어와 UI 상태만 맞춘다.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-theme') || 'light')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* 프라이빗 모드 등 저장 실패는 무시하고 이번 세션만 적용한다 */
    }
    setTheme(next)
  }

  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      // 테마 확정 전에는 아이콘이 깜빡이지 않도록 라벨을 비워 둔다
      aria-label={theme ? (dark ? '라이트 모드로 전환' : '다크 모드로 전환') : '테마 전환'}
      title={dark ? 'Light' : 'Dark'}
      className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-card text-muted transition-colors hover:text-ink"
    >
      <span className="sr-only">{dark ? 'Light' : 'Dark'}</span>
      {theme === null ? null : dark ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="12"
              y1="1.8"
              x2="12"
              y2="4.2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              transform={`rotate(${deg} 12 12)`}
            />
          ))}
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.5 14.5A8.6 8.6 0 0 1 9.5 3.5a8.7 8.7 0 1 0 11 11Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  )
}
