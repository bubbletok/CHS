---
id: company-d
engine: unity
status: company
title: Project D
tab: Project D
subtitle: 유니티 프로젝트 아키텍처 리팩토링
meta:
  기간: 진행 중
  멤버: 1명
  역할: 아키텍처 리팩토링
  기술 스택: Unity / C#
stack:
  - Unity
  - C#
  - SOLID
  - 합성 기반 설계
  - 오브젝트 풀링
links: {}
---

## 요약
Project A, B의 무기 시스템이 상속 기반 구조로 커지며 확장성 문제를 겪던 상황에서, 이를 합성 기반 구조로 재설계하기 위해 진행한 아키텍처 리팩토링 프로젝트다.

## 역할 — 아키텍처 리팩토링
상속 기반 무기 시스템을 합성 기반 구조로 재설계했다. 발사기·발사체·무기의 책임을 분리하고 인터페이스 조합으로 기능을 구성했으며, 오브젝트 풀링으로 런타임 GC 할당도 없앴다.

## 문제점: 상속 기반 무기 시스템의 확장성 저하
Project A, B 모두 상속 기반 구조로 시작했는데, 무기 종류가 늘어날수록 확장성이 급격히 떨어졌다.

발사기 · 발사체 · 무기(Launcher · Projectile · Weapon)의 책임을 나누고, `IImpactable`/`IExpirable`/`IManeuver` 같은 인터페이스로 충돌 · 수명 · 기동 기능을 조합하는 구조로 다시 짰다. 공통 로직이 많은 유도형 발사체만 `HomingProjectileBase` 공통 클래스로 묶어 여러 무기 타입이 재사용하게 하고, 나머지는 인터페이스 조합으로 처리해 상속 의존을 최소화했다.

오브젝트 풀링(`ObjectPoolManager`)으로 발사체가 반복 생성될 때마다 튀던 런타임 GC 할당도 없앴다.

## 향후 계획
Assembly Definition(asmdef)으로 모듈 경계를 나누고 UPM 기반 패키지로 모듈화하는 작업과, 리팩토링 안정성을 확보하기 위한 Unity Test Framework 기반 테스트 자동화를 계획 중이다.
