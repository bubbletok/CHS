import Nav from '@/components/ui/Nav'
import Hero from '@/components/ui/Hero'
import Work from '@/components/ui/Work'
import Skills from '@/components/ui/Skills'
import Projects from '@/components/ui/Projects'
import Achievements from '@/components/ui/Achievements'
import Footer from '@/components/ui/Footer'

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        <Hero />
        <Work />
        {/* 섹션이 이어질 때 리듬이 생기도록 배경을 한 번 눌러 준다 */}
        <div className="bg-subtle">
          <Skills />
        </div>
        <Projects />
        <div className="bg-subtle">
          <Achievements />
        </div>
      </main>

      <Footer />
    </>
  )
}
