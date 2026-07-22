# Game Dev Portfolio

Unity/Unreal 게임 프로그래머용 포트폴리오 사이트. "빌드 로그" 컨셉으로, 프로젝트가 엔진 프로파일러의
로그 엔트리처럼 표시됩니다. 헤더에는 계속 움직이는 프레임타임 그래프가 고정되어 있습니다.

## 로컬에서 실행

```bash
npm install
npm run dev
```

`http://localhost:3000` 접속.

## 커스터마이징

1. **프로젝트 내용**: `data/projects.js` 를 열어서 본인 프로젝트로 교체하세요.
   - `engine`: `"unity"` 또는 `"unreal"` (카드 색상이 자동으로 바뀝니다)
   - `status`: `"playable"` (itch.io 등 브라우저 플레이 가능) / `"video"` (영상 데모, 언리얼에 적합) / `"wip"` (진행 중)
   - `links.play`, `links.video`, `links.github`: 없는 링크는 빈 문자열(`''`)로 두면 자동으로 숨겨집니다.

2. **이름/타이틀**: `app/page.js` 안의 `<BootSequence name="..." title="..." />` 수정.

3. **연락처**: `app/page.js` 맨 아래 footer 부분의 이메일/깃허브/이력서 경로 수정.

4. **이력서 PDF**: `public/resume.pdf` 로 파일을 넣으면 footer의 `/resume.pdf` 링크가 바로 동작합니다.

## Vercel에 배포하기

### 방법 A — GitHub 연동 (권장)
1. 이 폴더를 새 GitHub 레포로 push
2. [vercel.com](https://vercel.com) 에서 "Add New Project" → 방금 만든 레포 선택
3. Framework Preset은 Next.js로 자동 인식됨 → Deploy 클릭
4. 이후 `git push` 할 때마다 자동으로 재배포됩니다

### 방법 B — Vercel CLI로 바로 배포
```bash
npm i -g vercel
vercel
```
안내에 따라 진행하면 배포 URL이 바로 나옵니다.

## 구조

```
app/
  layout.js       메타데이터, 폰트 로딩
  page.js         페이지 조립 (헤더 + 히어로 + 빌드 로그 + 푸터)
  globals.css     전역 스타일, 접근성(포커스 표시, reduced-motion) 처리
components/
  FrameGraph.jsx    헤더에 고정되는 프레임타임 그래프 (시그니처 요소)
  BootSequence.jsx  히어로의 콘솔 부팅 타이핑 애니메이션
  ProjectCard.jsx   프로젝트 = "빌드 로그 엔트리" 카드
data/
  projects.js       프로젝트 데이터 (여기만 고쳐도 대부분 커스터마이징 끝)
```
