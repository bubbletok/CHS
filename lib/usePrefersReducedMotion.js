'use client'

import { useEffect, useState } from 'react'

/** OS/브라우저의 모션 감소 설정을 구독한다. Reveal, MapNode, SceneCanvas가 공유한다. */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
