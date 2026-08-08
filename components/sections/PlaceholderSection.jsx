import Reveal from '@/components/ui/Reveal'

/** 피그마에 아직 디테일이 없는 화면(Stacks/Activities/About) — 자리만 잡아둔 샘플 콘텐츠 */
export default function PlaceholderSection({ eyebrow, title }) {
  return (
    <section className="flex h-[calc(100vh-4rem)] w-full flex-col justify-center overflow-hidden px-5 sm:px-8 lg:px-14">
      <Reveal className="flex w-full flex-col gap-6 border-t border-line pt-8">
        <span className="eyebrow self-start">{eyebrow}</span>
        <h2 className="display text-[56px] sm:text-[88px] lg:text-[108px]">{title}</h2>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          샘플 콘텐츠 영역입니다. 피그마에 이 화면의 세부 레이아웃은 아직 정의되어 있지 않습니다.
        </p>
      </Reveal>
    </section>
  )
}
