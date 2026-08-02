---
id: fallen-knight
engine: unreal
status: video
title: Fallen Knight
tab: Fallen Knight
subtitle: 3인칭 소울라이크 액션 게임
pitch: 소울라이크 | 한국IT직업전문학교 X 경희대학교 | 2023 G-STAR 전시작
badge: 2023 G-STAR
meta:
  기간: 2023.09 ~ 2023.11
  멤버: 7명 (기획 3, 프로그래밍 3)
  역할: 몬스터 AI
  기술 스택: Unreal 5.0 / Blueprint, Git, Azure DevOps
stack:
  - Unreal 5.0
  - Blueprint
  - Behavior Tree / Black Board
  - AI Perception
  - IK Retargeter
  - Animation Notify
  - Azure DevOps
poster: /Projects/FallenKnight/Fallen_Knight_Poster_.png
shots:
  - /Projects/FallenKnight/FallenKnight_Ingame1.jpg
  - /Projects/FallenKnight/FallenKnight_Ingame2.jpg
  - /Projects/FallenKnight/FallenKnight_Ingame3.jpg
  - /Projects/FallenKnight/FallenKnight_Ingame4.jpg
links: {}
---

## 요약
팀원 모두가 언리얼을 처음 다루는 3개월짜리 일정이었다. 전투 프레임워크를 직접 만드는 대신 검증된 Tempest 플러그인을 도입해 AI 행동 로직에 집중했고, Gameplay Tag 기반 State / Ability 구조 위에서 Behavior Tree · Black Board · AI Perception으로 해골 기사 · 해골 궁수의 행동을 구현했다.

## 역할 — 몬스터 AI
Tempest 외부 플러그인 + Behavior Tree(BT) & Black Board(BB) + AI Perception 기반으로 해골 기사, 해골 궁수 몬스터를 구현했다. 패트롤과 타겟 추적 두 상태를 Selector로 분기하고, 각 상태 내부는 Sequence로 순차 처리했다.

## 문제점: 스켈레톤 불일치로 관절이 뒤틀리던 문제
몬스터 메시와 구매한 애니메이션의 스켈레톤 구조가 달라 그대로 적용하면 관절이 뒤틀렸다. IK Rig로 본 체인을 정의하고 IK Retargeter로 소스-타겟 매핑을 구성해 해결했다.

## 문제점: 분리된 애니메이션의 타이밍 동기화
궁수의 몸 / 활 애니메이션이 별도 파일이라 시위를 당기는 타이밍이 어긋났다. Animation Notify로 두 애니메이션의 트리거 시점을 맞춰 해결했다.

## 문제점: 루트 모션 없는 이동의 콜리전 무시
뒷걸음질 모션은 루트 모션이 없어 Set Actor Location으로 직접 이동시켰는데, 콜리전을 무시하고 벽을 통과했다. 매 Tick 이동 목표에 Overlap 감지를 선행하는 조건을 추가해 막았다. 이후 Sweep 옵션이나 AddMovementInput이 더 구조적인 대안이었다는 것을 회고했다.

## 문제점: 외부 플러그인 의존의 한계
플러그인의 상태 구조에 의존하다 보니 예상 밖의 동작을 디버깅하기 어려운 경우가 있었다. 다음 프로젝트에서는 핵심 전투 상태를 직접 설계해 구조를 완전히 파악하는 방향을 택했다.
