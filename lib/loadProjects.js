import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const DIR = path.join(process.cwd(), 'data/projects')

/** '## 제목' 블록 단위로 쪼개, data/projects/README.md가 정한 4가지 제목만 구조화해 뽑는다.
 * 그 외 제목은 (README 스펙대로) 그냥 무시한다. */
function parseSections(body) {
  const blocks = body
    .split(/\n(?=## )/)
    .map((b) => b.trim())
    .filter(Boolean)

  const sections = { summary: '', role: null, problems: [], awards: [], future: '' }

  for (const block of blocks) {
    const [headingLine, ...rest] = block.split('\n')
    const heading = headingLine.replace(/^##\s*/, '').trim()
    const text = rest.join('\n').trim()

    if (heading === '요약') sections.summary = text
    else if (heading.startsWith('역할'))
      sections.role = { label: heading.replace(/^역할\s*—\s*/, ''), body: text }
    else if (heading.startsWith('문제점:')) {
      // 본문 맨 앞에 연달아 나오는 마크다운 이미지(![](경로))는 전부 스크린샷으로 떼어내고 나머지를 본문으로 쓴다
      const lines = text.split('\n')
      const images = []
      let i = 0
      while (i < lines.length) {
        const m = lines[i].trim().match(/^!\[[^\]]*\]\(([^)]+)\)$/)
        if (!m) break
        images.push(m[1])
        i++
      }
      sections.problems.push({
        title: heading.replace(/^문제점:\s*/, ''),
        body: lines.slice(i).join('\n').trim(),
        images,
      })
    } else if (heading === '수상')
      sections.awards = text
        .split('\n')
        .map((l) => l.replace(/^-\s*/, '').trim())
        .filter(Boolean)
    else if (heading === '향후 계획') sections.future = text
  }

  return sections
}

/** data/projects/*.md를 읽어 프로젝트 목록으로 편다. 파일명 앞 숫자가 노출 순서다. */
export function loadProjects() {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        ...data,
        bucket: data.status === 'company' ? 'company' : 'personal',
        ...parseSections(content),
      }
    })
}
