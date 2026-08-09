---
id: dead-line
engine: unreal
status: video
title: Dead Line
tab: Dead Line
subtitle: 1인칭 스텔스 좀비 액션 게임
pitch: 스텔스 좀비 액션 | 한국IT직업전문학교 X 경희대학교 | 2024 G-STAR 출품작
badge: 2024 G-STAR
meta:
  기간: 2024.01 ~ 2024.11
  멤버: 11명 (기획 4, 프로그래밍 6, 아트 1)
  역할: 플레이어 클라이언트
  기술 스택: Unreal 5.3 / C++, Git, Git LFS, Azure DevOps
stack:
  - Unreal 5.3
  - C++
  - Enhanced Input
  - Sphere Cast
  - Motion Warping
  - Aim Offset
  - Git LFS
  - Azure DevOps
poster: /Projects/DeadLine/DeadLine_Poster.png
links:
  video: https://youtu.be/4zzC391a3jE?si=HbP9bM97PVpMf6qg
  video2: https://www.youtube.com/watch?v=opwSqmBIpBo&feature=youtu.be
---

## 요약
11명 규모의 연합 팀에서 진행한 1인칭 스텔스 좀비 액션 게임. UE5 Enhanced Input 기반 이동, 2단계 Sphere Cast로 벽 형태를 판별하는 파쿠르, 본(bone) 판정과 Motion Warping을 결합한 암살 시스템으로 플레이어 클라이언트를 구현했다. 겨울심화 프로젝트 발표회 1등, 여름 프로젝트 발표회 2등, SW중심대학 연합 SW 페스티벌 창의상을 수상하며 완성도를 대외적으로 검증받았다.

## 역할 — 플레이어 클라이언트
UE5 Enhanced Input 기반으로 이동/액션 입력을 구조화하고, 앉기·일어서기 시 FOV를 조정하고 Aim Offset으로 카메라 방향에 따라 상체가 자연스럽게 회전하도록 구현해 시야 변화의 긴장감을 살렸다.

파쿠르는 전방 Sphere Cast로 벽 유무를 먼저 감지하고, 감지된 벽에 수직 Sphere Cast를 한 번 더 쏘아 높이·너비를 계산해 낮은 벽은 넘기, 높은 벽은 올라가기로 동작을 자동 분기했다.

암살은 목 본(bone) 위치 기준 히트 판정과 플레이어-좀비 forward 벡터 각도 조건을 함께 만족할 때만 발동하도록 설계하고, Motion Warping으로 거리·각도가 달라도 애니메이션이 자연스럽게 맞춰지도록 처리했다.

## 문제점: 1인칭 시점 모델 + 카메라 제어

## 문제점: 암살 카메라 워킹

## 문제점: 애니메이션 블렌딩

## 문제점: 앉기/일어서기 동작의 부자연스러움
언리얼 기본 Crouch/Uncrouch만 사용했더니 앉고 서는 동작이 갑작스럽게 전환돼 부자연스러웠다.

## 문제점: 파쿠르 벽 넘기/올라가기 처리
낮은 벽은 넘고 높은 벽은 오르도록 동작을 분기하려면 벽의 형태를 먼저 파악해야 했다. Sphere Cast를 여러 번 쏘아 벽 높이·너비를 계산해 분기 기준을 마련했다.

다만 한정된 파쿠르 애니메이션만으로는 벽을 끝까지 넘지 못하는 경우가 있어, Motion Warping으로 애니메이션과 이동을 함께 보정해 해결했다.

## 문제점: 암살 판정 로직의 방향 오판정
암살 조건으로 플레이어와 좀비의 전방 벡터 간 각도만 비교했는데, 이는 두 캐릭터가 같은 방향을 보고 있는지만 판단할 뿐 플레이어가 좀비 뒤에 있는지는 전혀 반영하지 못해 옆이나 정면에서도 암살이 발동하는 버그가 있었다.

좀비→플레이어 방향 벡터와 좀비의 전방 벡터 사이 각도로 비교 기준을 바꿔 위치 관계를 반영했고, 라디안으로 반환되던 각도를 도(°) 단위로 변환해 기준값(45도)의 의미도 명확히 했다.

## 수상
- 2024.02 · 겨울심화 프로젝트 발표회 1등 (KOREA IT)
- 2024.08 · 여름 프로젝트 발표회 2등 (KOREA IT)
- 2024 · SW중심대학 연합 SW 페스티벌 창의상
