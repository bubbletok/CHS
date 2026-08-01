import Reveal from './Reveal'
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
      className="mx-auto w-full max-w-wide scroll-mt-20 px-5 pb-14 pt-4 sm:px-8"
    >
      <Reveal>
        <div className="card p-7 sm:p-9">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-bold tracking-tight text-ink">
                Do<span className="text-blue">,</span> Whatever
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
                    className={`group inline-flex items-center gap-2 rounded-full ${a.tint} ${a.text} px-4 py-2.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5`}
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

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-faint">
            <span>
              © {profile.nameEn} · {profile.role}
            </span>
            <span>Built with Next.js</span>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
