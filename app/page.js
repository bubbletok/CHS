import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Achievements from '@/components/sections/Achievements'
import Footer from '@/components/sections/Footer'
import { getProjects, engineTabs } from '@/lib/loadProjects'

export default function Home() {
  // data/projects/*.md 읽기는 fs가 필요해 서버 컴포넌트인 여기서만 하고, 결과를 props로 내려준다
  const projects = getProjects()

  return (
    <>
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Projects projects={projects} engineTabs={engineTabs} />
        <Skills />
        <Achievements />
      </main>

      <Footer />
    </>
  )
}
