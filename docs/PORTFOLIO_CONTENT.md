# 포트폴리오 콘텐츠 백업

> 3D & Immersive UI로 전면 리디자인하기 전, 기존 사이트에 담겨 있던 **내용만** 추출해 정리한 문서입니다.
> 디자인/마크업은 제외하고 순수 텍스트 데이터만 보존합니다.
>
> - 백업 시점: 2026-07-27
> - 원본 커밋: `0b30911` (포트폴리오 내용 채우기 (WIP))
> - 원본 위치: `data/projects.js`, `data/experience.js`, `data/achievements.js`,
>   `components/Differentiators.jsx`, `components/EngineSkills.jsx`, `app/page.js`, `app/layout.js`
> - Notion 원본 덤프: `portpolio_wip.md` (이미지 참조 및 상세 서술 포함, 별도 유지)

---

## 1. 프로필 / 사이트 메타

| 항목 | 값 |
| --- | --- |
| 이름 | 최홍송 / Hongsong Choi |
| 타이틀 | Game Programmer — Unity & Unreal |
| 사이트 제목 | Do, Whatever |
| 사이트 설명 | Unity & Unreal 게임 프로그래머 포트폴리오 |
| 캐치프레이즈 | 게임 개발과 관련된 무엇이든 합니다 |

### About me

게임 개발과 관련된 모든 것들에 관심을 기울입니다.

클라이언트 / 서버 개발, CI/CD 자동화, 에러 및 이슈 관리, 협업 툴 등 무엇이든지 시도합니다.

당장의 기능 구현보다 재사용 가능한 구조 설계를 더 중요시합니다.

### Contact

| 채널 | 값 | 비고 |
| --- | --- | --- |
| E-Mail | `ghdthd1230@gmail.com` | 기존 `app/page.js`에 `ghdthd1230@email.com`으로 오타 존재 — 재구성 시 수정 필요 |
| E-Mail (Notion 표기) | `bbunsun874@gmail.com` | Notion 원본에 기재된 주소. 어느 쪽을 노출할지 확인 필요 |
| GitHub | https://github.com/bubbletok123 | |
| Blog | Tistory (URL 미기재) | 원본에 링크 없음 — 확인 필요 |
| Resume | `/resume_chs.pdf` | 실제 파일 미존재 — 추가 필요 |

---

## 2. 강점 (Differentiators)

원본: `components/Differentiators.jsx`

### PERF — 성능 최적화 · `8~10MB → 수십 KB`

LiDAR 포인트클라우드를 메시지로 변환하며 발생하던 GC Alloc을 `ToArray()` 대신
`NativeArray.Reinterpret` + `CopyTo`로 줄여 GC 스파이크로 인한 프레임 드랍을 제거했다.
다중 카메라 렌더링 병목은 DX12의 카메라별 RenderGraph · 리소스 배리어 비용까지
벤치마크로 규명해 DX11 전환을 결정했다.

### ARCH — 구조 설계 · `상속 → 합성`

SOLID 원칙을 기반으로 리팩토링해 각 클래스가 단일 책임만 갖도록 정리했다.
`IImpactable` · `IExplosive` · `IExpirable` · `IManeuver` 인터페이스로
충돌 · 폭발 · 수명 · 기동 책임을 분리하고 오브젝트 풀로 관리해,
기능 개발과 UI 개발이 충돌 없이 병렬로 진행되도록 했다.

### DEVOPS — DevOps 단독 구축 · `80% / 90%`

Docker 기반 Gitea 로컬 호스팅, Git Flow 브랜치 전략, Jenkins CI/CD 파이프라인,
Git-SVN 하이브리드 협업 구조를 1인으로 설계 · 구축했다.
빌드 · 배포 반복 작업 약 80%, 개발-디자인 협업 소요 시간 약 90%를 절감했다.

---

## 3. 경력 (Experience)

원본: `data/experience.js`

> 방산 시뮬레이터 도메인의 세부 사양은 게임 클라이언트 개발에 직접 대응되는 표현
> (투사체, 다중 카메라, 전투 로직 등)으로 일반화해 서술했습니다.

### exp-01 · FunctionBay Inc. — 인턴 · Unity 클라이언트

- **기간**: 2024.07 – 2024.08
- **요약**: Netcode for GameObjects 기반 실시간 시뮬레이터의 클라이언트 · UI 개발
- **스택**: Unity, Netcode for GameObjects, Doxygen

- 동적 드롭다운 메뉴 등 커스텀 UI 컴포넌트 설계 및 구현
- 소프트웨어 설계서(SDD) 작성
- Doxygen XML 출력을 Draw.io 다이어그램으로 변환하는 문서화 자동화 툴 개발

### exp-02 · MetaMotionX Inc. — 계약직 · 클라이언트 프로그래머

- **기간**: 2024.09 – 2025.09
- **요약**: 실시간 멀티 에이전트 시뮬레이터의 경로 계획 · UI 아키텍처 · 센서 시뮬레이션 개발
- **스택**: Unity, Unreal 5, C++, DOTween

- Reeds-Shepp Curve 기반 A* 알고리즘으로 차량 경로 계획 구현
- MVP/MVVM 패턴과 이벤트 기반 상태 관리로 UI 아키텍처 설계, DOTween으로 트랜지션 구현
- Unreal 5 AsyncTask 기반 비동기 LiDAR 시뮬레이션 및 포인트클라우드 처리 구현

### exp-03 · MetaMotionX Inc. — 정규직 · 클라이언트 프로그래머

- **기간**: 2025.10 – 현재
- **요약**: 센서 시뮬레이션 · 전투 로직 · 성능 최적화를 담당하며 아키텍처 리팩토링을 주도
- **스택**: Unity, Unreal 5, C++, Job System

- Render Texture 기반 스트리밍으로 센서 시뮬레이션 구현
- 발사기 · 발사체 · 무장의 책임을 분리하고 인터페이스 기반으로 전투/투사체 로직을 리팩토링, 오브젝트 풀링 적용
- 다중 카메라 렌더링 최적화 — LayerMask/LOD/컴포넌트 캐싱 적용, 그래픽 API 레벨 벤치마크로 DX11 전환 결정
- Unity Profiler 기반 병목 분석 및 GC 할당 최적화 (LiDAR 포인트클라우드 GC Alloc 8~10MB → 수십 KB)
- IJob / IJobParallelFor와 SpherecastCommand 배치 처리로 물리 계산의 메인 스레드 부하 분산
- 멀티플레이 시간 동기화 디버깅, 리플레이 · 에디터 제작 도구 개발

### exp-04 · MetaMotionX Inc. — 사내 개발 인프라 구축 (DevOps, 1인 단독)

- **기간**: 2025.09 – 2026.06
- **요약**: 형상 관리부터 CI/CD까지 개발 인프라를 단독으로 설계 · 구축
- **성과**: 빌드 · 배포 반복 작업 약 80%, 개발-디자인 협업 소요 시간 약 90% 절감
- **스택**: Jenkins, Docker, Gitea, Git-SVN

- Docker Compose 기반 Gitea 로컬 호스팅 구축, 단일 브랜치 → Git Flow 기반 10개+ 브랜치 구조로 전환
- Jenkins CI/CD 파이프라인 구축 — 커밋 → 빌드 → 배포 전 과정 자동화
- Git-SVN 하이브리드 구조로 3D 디자이너팀과의 리소스 협업 체계 구축
- Unity Test Framework 기반 시나리오 테스트 자동화, Unity Accelerator 캐시 서버 구축

---

## 4. 프로젝트 (Projects)

원본: `data/projects.js`
스키마 — `engine`: `unity` | `unreal` / `status`: `playable` | `video` | `wip`

### build-001 · Fallen Knight — Unreal · VIDEO

- **역할**: 몬스터 AI 프로그래밍 (BT · BB · AI Perception)
- **기간**: 2023.09 ~ 2023.11
- **멤버**: 6명 (기획 3, 프로그래밍 3)
- **스택**: Unreal 5, Blueprint, Behavior Tree / Black Board, AI Perception, IK Retargeter, Animation Notify
- **이미지**:
  - `/Projects/FallenKnight/Fallen_Knight_Poster_.png`
  - `/Projects/FallenKnight/FallenKnight_Ingame1.jpg`
  - `/Projects/FallenKnight/FallenKnight_Ingame2.jpg`
  - `/Projects/FallenKnight/FallenKnight_Ingame3.jpg`
  - `/Projects/FallenKnight/FallenKnight_Ingame4.jpg`
- **링크**: video — *미기재*

**요약**

한국IT직업전문학교 X 경희대학교 연합 3인칭 소울라이크 액션 게임, 2023 G-STAR 전시작.
검증된 전투 프레임워크(Tempest 플러그인) 위에서 Behavior Tree · Black Board · AI Perception
기반으로 해골 기사·궁수 몬스터의 State/Ability 구조를 설계·구현했다.

**문제 해결 / 회고**

- 몬스터 메시와 구매 애니메이션의 스켈레톤 구조가 달라 그대로 적용하면 관절이 뒤틀리는 문제를,
  IK Rig로 본 체인을 정의하고 IK Retargeter로 소스-타겟 매핑을 구성해 해결했다.
- 궁수의 몸/활 애니메이션이 별도 파일이라 시위를 당기는 타이밍이 어긋나던 문제는
  Animation Notify로 두 애니메이션의 트리거 시점을 맞춰 해결했다.
- 뒷걸음질 모션은 루트 모션이 없어 `Set Actor Location`으로 직접 이동시켰는데 콜리전을 무시하고
  벽을 통과하는 문제가 생겨, 매 Tick마다 이동 목표에 Overlap 감지를 선행하는 조건을 추가했다.
  (이후 Sweep 옵션이나 `AddMovementInput`이 더 구조적인 대안이었다는 걸 회고했다.)
- 외부 플러그인의 상태 구조에 의존하다 보니 예상 밖의 동작을 디버깅하기 어려운 경우도 있었고,
  다음 프로젝트에서는 핵심 전투 상태를 직접 설계해 구조를 완전히 파악하는 방향을 취하고 싶다는 결론을 얻었다.

> Tempest 플러그인 구조, Behavior Tree 노드 구성 등 상세 서술은 `portpolio_wip.md` 참조.

### build-002 · Dead Line — Unreal · VIDEO

- **역할**: 클라이언트 / 플레이어
- **스택**: Unreal 5, C++, Animation
- **링크**: video — *미기재*

**요약**

한국IT직업전문학교 X 경희대학교 연합 프로젝트로 2024 G-STAR에 출품했다.
겨울심화 프로젝트 발표회 1등, 여름 프로젝트 발표회 2등, SW중심대학 연합 SW 페스티벌 창의상을
수상하며 완성도를 대외적으로 검증받았다.

**보완 필요** — 플레이어 시스템의 구체적인 기술 문제·해결 과정 미작성.

### build-003 · 한글 워들 — Unity · PLAYABLE

- **역할**: 1인 개발 (6개월, 지속 개발 중)
- **스택**: Unity, C#, Android, Unity Test Framework
- **링크**: play — https://play.google.com/store/apps/details?id=com.CHS.Korean_Wordle

**요약**

해외 인기 게임 Wordle의 한국어 버전. 영어와 구조적으로 다른 한글의 자모 분리 특성에 맞춘
입력·판정 시스템을 처음부터 설계했다. Google Play 출시, 누적 다운로드 100+.

**문제 해결**

5,800개 이상의 단어를 품사 기준으로 필터링해 런타임에서 즉시 조회 가능한 구조로 전처리하는
파이프라인을 구축해 조회 비용을 최소화했다. Unity Test Framework로 한글 입력·판정 로직의
테스트 케이스를 자동화해 결함을 줄였고, Assembly Definition으로 코드를 모듈화해 컴파일 시간을
단축했다. 메인 화면 → 스테이지 선택 → 게임플레이로 이어지는 씬 흐름과 폴더 구조를
전체적으로 정리했다.

### build-004 · Project ZT — Unreal · WIP

- **역할**: 기획 / 프로그래밍
- **스택**: Unreal 5, C++, GAS
- **링크**: 없음

**보완 필요** — 요약·문제 해결 모두 템플릿 문구 그대로. 실제 내용 작성 필요.

### build-05 · Smoothed Particle Hydrodynamics in Unity — Unity · VIDEO

- **역할**: 1인 개발
- **요약**: SPH 유체 시뮬레이션
- **스택**: Unity, ComputeShader
- **링크**: 없음

**보완 필요** — 문제 해결 항목이 템플릿 문구 그대로.

### build-06 · 3D GPU A* — Unity · VIDEO

- **역할**: 1인 개발
- **요약**: A* in 3D Environment with GPU Computation
- **스택**: Unity, ComputeShader
- **링크**: 없음

**보완 필요** — 문제 해결 항목이 템플릿 문구 그대로.

---

## 5. 기술 스택 (Engine Capability)

원본: `components/EngineSkills.jsx`

### UNREAL 5

- Blueprint + C++
- AI — Behavior Tree · Black Board · AI Perception
- 플레이어 시스템 설계
- 애니메이션 — Motion Warping · Animation Notify · IK Retargeter
- 네트워킹 — Replication · RPC · OnRep
- Gameplay Ability System (GAS)
- UMG

### UNITY

- 게임플레이 / UI 프로그래밍
- Netcode for GameObjects 멀티플레이
- Job System / Compute Shader
- Addressables
- 에디터 툴 커스터마이징
- Unity Test Framework

### Familiar

- DevOps & Version Control — Git Flow, Gitea/GitLab, Jenkins CI/CD, Sentry
- Python — Object Detection, Deep Reinforcement Learning, 3D Reconstruction
- AI — DQN, LLM 멀티 에이전트 (LangChain / FastAPI)

---

## 6. 성과 (Achievements)

원본: `data/achievements.js`

### Activities

| 기간 | 내용 |
| --- | --- |
| 2023.04 – 2025.02 | **Algorithm Study — 창립 멤버** · 알고리즘 스터디 그룹 설립 · 운영 (20명+ 규모로 확장), 총학생회 주관 스터디 프로그램 우수 활동상 수상. 이후 경희대학교 공식 알고리즘 동아리 KHUA로 발전 |
| 2025.03 – 2025.12 | **KHUA (경희대학교 알고리즘 동아리) — 회장** · 동아리 체계 구축 및 운영 총괄, 제21회 경희대 교내 봄 프로그래밍 경진대회 기획 · 주최, 5개 교내 동아리 연합 알고리즘 스터디 운영 |
| 1년 8개월 | **코딩 강사 (JamCoding, TedI)** |
| — | **도서 공동 집필 (2인)** |

### Awards

| 기간 | 내용 | 관련 |
| --- | --- | --- |
| 2024.02 | 겨울심화 프로젝트 발표회 1등 (KOREA IT) | Dead Line |
| 2024.08 | 여름 프로젝트 발표회 2등 (KOREA IT) | Dead Line |
| 2024.11 | ICPC Seoul Regional 예선 우수상 · 경희대 교내 3위 | |
| 2024 | SW중심대학 연합 SW 페스티벌 창의상 | 경기대 · 경희대 · 이화여대 · 한성대 연합 · Dead Line |
| 2025.10 | ICPC Seoul Regional 예선 장려상 · 경희대 교내 6위 | |

### Cert & Papers

| 기간 | 내용 | 비고 |
| --- | --- | --- |
| 2025.05 | TOPCIT 563점 (Level 3) | |
| 2025.07 | KCC2025 학부생 · 주니어 논문경진대회 장려상 | 2025 UIST Poster 동시 게재 |

### Exhibitions

| 기간 | 내용 | 관련 |
| --- | --- | --- |
| 2023.11 | 2023 G-STAR | Fallen Knight |
| 2024.11 | 2024 G-STAR | Dead Line |

---

## 7. 재구성 시 확인 필요 항목

- [ ] 이메일 주소 확정 (`ghdthd1230@gmail.com` vs `bbunsun874@gmail.com`)
- [ ] Blog(Tistory) URL
- [ ] 이력서 PDF (`/resume_chs.pdf`) 실제 파일
- [ ] Fallen Knight · Dead Line 영상 링크
- [ ] Project ZT / SPH / 3D GPU A* — 실제 내용 작성 (현재 템플릿 문구)
- [ ] Dead Line 플레이어 시스템 기술 상세
- [ ] 프로필 사진 (Notion 원본의 `KakaoTalk_20240912_004820797_02.jpg` — 저장소에 없음)
