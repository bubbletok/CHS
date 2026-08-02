'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion'

const DURATION = 1400
const CIRCUMFERENCE = 2 * Math.PI * 46

/** trionn.com 참고 — 진행률 카운트업 로더. 세션당 1회만 노출하고 모션 감소 설정이면 건너뛴다. */
export default function Loader() {
  const reducedMotion = usePrefersReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reducedMotion || sessionStorage.getItem('loader-shown')) {
      setDone(true)
      return
    }

    let raf
    const start = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - start) / DURATION)
      setProgress(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        sessionStorage.setItem('loader-shown', '1')
        setTimeout(() => setDone(true), 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
        >
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-faint">
            Do<span className="text-red">,</span> Whatever
          </p>

          <div className="relative grid h-24 w-24 place-items-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgb(var(--c-line))" strokeWidth="2" />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgb(var(--c-red))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100}
              />
            </svg>
            <span className="font-mono text-lg font-semibold text-ink">{progress}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
