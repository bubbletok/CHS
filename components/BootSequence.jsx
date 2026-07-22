'use client'

import { useEffect, useState } from 'react'

const LINES = [
  '> initializing engine...',
  '> loading modules: gameplay, ai, rendering, netcode',
  '> linking programmer: 이름',
  '> status: ready.',
]

export default function BootSequence({ name = '이름을 적어주세요', title = 'Game Programmer — Unity & Unreal' }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setVisibleLines(LINES.length)
      setShowHeader(true)
      return
    }
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setVisibleLines(i)
      if (i >= LINES.length) {
        clearInterval(interval)
        setTimeout(() => setShowHeader(true), 300)
      }
    }, 420)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-3xl">
      <div className="font-mono text-sm sm:text-base space-y-1.5 text-muted">
        {LINES.slice(0, visibleLines).map((line, idx) => (
          <p key={idx} className={idx === visibleLines - 1 && !showHeader ? 'caret' : ''}>
            {line}
          </p>
        ))}
      </div>

      <div
        className={`mt-8 transition-all duration-700 ${
          showHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <h1 className="font-mono text-4xl sm:text-6xl font-bold tracking-tight text-ink">
          {name}
        </h1>
        <p className="mt-3 font-body text-lg sm:text-xl text-muted">{title}</p>
      </div>
    </div>
  )
}
