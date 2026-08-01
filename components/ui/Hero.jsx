import Reveal from './Reveal'
import { profile } from '@/data/profile'

export default function Hero() {
  return (
    <section id="hero" className="mx-auto w-full max-w-wide scroll-mt-20 px-5 pb-16 pt-6 sm:px-8">
      <Reveal>
        <div className="block-tint bg-tint-blue px-6 py-24 text-center sm:px-16 sm:py-32">
          <span className="eyebrow bg-card/70 text-blue">
            {profile.name} · {profile.role}
          </span>

          <h1 className="mt-7 text-[clamp(3rem,10vw,6.5rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
            Do<span className="text-blue">,</span> Whatever
          </h1>

          <p className="mt-6 text-xl font-medium text-muted sm:text-[26px]">{profile.tagline}</p>

          <p className="mt-3 text-sm font-medium tracking-wide text-faint">{profile.engines}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#projects" className="btn-primary">
              프로젝트 보기
            </a>
            <a href="#contact" className="btn-ghost">
              연락하기
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
