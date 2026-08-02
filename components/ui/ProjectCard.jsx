import Image from 'next/image'
import { ACCENT } from '@/lib/accents'

/**
 * 프로젝트 카드 — trionn.com의 "Selected work" 카드 참고.
 * `as="a"`(href)로 링크 카드, `as="button"`(onClick)으로 모달 트리거 카드 겸용.
 */
export default function ProjectCard({ project, accent, as: Tag = 'a', ctaLabel = 'EXPLORE PROJECT', ...props }) {
  const a = ACCENT[accent]

  return (
    <Tag className="group block w-full text-left" {...props}>
      <div className="card relative aspect-[4/3] overflow-hidden p-0 transition-transform duration-300 group-hover:-translate-y-1">
        {project.poster ? (
          <Image
            src={project.poster}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className={`grid h-full w-full place-items-center ${a.tint} p-8 text-center`}>
            <p className={`text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-tight tracking-tight ${a.text}`}>
              {project.title}
            </p>
          </div>
        )}
        {project.badge && (
          <span className="eyebrow absolute left-4 top-4 bg-bg/80 text-ink backdrop-blur-sm">
            {project.badge}
          </span>
        )}
      </div>

      <p className="mt-4 text-lg font-bold tracking-tight text-ink">{project.title}</p>
      <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-faint transition-colors group-hover:text-red">
        {ctaLabel} →
      </span>
    </Tag>
  )
}
