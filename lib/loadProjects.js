import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'data', 'projects')

/**
 * 본문을 "## 헤딩" 기준으로 잘라 { heading, text } 목록으로 만든다.
 * 헤딩 이름은 이 파일의 규칙(요약 / 역할 — … / 문제점: … / 수상)을 그대로 따른다.
 */
function parseSections(body) {
  return body
    .split(/\n(?=##\s+)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const match = chunk.match(/^##\s+(.+?)\n([\s\S]*)$/)
      return match ? { heading: match[1].trim(), text: match[2].trim() } : null
    })
    .filter(Boolean)
}

/** data/projects/*.md를 읽어 기존 data/projects.js와 같은 모양의 배열로 만든다 — fs를 쓰므로 서버 컴포넌트에서만 호출한다 */
export function getProjects() {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
    .sort()

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8')
    const { data, content } = matter(raw)

    const project = { ...data }
    if (data.meta) {
      project.meta = Object.entries(data.meta).map(([k, v]) => ({ k, v }))
    }

    const problem = []
    for (const { heading, text } of parseSections(content)) {
      if (heading === '요약') {
        project.summary = text
      } else if (heading.startsWith('역할')) {
        project.role = { title: heading, body: text }
      } else if (heading.startsWith('문제점')) {
        problem.push({ title: heading.replace(/^문제점:\s*/, ''), body: text })
      } else if (heading === '수상') {
        project.awards = text
          .split('\n')
          .map((line) => line.replace(/^-\s*/, '').trim())
          .filter(Boolean)
      }
    }
    if (problem.length) project.problem = problem

    return project
  })
}

/** 1차 분류 탭 */
export const engineTabs = [
  { key: 'unreal', label: 'UNREAL', accent: 'red' },
  { key: 'unity', label: 'UNITY', accent: 'blue' },
]
