import BootSequence from '@/components/BootSequence'
import FrameGraph from '@/components/FrameGraph'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export default function Home() {
  return (
    <main>
      {/* 프로파일러 스트립: 페이지 전체에 고정, 시그니처 요소 */}
      <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-line">
        <div className="max-w-5xl mx-auto px-6">
          <FrameGraph />
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <BootSequence name="최홍송" title="Game Programmer — Unity & Unreal" />
      </section>

      <section id="builds" className="max-w-5xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-6 border-b border-line pb-3">
          <h2 className="font-mono text-sm text-muted tracking-widest">BUILD LOG</h2>
          <span className="font-mono text-xs text-muted">{projects.length} entries</span>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-6 pb-16">
        <div className="border-t border-line pt-8 font-mono text-sm text-muted space-y-2">
          <p className="caret">&gt; contact --email ghdthd1230@email.com</p>
          <p>&gt; contact --github github.com/bubbletok123</p>
          <p>&gt; contact --resume /resume_chs.pdf</p>
        </div>
      </footer>
    </main>
  )
}
