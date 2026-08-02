import Reveal from '@/components/ui/Reveal'
import { contacts, profile } from '@/data/profile'
import { ACCENT } from '@/lib/accents'

/**
 * 큰 CTA 블록 대신 얇은 마무리 푸터.
 * 연락처는 사이트에서 사라지면 안 되므로 링크만 남겨 정리했다.
 */
export default function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-wide scroll-mt-20 border-t border-line px-5 pb-14 pt-16 sm:px-8"
    >
      <Reveal>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="index-num mb-4">CONTACT</p>
            <p className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Do<span className="text-red">,</span> Whatever
            </p>
            <p className="mt-1.5 text-sm text-muted">{profile.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {contacts.map((c) => {
              const a = ACCENT[c.accent]
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer noopener"
                  className={`group inline-flex items-center gap-2 rounded-full border border-line ${a.text} px-4 py-2.5 font-mono text-sm font-semibold transition-colors duration-200 hover:border-red`}
                >
                  {c.label}
                  <span
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-faint">
          <span>
            © {profile.nameEn} · {profile.role}
          </span>
          <span className="font-mono text-xs">Built with Next.js</span>
        </div>
      </Reveal>
    </footer>
  )
}
