> 게임 개발과 관련된 무엇이든 합니다
> 

!KakaoTalk_20240912_004820797_02.jpg

최홍송/Hongsong Choi

<aside>
💻

# About me

게임 개발과 관련된 모든 것들에 관심을 기울입니다.

클라이언트 / 서버 개발, CI/CD 자동화, 에러 및 이슈 관리, 협업 툴 등 무엇이든지 시도합니다.

당장의 기능 구현보다 재사용 가능한 구조 설계를 더 중요시합니다.

</aside>

<aside>

## Contact

:github-mark-white: **Github**

:tistroy-logo: **Blog**

**✉️ E-Mail:** bbunsun874@gmail.com

</aside>

⭐ Unreal Projects

### Fallen Knight

<aside>

!image.png

# Fallen Knight

<aside>
☠️

**3인칭 소울라이크 액션 게임!**

(게임 소개 글)

소울라이크 | 한국IT직업전문학교 X 경희대학교 | 2023 G-Star 전시작

</aside>

**기간**: 2023.09 ~ 2023.11
**기술 스택**: Unreal 5.0 / Blueprint, Git, Azure Devops
**멤버**: 6명 (기획 3, 프로그래밍 3) 

### 역할 - 몬스터 AI

> Tempest 외부 플러그인 +
Behavior Tree (BT) & Black Board (BB) + AI Perpcetion 기반 구현
해골 기사, 해골 궁수 몬스터를 구현
> 

#### Tempest Plugin 설명

<aside>

팀원 모두가 언리얼을 처음 사용해보고, 3개월이라는 제한된 일정 안에서 전투 시스템 기반을 직접 구현하는 것은 무리가 있었다.
따라서 검증된 전투 프레임워크를 도입해 AI 행동 로직 구현에 집중하는 것이 적합하다고 판단했다.
Tempest는 Gameplay Tag 기반 State/Ability 구조를 제공해 상태 전환 로직을 선언적으로 관리할 수 있었고, BT와의 연동도 자연스러워 채택했다.

**State
현재 상태를 나타내는 클래스**
BP_BaseState를 상속해 구현한다

상태는 **Gameplay Tag로 구분**하며,
Try Perform State of Class / Can Perform State로 상태를 전환할 수 있다.
상태가 전환되면 **Start State 이벤트에서 Ability를 수행**하는 방식으로 구현한다.

!image.png

!image.png

**Ability
세부 행동을 정의하는 클래스**
BP_BaseAbility를 상속해 구현한다

Perform Ability Of Class 함수로 Ability를 수행할 수 있다.

!image.png

</aside>

#### 몬스터 행동 로직

- Behavior Tree & Black Board

!image.png

!image.png

<aside>

### Tempest 플러그인의 태그 기반 State 처리 활용

**1) 패트롤 / 2) 타겟 추적** 2개의 상태를 **Selector 노드**를 사용해서 분기

1) 패트롤 - **Sequence 노드**를 사용해 아래 작업을 순차적으로 진행

1. BB_{Enemy}의 Destination 위치 좌표를 가져와서 이동.
2. Behavior Tree Task로 다음 목적지 부여 기능을 구현. BB_{Enemy}의 Destination에  지정
3. 1초 대기 후 다시 진행

2) 타겟 추적 - **Sequence 노드**를 사용해 아래 작업을 순차적으로 진행

1. BB_{Enemey}의 Combat Target 위치 좌표를 가져와서 이동
2. 0.7 +- 0.3 대기

* 한 번 타겟이 된 경우 계속 추적하도록 기획됨

### State 변화 구조

Idle → Patrol → (AI Perception) 타겟 인식 → Equip → Follow Target → Following
→ (공격 거리 이내) Attack → Wait To Attack → Attack or Follow Target
→ (공격 거리 밖) 다시 Following → (추적 거리 밖) Return To Post 복귀

AnyDamage Event → Hit State
HP ≤ 0 → Death State

</aside>

#### 몬스터 State

!image.png

!image.png

| State | 설명 | 실행 조건 | 다음 상태 |
| --- | --- | --- | --- |
| OnSpawn | 스폰 시 최초 1회 활성화 | 항상 가능 | Following |
| Idle | 기본 대기 상태 | 항상 가능 | Patrolling / Following / Attack |
| Patrolling | 패트롤 상태 | 항상 가능 | - |
| Equip | 무기 장착 상태.
처음 1회만 실행 | 무기 미장착 시 | Following |
| Following | 타겟 추적 상태 | 무기 장착 시 | Attack (공격 거리 이내) / ReturnToPost (추적 거리 밖) |
| Attacking | 공격 실행 상태 | Equip 완료 && 공격 대기 중이 아닐 때
+ 공격 타겟 있을 것 | WaitToAttack / Following |
| WaitToAttack | 공격 대기 상태.
정지 or 가드 뒷걸음질 | 공격 타겟 있을 것 | Attacking / Following |
| Hit | 피겨 상태.
AnyDamage 이벤트 시 활성화 | 항상 가능 | WaitToAttack / Equip / Attack / Following |
| ReturnToPost | 원 위치 복귀 | 타겟 추적 거리 밖인 경우 | Idle |
| Death | 사망 상태. 콜리전 충돌 무시 처리 | HP ≤ 0 | - |

#### 몬스터 Ability

!image.png

!image.png

| Ability | 설명 | 실행 조건 | 완료 후 |
| --- | --- | --- | --- |
| EquipAbility | 무기 장착 애니메이션 재생 | Equip State 진입 | Equip State 종료 |
| CloseRangeAttackAbility | 근접 공격 (해골 기사) | Attacking State 진입 | WaitToAttack / Following |
| RangeAttackAbility | 원거리 공격 (해골 궁수) | Attacking State 진입 | WaitToAttack / Following |
| HitAbility | 피격 리액션 애니메이션 재생 | Hit State 진입 | Hit State 종료 |
| WaitToAttackAbility | 정지 or 가드 뒷걸음질 중 랜덤 실행 | WaitToAttack State 진입 | WaitToAttack State 종료 |
| ReturnToPostAbility | 원위치 복귀 이동 | ReturnToPost State 진입 | Idle |
| NormalDeathAbility | 사망 처리. 콜리전 무시 | Death State 진입 (일반) | - |

### 생겼던 문제점들

- 기사/궁수 애니메이션 스켈레톤 ≠ 해골 기사/궁수 스켈레톤
    
    <aside>
    
    구매한 전투 애니메이션의 스켈레톤 본 구조가 해골 기사/궁수 캐릭터 메시와 달라, 애니메이션을 그대로 적용하면 관절이 뒤틀리거나 사지가 비정상적으로 회전하는 문제가 발생했다.
    
    → UE5의 **IK Rig**으로 각 스켈레톤의 본 체인을 정의하고, **IK Retargeter**로 소스-타겟 본 간 매핑 테이블을 구성해 애니메이션을 재타겟팅했다. 본 구조가 달라도 동작의 의도가 유지되도록 처리해 자연스러운 애니메이션을 확보했다.
    
    !image.png
    
    </aside>
    
- 궁수 애니메이션 문제
    
    <aside>
    
    #### 1. 구매한 애셋의 궁수 애니메이션과 활 애니메이션 싱크 불일치
    
    구매한 애셋의 궁수 바디 애니메이션과 활 애니메이션이 별도 파일로 분리되어 있어, 두 애니메이션을 단순 재생하면 시위를 당기는 타이밍과 활이 휘는 타이밍이 어긋나는 문제가 발생했다.
    
    원인은 두 애니메이션의 키프레임 기준점이 달랐기 때문이었다.
    → 몽타주의 특정 프레임에 이벤트를 심을 수 있는 **Animation Notify**를 활용해 시위를 당기는 순간과 놓는 순간에 활 애니메이션을 트리거하도록 구현했다.
    프레임 상황과 무관하게 두 애니메이션의 싱크가 일치하도록 해결했다.
    
    !image.png
    
    </aside>
    
- WaitToAttack Ability에서 뒷걸음질 모션에서 벽뚫는 현상
    
    <aside>
    
    WaitToAttack 상태에서 뒷걸음질 모션은 **루트 모션이 없는 제자리 애니메이션**이었기 때문에, 이동을 블루프린트에서 **Set Actor Location**으로 직접 제어하는 방식으로 구현했다.
    그런데 이 방식은 UE5의 물리/충돌 처리를 우회해 액터를 강제 이동시키기 때문에, 벽이나 다른 콜리전과의 충돌이 무시되고 관통하는 문제가 발생했다.
    
    → Set Actor Location은 유지하되, 매 Tick마다 이동 목표 지점에 대해 **Overlap 감지**를 먼저 수행하고 충돌이 없는 경우에만 위치를 업데이트하도록 조건을 추가해 해결했다.
    
    !image.png
    
    !image.png
    
    → 타겟 객체 정면과 반대되는 방향 (뒷걸음질) 이동 &&
    다른 객체와 충돌 (Overlap) 되지 않을 경우에만 Set Actor Location 호출
    
    * 다만 제자리 애니메이션과의 이동 속도 동기화 문제는 추가로 고려해야 할 부분이다.
    
    </aside>
    

### **회고 & 개선점**

- 플러그인
    
    > **외부 플러그인 도입으로 일정 내 목표를 달성**했지만, **플러그인 내부 구조에 의존**하다 보니 **예상치 못한 동작이 발생했을 때 디버깅이 어려웠다**. 추후 프로젝트에서는 **핵심 전투 상태를 직접 구현해 구조를 완전히 파악하는 방향**으로 진행하고 싶다.
    > 
- 이동 처리
    
    > **`Set Actor Location`**은 유지하되 Overlap 감지 조건을 추가해 해결했지만, 이후 **`Set Actor Location`**의 **Sweep 옵션**을 활성화하면 이동 경로상의 충돌을 자동으로 처리할 수 있다는 것을 알게 됐다. 또한 **`AddMovementInput`**을 사용했다면 `CharacterMovementComponent`가 충돌을 처리해줘 더 구조적으로 해결 가능했을 것이다.
    > 
- 애니메이션
    
    > **서로 다른 스켈레톤 간 애니메이션 재타겟팅**이 필요한 경우, 메시를 직접 수정하지 않고 **`IK Rig + IK Retargeter`**로 해결할 수 있다는 것을 경험했다. 애셋 구매 시 스켈레톤 호환성을 사전에 검토해야 한다는 교훈도 얻었다.
    **`Animation Notify`**는 타이밍 동기화 외에, **애니메이션 재생 중 게임 로직을 트리거**하는 패턴으로 활용 가능하다는 것을 이번 프로젝트에서 체감했다.
    > 

### 성과

- 2023 G-STAR 전시

![](https://blog.kakaocdn.net/dn/bf4eD5/btsFkVr3KKB/DonZWaJVghOiK2eyXIOKS1/img.jpg)

![](https://blog.kakaocdn.net/dn/mrprL/btsFm85cwf0/qDqVKMVuS5qSkW7GscADT0/img.jpg)

![](https://blog.kakaocdn.net/dn/Mluae/btsFlUM8akF/Jw13qh7LkQJ5ckXNKMSyZ1/img.jpg)

> 인게임 플레이 스크린샷
> 

</aside>

- 한글 워들 (Korean Wordle)
    
    <aside>
    
    # 한글 워들 (Korean Wordle)
    
    <aside>
    🧩
    
    **숨겨진 단어를 맞춰라!**
    
    한글 워들은 해외 유명 게임인 ‘Wordle’의 한국어 버전으로, 영어 알파벳과 다른 자모 조합으로 복잡한 퍼즐을 제공합니다.
    
    해외 Wordle의 단순 이식이 아니라, **영어와 구조적으로 다른 한글의 자모 분리 특성**에 맞춘 입력·판정 시스템을 처음부터 설계한 프로젝트입니다.
    
    구글 플레이 출시 | 누적 다운로드 100회+ | 1인 개발
    
    </aside>
    
    **기간**: 총 6개월 (지속 개발 중)
    **기술 스택:** Unity, Git, Unity Test Framework
    **멤버**: 1명
    
    ### 주요 내용
    
    #### 한글 입력 및 판정 로직
    
    <aside>
    
    한글 키보드 입력 시스템 및 정답 판정 알고리즘 설계
    
    ```jsx
    
    ```
    
    </aside>
    
    #### **한글 데이터셋 구축 및 처리**
    
    <aside>
    
    5,800개 이상의 단어를 품사 기준으로 필터링하고, 게임 로직에서 즉시 조회 가능한 구조로 전처리하는 파이프라인을 구축했습니다.
    런타임 조회 비용을 최소화하도록 데이터 구조를 설계했습니다.
    
    단어 조회 시스템 최적화
    
    </aside>
    
    #### **Unity Test Framework 적용**
    
    <aside>
    
    Unity Test Framework를 도입하여 입력 및 판정 로직에 대한 테스트 케이스 자동화로 결함 최소화
    
    </aside>
    
    #### 프로젝트 폴더 구조 정리
    
    <aside>
    
    메인 화면, 스테이지 선택, 게임 플레이로 이어지는 전체적인 씬 흐름 및 UI 구조화
    
    아키텍처 고도화
    
    </aside>
    
    #### Assembly Definition 적용
    
    <aside>
    
    Assembly Definition을 활용한 코드 모듈화로 컴파일 시간 단축 및 유지보수성 향상
    
    </aside>
    
    ### 성과 및 의의
    
    - 한글 자모 처리라는 언어 특화 도메인 문제를 직접 정의하고 해결한 경험
    - Google Play Store 출시 및 서비스 운영
    - 누적 다운로드 100회 이상 달성
    
    ---
    
    !InGameScreenshot_1.jpg
    
    !InGameScreenshot_2.jpg
    
    !InGameScreenshot_3.jpg
    
    !InGameScreenshot_4.jpg
    
    !Screenshot_20260203_020637_ .jpg
    
    </aside>
    
- Simulator
    
    <aside>
    
    # 시뮬레이터 개발
    
    <aside>
    🪖
    
    유무인 협업체계 시뮬레이터 개발
    
    </aside>
    
    **기간**: 1년
    **기술 스택**: Unity, Git
    **멤버**: 6인
    
    ### 역할 - 클라이언트 개발
    
    - 시뮬레이터 UI 개발
        
        
    - 시뮬레이터 교전 시스템 개발
        
        <aside>
        
        시뮬레이터에서 유무인 객체가 교전에 사용할 기능을 구현하였다.
        
        미사일 발사
        
        유도미사일 발사
        
        자폭미사일 발사
        
        </aside>
        
    - 코드 설계 개선
        
        <aside>
        
        빠른 개발 사이클로 인해 기술 부채가 누적된 상황에서 리팩토링을 주도했다.
        
        `is-a` 관계 기준으로 상속 구조를 재정립하고, 데이터와 로직을 분리했다. 공통 유틸은 `static` 유틸 클래스로 추출해 재사용성을 높였으며, SOLID 원칙을 기반으로 각 클래스가 단일 책임만 갖도록 정리했다. 기존의 상속 관계는 합성(`Composition`)으로 전환하고, `interface`를 도입해 클래스 간 결합도를 낮췄다. 이렇게 분리함으로써 센서 기능 개발과 UI 개발자의 작업이 충돌나지 않게 진행할 수 있었다.
        
        - 센서 리팩토링
            - Before
                
                
            - After
                
                (예시 코드)
                
                (다이어그램)
                
        - 유틸리티
        
        이를 통해 센서 등 기능 개발과 UI 개발 간 작업 충돌 없이 병렬로 진행할 수 있었다.
        
        </aside>
        
    - 씬 및 리소스 구조 개선
        
        <aside>
        
        단일 씬으로 모든 기능을 처리하던 구조를 점진적으로 개선했다. 지형 로드 방식을 `Resources.Load` 기반 프리팹 로드에서 `Additive` Scene Load 방식으로 전환했으며,
        Unity Netcode for GameObjects의 `NetworkManager.SceneManager`를 통해 멀티플레이어 환경에서의 씬 동기화도 함께 처리했다.
        
        기존에 문자열 경로로 하드코딩되어 있던 지형 참조는 `SceneAsset` 레퍼런스로 대체하고, 로드할 지형 목록은 `ScriptableObject`로 분리해 데이터와 로직을 분리했다.
        
        객체, 센서 등의 프리팹 또한 `Resources.Load`에서 `Addressables`로 전환했다.
        라벨 기반으로 리소스를 그룹화해 관리하고, 비동기 로드를 적용해 런타임 부하를 분산시켰다.
        이 과정에서 문자열 하드코딩으로 관리하던 프리팹 로드를 애셋 레퍼런스 참조로 수정하여 유지보수성을 높였다.
        
        </aside>
        
    - 프로젝트 구조 및 팀 컨벤션 정립
        
        <aside>
        
        써드파티, 프로젝트 코드, 임시 폴더 등이 혼재된 폴더 구조를 정리했다.
        팀원들과 논의해 계층 구조를 재정립하고, `asmdef` 적용과 UPM 패키지화를 목표로 구조를 설계했다.
        코드 컨벤션도 함께 정립해 이후 과제에서 동일 기능을 중복 구현하는 문제를 방지했다.
        
        (프로젝트 계층 구조 사진)
        
        (컨벤션 사진)
        
        </aside>
        
    - GC Alloc 병목 해결
        - LiDAR Point Cloud Publish
            
            <aside>
            
            #### Before
            
            LiDAR의 PointCloud 정보를 ros2에 pub하기 위해 byte[] array로 변환하여 ros2message에 담는 과정이 존재
            
            ```csharp
            // ..Lidar Data Publishing
            {
            	...
            	var data = this._converter.pointcloud.ToArray();
            	Buffer.BlockCopy(data, 0, _rosMessage.Data, 0, _rosMessage.Data.Length);
            	this.ros2Publisher.Publish(this._rosMessage);
            	
            	...
            }
            ```
            
            이 과정에서 ToArray() 변환으로 인해 매초 약 4MB 정도의 GC Alloc이 발생함.
            
            !image.png
            
            #### After
            
            불필요한 GC Alloc을 줄이기 위해, NativeArray<float>을  Reinterpert<byte>를 사용해 변환하고 CopyTo 함수를 사용해 직접 ros2message에 담는 방식으로 수정하였다.
            
            ```jsx
            // ..Lidar Data Publishing
            {
            	...
            	this.converter.PointCloud.Reinterpret<byte>(sizeof(float)).CopyTo(rosMessage.Data);
            }
            ```
            
            !image.png
            
            #### 결과
            
            LiDAR GC Alloc: 8~10 MB → 수십 Kb로 개선, 갑작스러운 GC로 인한 fps 스파이크 현상 줄어듦
            
            </aside>
            
        - 
    </aside>
    
- Infra Management
    
    <aside>
    
    # 사내 개발 인프라 구축 (+DevOps)
    
    <aside>
    💡
    
    **사내 워크플로우 개선을 위한 개발 인프라 구축**
    
    </aside>
    
    **기간**: 2025.09 ~ 2026.06
    **기술 스택**: Jenkins, Docker, Gitea/GitLab, Git
    **멤버**: 1인 (인프라 단독 구축 및 관리)
    
    ### 역할 - 개발 인프라 구축
    
    #### Gitea/GitLab 로컬 호스팅
    
    <aside>
    
    **Docker-compose 기반 로컬호스팅 Gitea 서버**를 구축하여 Git 환경으로 이전 수행
    프로젝트 브랜치 1개 (main) → 10~개 이상으로 분업화
    
    </aside>
    
    #### Git-Flow 기반 브랜치 구조
    
    <aside>
    
    [main - develop - feature- release] 브랜치 구조 도입
    
    </aside>
    
    #### Jenkins CI/CD 파이프라인
    
    <aside>
    
    파이프라인 구조도 변화
    
    커밋 → 빌드 → NAS 배포의 전 과정을 자동화.
    
    FigZam을 사용해 플로우차트로 전체 파이프라인 과정 시각화
    
    !Jenkins Pipeline v3.png
    
    </aside>
    
    #### Git-SVN 하이드리브 구조
    
    <aside>
    
    Git + SVN 하이브리드 협업 구조 구축
    3D 디자이너 팀과 협업을 위해 디자인용 SVN 레포 구성
    각 프로젝트별 필요한 리소스를 부분 체크아웃
    
    Git-SVN 하이브리드 구조
    
    </aside>
    
    #### **Unity Accelerator 캐시 서버 구축**
    
    Unity Aceelerator
    
    ### 성과
    
    - 개발팀의 빌드, 압축, 배포, 공지의 **전 과정을 자동화하여 반복 작업 제거**. 기존 80% 가량 시간 절약
    - 사내 형상 관리 시스템의 안정성 및 개발 생산성 증진.
    - 개발팀과 디자인팀과의 협업 효율 증진. 기존 대비 90% 가량 시간 절약
    
    </aside>
    

Unity Projects

Sub Projects

---

# Skills

## Proficient

<aside>
<img src="notion://custom_emoji/d8024295-b609-423f-b7d9-9885c2df1deb/2a38ab26-d2ad-80fb-ac27-007aeb755b3a" alt="notion://custom_emoji/d8024295-b609-423f-b7d9-9885c2df1deb/2a38ab26-d2ad-80fb-ac27-007aeb755b3a" width="40px" />

### Unity

- UI 개발
- 게임플레이 프로그래밍
- Netcode for GameObjects
- Pathfinding
- Compute Shader / Job System
- 에디터 커스터마이징
- Unity Test Framework
</aside>

<aside>
<img src="attachment:a83238f2-64fb-44ef-b053-c8f71dcefc2f:unreal-logo.png" alt="attachment:a83238f2-64fb-44ef-b053-c8f71dcefc2f:unreal-logo.png" width="40px" />

### **Unreal**

- Bluerpine / C++
- UI (UMG)
- 게임플레이 프로그래밍, 플레이어 시스템 설계
- 적 AI (Behaviour Tree, Black Board, AI Perception)
- 애니메이션 (Animation Bluerpine, Montage Delegate, Motion Warping)
- 멀티플레이어 네트워킹 (Replication, RPC, OnRep)
- Game Ability System (GAS)
</aside>

## Familiar

<aside>
⚙️

### **DevOps & Version Control**

- Git Flow, Gitea/Gitlab 로컬 호스트 운용
- Jenkins 기반 CI/CD, Teams 워크플로우 연동
- Git-SVN 하이브리드 구조 구축
- Sentry 기반 에러 및 이슈 관리
</aside>

<aside>
<img src="notion://custom_emoji/d8024295-b609-423f-b7d9-9885c2df1deb/2a38ab26-d2ad-809a-8853-007ace6466cf" alt="notion://custom_emoji/d8024295-b609-423f-b7d9-9885c2df1deb/2a38ab26-d2ad-809a-8853-007ace6466cf" width="40px" />

### Python

- **Object Detection**
- **Deep Reinforcement Learning**
- **Depth Estimation, 3D Reconstruction**
</aside>

<aside>
🤖

### AI

- DQN (Deep Q-Network)
- LLM 기반 멀티 에이전트 시스템, LangChain / FastAPI 활용
</aside>

# Experiences

### FunctionBay (Internship)

> *판교, 경기도*
> 

<aside>

**[Keyword]
Unity, Simulator Development, UI, SDD**

*(2024.07.22 ~ 2024.08.31)*

### **Simulation & UI**

- **Netcode for Gameobjects 기반 시뮬레이터 개발**
- 동적 드롭다운 메뉴 등 **커스텀 UI 컴포넌트 설계 및 구현**

### **Documentation & Automation**

- **소프트웨어 설계서(SDD) 작성**
- Doxygen XML 출력값을 Draw.io 다이어그램으로 변환하는 **자동화 툴 개발**
</aside>

### MetaMotionX (Contract → Full-time Employee)

> *판교, 경기도
**FunctionBay Inc.*** to ***MetaMotionX Inc.***
> 

<aside>

**[Keyword]**

**Simulator Development, Unity, Unreal5, Design Pattern, Optimization(Profiling)**

**SVN, Git, Redmine**

**CI/CD, Jenkins, Unity Test Framework(UTF)**

### **근무 기간**

**~~인턴** (2024.09 ~ 2025.09)~~

#### **Simulation Development**

- **Netcode for Gameobjects 기반 시뮬레이터 개발**
- 차량의 경로 계획을 위해 Reeds-Shepp Curve를 적용한 A* 알고리즘 구현

#### **UI/UX Engineering**

- **MVP/MVVM 패턴 및 이벤트 기반 상태 관리**를 활용한 UI 시스템 아키텍처 설계
- **DOTween**을 활용한 UI 애니메이션 및 트랜지션 구현

#### **Unreal Engine 5**

- **AsyncTask**를 활용한 Non-blocking 방식의 **LiDAR 시뮬레이션 및 포인트 클라우드 처리 구현**

**정규직** (2025.10 ~ 현재)

#### **Simulation Development**

- **Netcode for Gameobjects 기반 시뮬레이터 개발**
- Render Texture 기반 RTSP 스트리밍을 활용한 센서 시뮬레이션 구현
- 교전 및 사격, 유도 미사일 제어 시스템 등 구현

#### **Performance & Optimization**

- **Unity Profiler**를 통한 병목 지점 분석 및 GC 할당 최적화

#### **DevOps & Infrastructure**

- 버전 관리 시스템 마이그레이션 (**SVN → Self-hosted Git/Gitea**)
- 협업 효율화를 위한 **Git Flow 브랜치 전략 수립**
- Shared Jenkins Library 기반의 **Jenkins CI/CD 파이프라인 구축**
- **Unity Test Framework**를 적용하여 시나리오 테스트 자동화
- Git-SVN / 개발자-디자이너 하이브리드 협업 구조 구축
- 포트폴리오 내용
    
    ## 1. 전투·발사체 아키텍처 리팩토링
    
    - **문제**: 무기·미사일·탄환이 강결합·중복되어 신규 무장 추가와 공통 수정의 비용이 컸고, 반복 생성되는 발사체는 런타임 할당을 유발했다.
    - **해결**: 발사기(`ProjectileLauncherBase`)·발사체(`ProjectileBase`)·무장(`WeaponBase`) 책임을 나누고, `IImpactable`, `IExplosive`, `IExpirable`, `IManeuver` 등 인터페이스로 충돌·폭발·수명·기동 기능을 분리했다. 발사체는 오브젝트 풀로 관리했다.
    - **예방**: 투사체·스킬처럼 변형이 많은 도메인은 비대한 상속 계층 대신 기능 단위 조합으로 설계하고, 풀링은 생성뿐 아니라 회수·세션 종료 시점까지 관리한다.
    - **근거 월**: 3월, 4월
    
    ## 2. 다중 카메라 렌더링 성능 최적화
    
    - **문제**: 추가 카메라 활성화만으로 프레임이 급락했고, 카메라 수 증가에 따른 GPU 병목이 발생했다.
    - **해결**: LayerMask·LayerCullingDistance·LOD로 렌더 대상을 제한하고, 컴포넌트를 캐싱했다. DX12의 카메라별 RenderGraph·리소스 배리어 비용을 벤치마크로 규명해 DX11 전환을 결정했으며, `Camera.Render()`를 `SubmitRenderRequest()` 기반 경로로 통일했다.
    - **예방**: 미니맵·분할 화면·CCTV 기능은 카메라 수, 그래픽 API, 엔진 버전을 변수로 벤치마크하고 CPU/GPU 프로파일과 GC 할당량으로 원인을 분리한다.
    - **근거 월**: 2월, 6월
    
    ## 3. 물리 계산·GC 병목 제거
    
    - **문제**: 다수 개체의 환경 계산과 물리 탐색, 데이터 변환 과정이 메인 스레드·GC 비용으로 누적될 수 있었다.
    - **해결**: 조류력 계산은 `IJob`, 변환 로직은 `IJobParallelFor`로 이전했다. 반경 탐색은 `SpherecastCommand` 배치 처리로 전환하고, `ToArray()`를 `Reinterpret`·`CopyTo`로 바꿔 할당을 줄였다.
    - **예방**: 개체 수에 비례하는 로직은 할당과 메인 스레드 점유를 먼저 측정한 뒤 Job System과 배치 쿼리 적용 여부를 결정한다.
    - **근거 월**: 3월, 6월
    
    ## 4. 멀티플레이 상태·시간 동기화 디버깅
    
    - **문제**: 네트워크 시간과 WaterSystem 시간이 어긋나 클라이언트별 시각 상태가 불일치했고, Inspector 변경값과 `NetworkVariable` 런타임 값도 혼동될 수 있었다.
    - **해결**: 시간 제어 경로를 `SimulationManager`로 단일화하고 세션 종료 시 네트워크 시간 사용을 해제했다. 네트워크 변수의 초기화·변경·동기화 시점을 점검해 원인을 규명했다.
    - **예방**: 로컬 시간과 서버 시간을 혼용하지 않고, 네트워크 값은 권한·초기값·동기화 시점을 명시적으로 검증한다.
    - **근거 월**: 2월, 3월
    
    ## 5. 유도 발사체와 AI 상태 전환 안정화
    
    - **문제**: 다중 발사대에서 발사 대상을 선택해야 했고, 초기 회전 오류·선회 시 회전 튐·자기 충돌·타깃 유실 상황을 처리해야 했다.
    - **해결**: 타깃 정렬이 가까운 발사대를 선택하고 초기 회전을 보정했다. 회전은 Lerp로 전환하고, 발사 직후 Collider를 비활성화했다가 `launchDuration` 후 활성화했다. 순항·자폭 상태는 타깃 판정에 따라 전환했다.
    - **예방**: 스폰 위치·초기 방향·충돌 활성 시점·유도 전환을 각각 검증하고, AI는 상태·전이 조건·예외 상태를 분리해 테스트한다.
    - **근거 월**: 4월, 5월
    
    ## 6. 리플레이·에셋·에디터 제작 도구
    
    - **문제**: 다양한 대상의 녹화·재생, AssetBundle 참조, 지형 충돌 가공, 시나리오 편집 취소 기능이 일관되게 지원되어야 했다.
    - **해결**: `IReplaySave`로 녹화 계약을 표준화하고 ffmpeg 녹화를 구현했다. 에셋번들 의존성 참조를 복구하고, 메쉬 분할/결합 에디터 도구와 시나리오 편집 Undo 기능을 구현했다.
    - **예방**: 제작 도구는 반복 작업을 자동화하고, 에셋은 실제 빌드에서 의존성을 검증한다. 편집 작업은 명령 또는 역연산 정보를 보관해 Undo 가능하게 설계한다.
    - **근거 월**: 1월, 3월, 6월
    
    ## 7. 데이터 단위와 공통 모듈의 일관성 확보
    
    - **문제**: 속도 단위가 혼재되고, 공통 타깃 선택 모듈의 오류가 여러 기능으로 확산될 수 있었다.
    - **해결**: 내부 속도 기준을 m/s로 통일하고 화면·통신 경계에서만 knot·km/h로 변환했다. RaycastSelection 문제는 개별 증상이 아닌 공유 모듈의 원인으로 좁혀 수정했다.
    - **예방**: 물리량은 내부 표준 단위를 하나로 고정하고, 공통 판정 모듈에는 단위 테스트와 대표 시나리오 회귀 테스트를 둔다.
    - **근거 월**: 5월
</aside>

# Activities

<aside>

**Algorithm Study** (2023.04. ~ 2025.02.28)

**스터디 창립 멤버**

- 알고리즘 스터디 그룹 설립 및 운영 (활동 인원 20명 이상 규모로 확장)
- DP, 그리디, 그래프 이론 등 핵심 알고리즘 및 문제 해결 전략 강의
- 총학생회 주관 스터디 프로그램 우수 활동상 수상
- 교내외 프로그래밍 경진대회 다수 입상
- 스터디 그룹을 경희대학교 공식 알고리즘 동아리 'KHUA'로 발전시킴

**KHUA(Kyung Hee University Algorithm)** (2025.03.28 ~ 2025.12.31)
**동아리 회장**

- 1/2대 회장으로서 동아리 체계 구축 및 운영 총괄
- 제21회 경희대학교 교내 봄 프로그래밍 경진대회 기획 및 주최
- 5개 교내 동아리와 연합 알고리즘 스터디 운영 및 관리
- 제11회 Shake! 프로그래밍 경진대회 경희대학교 예선 운영
</aside>

<aside>

**Coding Instructor**
JamCoding, TedI
(for 1 year 8 month)

**책 집필**
https://www.darakwon.co.kr/books/detailProduct.asp?p_id=11803&pc_id_2=386&pc_id_3=389: 공동 집필(2명)

</aside>

# Awards

<aside>

겨울심화프로젝트 발표회: 1등 (KOREA IT)
(2024.02.28)
- **Project: Deadline**

여름프로젝트 발표회: **2등** (KOREA IT) 
(2024.08.23)
**- Project: Deadline**

경희대학교 가을 프로그래밍 경시대회 (ICPC Seoul Regional First Round): **우수상**
(2024.11.04)
**- 경희대학교 교내 3위**

경희대학교 SW중심대학 연합 SW 페스티벌: 창의상
- 참여 대학: 경기대/경희대/이화여대/한성대
**- Project: Deadline**

경희대학교 가을 프로그래밍 경시대회(ICPC Seoul Regional First Round): 장려상
(2025.10.10)
**- 경희대학교 교내 6위**

</aside>

# Certification

> **TOPCIT - 563 (3 level)**
> 
> 
> (2025.05.24)
> 

# Papers

> **KCC2025 학부생/주니어논문경진대회 (2025.7.30)**
학부생부문 장려상 && 2025 UIST Poster

https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12318659
> 

# Exhibitions

> **⭐2023 G-Star**
(2023.11.16 ~ 2023.11.19)
**Project: Fallen Knight

⭐2024 G-Star**
(2024.11.13 ~ 2024.11.17)
**Project: DeadLine**
>