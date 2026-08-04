import Reveal from '@/components/ui/Reveal'

/** 피그마에 아직 디테일이 없는 화면(Stacks/Activities/About) — 자리만 잡아둔 샘플 콘텐츠 */
export default function PlaceholderSection({ eyebrow, title }) {
  return (
    <section className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden p-4 sm:p-6">
      <Reveal className="card flex w-full flex-1 flex-col gap-4 p-8 sm:p-12">
        <span className="eyebrow self-start">{eyebrow}</span>
        <h2 className="text-[36px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[52px]">{title}</h2>
        <div className="h-px w-full bg-line" />
        <p className="text-sm leading-relaxed text-muted">
          샘플 콘텐츠 영역입니다. 피그마에 이 화면의 세부 레이아웃은 아직 정의되어 있지 않습니다.
        </p>
      </Reveal>
    </section>
  )
}
