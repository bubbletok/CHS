import Reveal from './Reveal'
import { ACCENT } from '@/lib/accents'

/**
 * 섹션 공통 껍데기.
 * Weekrise처럼 가운데 정렬된 짧은 헤더 + 넉넉한 상하 여백을 쓴다.
 */
export default function Section({
  id,
  eyebrow,
  title,
  accent = 'blue',
  wide = false,
  children,
  className = '',
}) {
  const a = ACCENT[accent]

  return (
    <section
      id={id}
      className={`mx-auto w-full scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 ${
        wide ? 'max-w-wide' : 'max-w-content'
      } ${className}`}
    >
      <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        {eyebrow && <span className={`eyebrow ${a.tint} ${a.text}`}>{eyebrow}</span>}
        <h2 className="mt-4 text-[32px] font-bold leading-[1.15] tracking-tight text-ink sm:text-[44px]">
          {title}
        </h2>
      </Reveal>

      {children}
    </section>
  )
}
