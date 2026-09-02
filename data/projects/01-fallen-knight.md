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
  멤버: 6명 (기획 3, 프로그래밍 3)
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
links:
  video: https://youtu.be/mjPgl4YIr8M
---

## 요약
팀원 모두가 언리얼을 처음 다루는 3개월짜리 일정이었다. 전투 프레임워크를 직접 만드는 대신 검증된 Tempest 플러그인을 도입해 AI 행동 로직에 집중했고, Gameplay Tag 기반 State / Ability 구조 위에서 Behavior Tree · Black Board · AI Perception으로 해골 기사 · 해골 궁수의 행동을 구현했다.

## 역할 — 몬스터 AI
Tempest 외부 플러그인 + Behavior Tree(BT) & Black Board(BB) + AI Perception 기반으로 해골 기사, 해골 궁수 몬스터를 구현했다. 패트롤과 타겟 추적 두 상태를 `Selector`로 분기하고, 각 상태 내부는 `Sequence`로 순차 처리했다.

## 문제점: 스켈레톤 불일치로 관절이 뒤틀리던 문제
![](/Projects/FallenKnight/FallenKnight_Problem1.png)
몬스터 메시에 구매한 애니메이션을 그대로 적용하려 했는데, 관절이 뒤틀렸다. 확인해보니 메시와 애니메이션의 스켈레톤(본 계층) 구조 자체가 서로 달라서 생기는 문제였다.

`IK Rig`로 본 체인을 정의하고 `IK Retargeter`로 소스-타겟 매핑을 구성해 구조 차이를 흡수했고, 관절 뒤틀림 없이 애니메이션을 적용할 수 있었다.

## 문제점: 분리된 애니메이션의 타이밍 동기화
![](/Projects/FallenKnight/FallenKnight_Problem2.png)
해골 궁수의 몸 애니메이션과 활 애니메이션이 별도 파일로 나뉘어 있었는데, 재생해보니 시위를 당기는 타이밍이 서로 어긋나 있었다. 두 애니메이션이 독립적으로 재생되며 트리거 시점이 맞지 않는 게 원인이었다.

`Animation Notify`로 두 애니메이션의 트리거 시점을 맞춰 동기화했다.

## 문제점: 루트 모션 없는 이동의 콜리전 무시
![](/Projects/FallenKnight/FallenKnight_Problem3_1.png)
![](/Projects/FallenKnight/FallenKnight_Problem3_2.png)
뒷걸음질 모션에는 루트 모션이 없어 `Set Actor Location`으로 몬스터를 직접 이동시켰는데, 벽을 그대로 통과해버렸다. `Set Actor Location`이 콜리전 체크 없이 위치를 강제로 옮기는 함수라 생기는 문제였다.

매 `Tick` 이동 목표 지점에 `Overlap` 감지를 먼저 걸어, 벽이 있으면 이동을 막는 조건을 추가해 해결했다. 다만 이 방식은 임시방편에 가까웠고, `Sweep` 옵션이나 `AddMovementInput`을 썼으면 더 구조적으로 풀 수 있었다는 걸 이후에 깨달았다.

## 문제점: 외부 플러그인 의존의 한계
Tempest 플러그인의 상태 구조 위에서 AI 로직을 짜다 보니, 의도치 않은 동작이 나올 때 플러그인 내부까지 파고들어야 원인을 알 수 있는 경우가 있었다. 직접 만들지 않은 구조에 의존한 게 디버깅을 어렵게 만든 원인이었다.

이 프로젝트에서는 일정상 플러그인을 그대로 쓰는 쪽을 택했지만, 다음 프로젝트부터는 핵심 전투 상태를 직접 설계해 구조를 완전히 파악할 수 있는 방향으로 바꿨다.
