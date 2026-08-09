'use client'

import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '@/lib/usePrefersReducedMotion'

/** 마우스를 따라다니는 은은한 radial-gradient 스포트라이트. CSS 커스텀 프로퍼티를 rAF로 갱신할 뿐인 가벼운 장식 효과 */
export default function CursorSpotlight() {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    let raf = null
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        el.style.setProperty('--spot-x', `${e.clientX}px`)
        el.style.setProperty('--spot-y', `${e.clientY}px`)
        el.style.opacity = '1'
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />
}
