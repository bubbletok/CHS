'use client'

import { useEffect, useState } from 'react'
import { SECTIONS } from '@/lib/scroll'
import { profile } from '@/data/profile'
import ThemeToggle from './ThemeToggle'

/** 상단 고정 헤더 — 스크롤 스파이 + 테마 토글 */
export default function Nav() {
  const [active, setActive] = useState('hero')
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (top) setActive(top.target.id)
      },
      { threshold: [0.15, 0.4], rootMargin: '-15% 0px -45% 0px' }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        setStuck(window.scrollY > 12)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        stuck ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#hero" className="text-[15px] font-bold tracking-tight text-ink">
          Do<span className="text-brand">,</span> Whatever
        </a>

        <nav aria-label="섹션 내비게이션" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((s) => {
              const on = s.id === active
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                      on ? 'bg-subtle text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="btn-primary hidden !px-4 !py-2.5 sm:inline-flex">
            연락하기
          </a>
        </div>
      </div>
    </header>
  )
}
