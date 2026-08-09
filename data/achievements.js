export const achievementGroups = [
  {
    key: 'awards',
    label: '수상 이력',
    accent: 'orange',
    items: [
      { period: '2025.10', title: 'ICPC 예선 장려상', detail: 'ICPC Seoul Regional · 경희대 교내 6위' },
      { period: '2024.11', title: 'ICPC 예선 우수상', detail: 'ICPC Seoul Regional · 경희대 교내 3위' },
      {
        period: '2024',
        title: 'SW 페스티벌 창의상',
        detail: 'SW중심대학 연합 SW 페스티벌 · 경기대 · 경희대 · 이화여대 · 한성대 연합 · Dead Line',
      },
      { period: '2024.08', title: '여름 발표회 2등', detail: '여름 프로젝트 발표회 (KOREA IT) · Dead Line' },
      { period: '2024.02', title: '겨울심화 발표회 1등', detail: '겨울심화 프로젝트 발표회 (KOREA IT) · Dead Line' },
    ],
  },
  {
    key: 'activities',
    label: '커뮤니티 운영',
    accent: 'blue',
    items: [
      {
        period: '2025.03 – 2025.12',
        title: 'KHUA 회장',
        detail:
          'KHUA(경희대학교 알고리즘 동아리) — 동아리 체계 구축 및 운영 총괄, 제21회 경희대 교내 봄 프로그래밍 경진대회 기획 · 주최, 5개 교내 동아리 연합 알고리즘 스터디 운영',
      },
      {
        period: '2023.04 – 2025.02',
        title: 'Algorithm Study',
        detail:
          '창립 멤버 — 알고리즘 스터디 그룹 설립 · 운영 (20명+ 규모로 확장), 총학생회 주관 스터디 프로그램 우수 활동상 수상. 이후 경희대학교 공식 알고리즘 동아리 KHUA로 발전',
      },
      { period: '1년 8개월', title: '코딩 강사', detail: 'JamCoding, TedI' },
      { period: '', title: '도서 공동 집필', detail: '2인 공저 · 나는야 엔트리 게임 개발자' },
    ],
  },
  {
    key: 'credentials',
    label: '학술 실적',
    accent: 'green',
    items: [
      {
        period: '2025.07',
        title: 'KCC2025 장려상',
        detail: 'KCC2025 학부생 · 주니어 논문경진대회 장려상 · 2025 UIST Poster 동시 게재',
      },
      // 시점 축에 올릴 만한 활동이 아니라 ETC로 — period를 비워 기존 ETC 분류 로직을 그대로 탄다
      { period: '', title: 'TOPCIT Level 3', detail: '563점' },
    ],
  },
  {
    key: 'exhibitions',
    label: '전시 출품',
    accent: 'red',
    items: [
      { period: '2024.11', title: '2024 G-STAR', detail: 'Dead Line · 한국IT직업전문학교 X 경희대학교 연합' },
      { period: '2023.11', title: '2023 G-STAR', detail: 'Fallen Knight · 한국IT직업전문학교 X 경희대학교 연합' },
    ],
  },
]
