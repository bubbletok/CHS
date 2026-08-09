import { Suspense } from 'react'
import ProjectsSection from '@/components/sections/ProjectsSection'
import { loadProjects } from '@/lib/loadProjects'

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsSection projects={loadProjects()} />
    </Suspense>
  )
}
