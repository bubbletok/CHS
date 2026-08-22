'use client'

import { useEffect, useState } from 'react'
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion'

const DURATION = 600
// ponytail: 백그라운드 탭은 requestAnimationFrame이 아예 멈추므로, 그 경로에서도 로더가 절대
// 영구히 막히지 않도록 진행률과 무관하게 강제 종료되는 하드 캡을 둔다
const MAX_WAIT = 2000
const CIRCUMFERENCE = 2 * Math.PI * 46

/** trionn.com 참고 — 진행률 카운트업 로더. 세션당 1회만 노출하고 모션 감소 설정이면 건너뛴다.
 * 페이드아웃은 framer-motion이 아니라 순수 CSS transition으로 처리한다 — framer-motion의 스타일
 * 적용도 내부적으로 rAF를 타기 때문에, 탭이 백그라운드로 밀려 rAF가 멈추면 exit 애니메이션 자체가
 * 시작도 못 하고 pointer-events: auto인 채로 화면을 영구히 막아버린다. className 전환은 React
 * 커밋 단계에서 rAF와 무관하게 동기로 반영되므로 이 문제가 없다. */
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
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      sessionStorage.setItem('loader-shown', '1')
      setDone(true)
    }

    const start = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - start) / DURATION)
      setProgress(Math.round(p * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }
    raf = requestAnimationFrame(tick)
    const timeout = setTimeout(finish, MAX_WAIT)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
    }
  }, [reducedMotion])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <div
      aria-hidden={done}
      onClick={() => {
        sessionStorage.setItem('loader-shown', '1')
        setDone(true)
      }}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-8 bg-bg transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
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
    </div>
  )
}
