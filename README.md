# Do, Whatever — Game Dev Portfolio

Unity/Unreal 게임 프로그래머 최홍송의 포트폴리오.
Weekrise의 디자인 언어(파스텔 블록 히어로, 큰 라운드 카드, 넓고 부드러운 그림자,
다중 액센트, 하단 대비 CTA 블록)를 기준으로 만들었고, 라이트/다크 두 테마를 모두 지원합니다.

## 스택

- Next.js 14 (App Router) · React 18
- Tailwind CSS 3
- 런타임 의존성은 `next` / `react` / `react-dom` 뿐입니다 (3D·애니메이션 라이브러리 없음)

## 로컬에서 실행

```bash
npm install
```

```bash
npm run dev
```

`http://localhost:3000` 접속.

> ⚠️ dev 서버가 떠 있는 상태에서 `next build`를 돌리면 같은 `.next` 디렉터리를 덮어써
> dev 서버의 CSS 청크가 404가 됩니다. 빌드 전에 dev를 먼저 내리세요.

## 테마

색은 전부 CSS 변수로 정의되어 있습니다.

- `app/globals.css` — `:root`(라이트)와 `[data-theme="dark"]`에 같은 변수 세트를 정의
- `tailwind.config.js` — `rgb(var(--c-ink) / <alpha-value>)` 형태로 변수를 참조
- `app/layout.js` — 첫 페인트 전에 실행되는 인라인 스크립트가 `localStorage` → OS 설정 순으로 테마를 확정 (화면 번쩍임 방지)
- `components/ui/ThemeToggle.jsx` — 토글 버튼. 선택은 `localStorage`에 저장

색을 바꾸려면 `globals.css`의 변수만 고치면 됩니다.

| 토큰 | 용도 |
| --- | --- |
| `--c-bg` / `--c-subtle` / `--c-card` | 배경 3단계 |
| `--c-ink` / `--c-muted` / `--c-faint` | 텍스트 3단계 |
| `--c-brand` `--c-coral` `--c-violet` `--c-green` `--c-amber` | 액센트 |
| `--t-*` | 파스텔 틴트 블록 (히어로·칩 배경) |
| `--c-contrast` / `--c-contrast-ink` | 하단 CTA 블록. 테마에 따라 뒤집혀 항상 대비를 만듦 |

## 내용 수정하기

디자인을 건드리지 않고 `data/` 안의 파일만 고치면 됩니다.

| 파일 | 내용 |
| --- | --- |
| `data/profile.js` | 사이트 이름·슬로건, 이름, 소개, 연락처 |
| `data/work.js` | What I have done — 성능 최적화 · 아키텍처 설계 · 인프라 구축 |
| `data/skills.js` | 엔진별 기술 스택 |
| `data/projects.js` | 프로젝트 (엔진 탭 + 프로젝트 탭 + 상세) |
| `data/achievements.js` | 수상 · 활동 · 자격 · 전시 |
| `data/experience.js` | 실무 경력 — Activities 화면의 "실무 경력" 트랙 |

`accent` 필드에는 `blue` `coral` `violet` `green` `amber` 중 하나를 씁니다
(`lib/accents.js`에 클래스 매핑이 있습니다).

### 섹션 구성

`Hero → What I have done → Skills → Projects → 쌓아온 기록 → Contact(CTA + 푸터)`

경력(Experience)은 Activities 화면 상단 "실무 경력" 트랙에 둡니다.

### 프로젝트 스키마

**엔진(1차 탭) → 프로젝트(2차 탭)** 로 선택하고, 선택된 프로젝트가
`미디어 | 상세` 2단으로 펼쳐집니다. 이미지는 전부 왼쪽 컬럼에 모입니다.

- `engine`: `'unreal'` | `'unity'` — 1차 탭 분류이자 액센트 색
- `tab`: 2차 탭에 표시할 짧은 이름 (없으면 `title` 사용)
- `status`: `'playable'` | `'video'` | `'wip'`
- `pitch`: 제목 아래 파스텔 박스에 들어가는 한 줄 소개
- `meta`: `[{ k, v }]` — 기간 / 멤버 / 역할 / 기술 스택
- `role`: `{ title, body }`
- `problem`: `[{ title, body }]` — "생겼던 문제점들" 아코디언 (첫 항목만 열림)
- `awards`: 문자열 배열
- `poster`: 왼쪽 대표 이미지. 없으면 플레이스홀더
- `shots`: 포스터 아래 2열로 깔리는 인게임 스크린샷
- `video`: 임베드 URL. 있으면 포스터 자리에 플레이어가 먼저 옵니다
- `links`: `{ play, github, video }` 중 있는 것만

포스터와 스크린샷은 클릭하면 전체화면 라이트박스로 열립니다 (ESC로 닫기).
탭은 좌우 방향키로도 이동합니다.

## 구조

```
app/
  layout.js              메타데이터, 폰트, 테마 초기화 스크립트
  page.js                섹션 조립
  globals.css            테마 변수, 카드/버튼/칩 컴포넌트, reduced-motion
components/ui/
  Nav.jsx                고정 헤더 + 스크롤 스파이 + 테마 토글
  ThemeToggle.jsx        라이트/다크 전환
  Section.jsx            섹션 공통 헤더(eyebrow + 제목 + 리드)
  Reveal.jsx             IntersectionObserver 등장 애니메이션
  Hero.jsx               파스텔 블록 히어로 + 소개 카드
  Work.jsx               지표 카드 3종
  Skills.jsx             엔진별 스택
  Projects.jsx           2단 탭 (상태 관리)
  ProjectDetail.jsx      미디어 | 상세 2단 패널 + 라이트박스
  Achievements.jsx       쌓아온 기록
  Contact.jsx            대비 CTA 블록 + 푸터
lib/
  scroll.js              섹션 정의
  accents.js             액센트 클래스 매핑
docs/
  PORTFOLIO_CONTENT.md   콘텐츠 백업 (디자인 교체 시 참조)
```

## 접근성

- 라이트/다크 모두 본문 대비 5.5:1 이상 (WCAG AA 통과)
- 탭은 `role="tablist"/"tab"/"tabpanel"` + 좌우 방향키 지원
- `prefers-reduced-motion: reduce`에서 등장 애니메이션과 전환이 꺼집니다

## Vercel에 배포하기

### 방법 A — GitHub 연동 (권장)
1. 이 폴더를 새 GitHub 레포로 push
2. [vercel.com](https://vercel.com) 에서 "Add New Project" → 방금 만든 레포 선택
3. Framework Preset은 Next.js로 자동 인식됨 → Deploy 클릭

### 방법 B — Vercel CLI로 바로 배포

```bash
npx vercel
```
