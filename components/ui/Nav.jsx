'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SECTIONS } from '@/lib/scroll'
import { ACCENT } from '@/lib/accents'

/** 상단 고정 헤더 — 스크롤스파이 기반 넘버링 내비게이션 + 모바일 풀스크린 메뉴 */
export default function Nav() {
  const [active, setActive] = useState('hero')
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        stuck || open ? 'border-b border-line bg-bg/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#hero"
          onClick={() => setOpen(false)}
          className="font-mono text-[15px] font-bold tracking-tight text-ink"
        >
          Do<span className="text-brand">,</span> Whatever
        </a>

        <nav aria-label="섹션 내비게이션" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((s, i) => {
              const on = s.id === active
              const a = ACCENT[s.accent]
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                      on ? a.text : 'text-faint hover:text-muted'
                    }`}
                  >
                    <span className="text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary hidden !px-4 !py-2.5 text-xs sm:inline-flex">
            연락하기
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg px-5 py-10 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {SECTIONS.map((s, i) => {
                const a = ACCENT[s.accent]
                return (
                  <li key={s.id} className="border-b border-line">
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-4 text-3xl font-bold tracking-tight text-ink"
                    >
                      <span className={`font-mono text-sm ${a.text}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">
              연락하기
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
