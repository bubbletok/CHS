import Reveal from './Reveal'
import { ACCENT } from '@/lib/accents'

/**
 * 섹션 공통 껍데기. daoism.systems의 넘버링 섹션(01/06) 패턴을 따라
 * 좌측 정렬 + hairline 상단 보더 + 인덱스 라벨을 기본으로 한다.
 */
export default function Section({
  id,
  index,
  total,
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
      className={`mx-auto w-full scroll-mt-20 border-t border-line px-5 py-20 sm:px-8 sm:py-28 ${
        wide ? 'max-w-wide' : 'max-w-content'
      } ${className}`}
    >
      <Reveal className="mb-12 flex flex-col gap-4 sm:mb-16">
        {index && total && (
          <span className="index-num">
            {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}
        {eyebrow && <span className={`eyebrow ${a.tint} ${a.text} self-start`}>{eyebrow}</span>}
        <h2 className="max-w-2xl text-[36px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[52px]">
          {title}
        </h2>
        <div className="h-px w-full bg-line" />
      </Reveal>

      {children}
    </section>
  )
}
