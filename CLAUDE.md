# 바로계산 (barogyesan.com)

## Overview
한국형 금융/생활 계산기 모음 사이트. 프로그래매틱 SEO로 패시브 인컴 창출.
디자��� 문서: `~/.gstack/projects/EarnMoney/kim-gunwoo-unknown-design-20260405-164858.md`

---

## Planning Methodology (기획 방법론)

모든 기획 단계에서 **"이 목적을 달성하기에 가장 효과적인 방식은 무엇인가?"**를 항상 먼저 고민한다.

### 0. 사용자 프로파일링 (User Profiling) — 모든 기획의 시작점

아이디어를 찾기 전에, 사용자의 상황을 먼저 파악한다. 리서치 결과를 바로 던지지 않는다.

#### 핵심 질문 프레임워크
다음 질문들을 통해 사용자의 상황을 입체적으로 이해한다:

| 차원 | 질문 | 왜 중요한가 |
|------|------|------------|
| 목표 시급성 | 빠르게(1-3개월) 수익을 내고 싶은가, 장기적(6개월+)으로 키우고 싶은가? | 전략이 완전히 달라짐. 빠른 수익 = 제휴/광고, 장기 = SaaS/플랫폼 |
| 전문 분야 | 특별히 잘 아는 업종이나 도메인이 있는가? (예: 교육, 부동산, 요식업 등) | 버티컬 SaaS는 도메인 지식이 핵심 경쟁력 |
| 기술 수준 | 개발 경험이 있는가? 어느 수준인가? | 구현 가능 범위 결정 |
| 투자 가능 자원 | 하루에 투입 가능한 시간? 초기 비용 투자 가능? | 현실적 범위 설정 |
| 수익 목표 | 월 얼마를 목표로 하는가? (용돈 vs 생활비 vs 사업) | 수익 모델 규모 결정 |
| 리스크 선호 | 안정적 소규모 수익 vs 불확실하지만 큰 수익? | 모델 유형 결정 |

#### 프로파일링 → 추천 흐름
```
질문으로 상황 파악 → 프로필 요약 → 리서치 결과 중 매칭되는 것만 필터링 → 2-3개 추천 → 선택
```

**원칙**: 선택지가 많으면 결정이 어렵다. 사용자 상황에 맞게 좁혀서 제시한다.

### 1. 아이디어 발굴 (Discovery)

#### 웹 리서치 전략
목적에 따라 검색 쿼리를 설계하고, 결과를 구조화하여 의사결정에 활용한다.

| 목적 | 검색 쿼리 예시 | 기대 결과 |
|------|---------------|-----------|
| 트렌드 파악 | `"profitable side project ideas 2026"`, `"indie hacker revenue 2026"` | 현재 잘 되는 수익화 모델 목록 |
| 시장 규모 | `"[아이디어] market size TAM"`, `"[키워드] industry report"` | 시장 진입 가치 판단 |
| 경쟁 분석 | `"[서비스명] alternatives"`, `"top [카테고리] tools"` | 경쟁 강도, 차별화 포인트 |
| 기술 타당성 | `"how to build [아이디어] with Next.js"`, `"[기능] API free tier"` | 구현 난이도, 비용 추정 |
| 수익성 검증 | `"[서비스] pricing page"`, `"[카테고리] SaaS revenue"` | 가격 책정 벤치마크 |

#### 활용 도구
- **WebSearch / WebFetch**: 시장 트렌드, 경쟁사 분석, 기술 조사
- **Skill `/office-hours`**: YC 스타일 강제 질문으로 아이디어의 핵심 검증 (수요 현실, 최소 진입점, 관찰 기반 인사이트)
- **Skill `/plan-ceo-review`**: 아이디어를 10-star 제품 관점에서 확장/도전
- **Agent (Explore)**: 유사 오픈소스 프로젝트 구조 분석

### 2. 아이디어 평가 (Evaluation)

발굴한 아이디어를 아래 기준으로 점수화하여 비교한다:

| 평가 기준 | 가중치 | 설명 |
|-----------|--------|------|
| 수익 잠재력 | ★★★ | 월 100만원 이상 가능성이 있는가? |
| 수익까지 속도 | ★★★ | 첫 수익이 1-3개월 내에 가능한가? |
| 경쟁 강도 | ★★ | 레드오션인가, 틈새가 있는가? |
| 운영 난이도 | ★★ | 사용자가 직접 운영/관리할 수 있는가? (마케팅, 콘텐츠 등) |
| 확장성 | ★ | 성장 시 스케일 가능한 구조인가? |

> **참고**: "구현 난이도"는 평가 기준에서 제외. 코딩은 Claude가 전담하므로 기술 난이도는 제약 조건이 아님.

### 3. 검증 & MVP (Validation)

```
아이디어 선정 → 랜딩페이지 제작 → 초기 트래픽 확보 → 전환율 측정 → Go/No-Go 결정
```

- **최소 검증**: 랜딩페이지 + 이메일 수집으로 수요 확인
- **빠른 MVP**: 핵심 기능 1개만 구현, 2주 이내 배포 목표
- **측정 지표**: 방문자 수, 가입 전환율, 재방문율

### 4. 의사결정 원칙

- **속도 > 완벽**: 빠르게 검증하고 실패하면 피봇
- **데이터 기반**: 감이 아니라 검색 결과와 수치로 판단
- **단계적 투자**: 무료 도구 → 유료 도구 순서로 비용 최소화
- **도구 최대 활용**: 사용 가능한 모든 도구(웹검색, Skill, Agent)를 적극 활용하여 정보 수집의 질을 높임

### 5. 역할 분담

| 역할 | 담당 | 설명 |
|------|------|------|
| 기획/방향 결정 | 사용자 | 아이디어 선택, 비즈니스 판단, Go/No-Go 결정 |
| 리서치/분석 | Claude | 웹검색, 시장 조사, 경쟁 분석, 데이터 수집 |
| 설계/개발 | Claude | 코드 작성, 아키텍처, UI/UX 구현, 배포 |
| 콘텐츠/마케팅 | 협업 | Claude가 초안 작성, 사용자가 검토/수정 |
| 운영/관리 | 사용자 | 고객 응대, 콘텐츠 업데이트, 비즈니스 운영 |

> **원칙**: 수익성이 충분히 매력적이라고 판단되면, 사용자가 못하는 기술적 부분은 Claude가 전담한다. 기술적 제약 때문에 좋은 아이디어를 포기하지 않는다.

---

## Tech Stack
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes (필요시 별도 서버 추가)
- **Database**: 추후 결정 (Supabase, PlanetScale 등)
- **Deployment**: Vercel

## Project Structure
```
/src
  /app          # Next.js App Router pages
  /components   # Reusable UI components
  /lib          # Utility functions, API clients
  /types        # TypeScript type definitions
```

## Conventions
- 언어: 한국어 커뮤니케이션, 영어 코드
- 컴포넌트: React Server Components 우선, 필요시 'use client'
- 스타일링: Tailwind CSS utility-first
- 상태관리: React hooks 우선, 필요시 zustand
- 패키지 매니저: bun

## Commands
- `bun run dev` - 개발 서버 실행
- `bun run build` - 프로덕션 빌드
- `bun run lint` - ESLint 실행

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
