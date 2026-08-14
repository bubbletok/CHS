---
id: company-c
engine: unity
status: company
title: Project C
tab: Project C
subtitle: DevOps 및 Infra 구축
meta:
  기간: 9개월
  멤버: 1명
  역할: DevOps / 인프라 구축
  기술 스택: Docker / GitLab / Jenkins CI/CD
stack:
  - Unity
  - C#
  - Docker
  - GitLab
  - Git Flow
  - Jenkins CI/CD
  - Git-SVN 하이브리드
  - 빌드·배포 자동화
links: {}
---

## 요약
형상 관리(VisualSVN)와 CI/CD 인프라가 모두 없어 수작업이 반복되던 상황에서, 형상 관리를 Git·Git Flow로 마이그레이션하고 CI/CD 파이프라인까지 구축한 1인 단독 DevOps 프로젝트다.

## 역할 — DevOps / 인프라 구축
VisualSVN에서 Git으로 형상 관리를 마이그레이션하고 Docker Compose로 GitLab을 직접 호스팅했다. 팀 내에는 Git Flow 브랜치 전략을 도입했다. Jenkins CI/CD로 빌드·배포 파이프라인도 구축했다. 3D 리소스 협업을 위한 Git-SVN 하이브리드 환경도 팀원·디자인팀과 협의해 설계·구성했다.

## 문제점: 형상 관리 마이그레이션
인턴 입사 후 6개월간 형상 관리는 VisualSVN으로 하고 있었는데, 웹 UI가 없고 브랜치를 나눠 작업하기도 까다로웠다.

팀 내에 Git으로 전환을 제안했고 내가 주도적으로 인프라 구축을 진행하기로 했다. Git에 익숙한 사람이 많지는 않았지만, 작업 분화와 개발 효율성을 위해 팀에서 전환을 결정했다.

먼저 Docker Compose로 Gitea Self-Hosted를 구축했고 GUI는 사용하기 편한 GitHub Desktop을 위주로 사용했다. 그런데 Gitea가 제공하는 웹 UI 기능이 기대에 못 미친다고 판단해, GitLab으로 다시 옮겼다.

팀 내에는 Git Flow 브랜치 전략을 도입해 작업 흐름을 표준화했고, 내가 Git 사용법 등을 따로 시간 내어 사람들에게 교육해주었다.

## 문제점: 반복적인 빌드 · 배포 작업
CI/CD 인프라가 따로 없어 빌드·배포 때마다 사람이 손으로 반복하는 작업에 시간이 쓸데없이 들고 있었다.

Docker Compose로 Jenkins를 직접 호스팅해 CI/CD 파이프라인을 구축하고, 빌드·배포·Teams 알림까지 자동화했다.

처음 Jenkins를 다루었기에 Jenkinsfile을 통째로 만들어서 프로젝트마다 복사·붙여넣기하여 사용했다. 그러다 Shared Library라는 기능을 알게 되어 유니티 빌드나 git checkout, 배포 등의 작업들을 모듈화해서 분리하고 Jenkinsfile에는 최소한의 세팅만 남겨두도록 간소화했다.

이러한 자동화 구축을 통해 전체 소요 시간을 **13~15분에서 7~8분**으로 줄였다.

## 문제점: 3D 리소스 협업 개선
처음에는 디자인 리소스도 코드와 같은 Git 레포에서 관리하려 했다. 그런데 프로젝트마다 필요한 리소스가 달라, Git 구조로는 원하는 리소스 일부만 골라 체크아웃하기가 까다로웠다.

SVN은 Update to Revision으로 특정 폴더만 체크아웃할 수 있다는 점에 착안해, 디자인 리소스는 SVN, 코드는 Git으로 분리하는 Git-SVN 하이브리드 구조를 고안했다. 팀원들 및 디자인팀과 협의해 구조를 다듬어 도입했고, 협업 소요 시간을 **90% 단축**했다.

## 향후 계획
CI/CD를 Jenkins에서 GitLab CI/CD로 전환해, 별도 CI 서버 없이 형상 관리와 파이프라인을 GitLab 한 플랫폼에서 운영할 계획이다.

또한 GitLab의 Merge Request 기능을 사용한 코드 리뷰 기반 워크플로우를 도입해 코드의 품질과 방향성을 다잡을 계획이다.
