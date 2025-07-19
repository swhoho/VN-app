# 컴포넌트 분석 문서 (COMPONENTS.md)

이 문서는 Visual Novel Hub 애플리케이션의 주요 컴포넌트들에 대한 기능, Props, 특징을 정리한 문서입니다.

## 1. Canvas 페이지 (client/src/pages/canvas.tsx)

### 기능
- 사용자가 업로드한 비주얼 노벨 콘텐츠를 3열 그리드 형태로 표시
- 모바일 중심의 반응형 디자인으로 구현
- framer-motion을 활용한 진입 애니메이션 적용
- 빈 상태와 로딩 상태를 적절히 처리

### 주요 특징
- **애니메이션**: 점진적 로딩 애니메이션 (순차적 카드 표시)
- **이미지 처리**: getImageProps 유틸리티를 통한 CORS 이슈 해결
- **다국어 지원**: i18n 시스템을 통한 제목/설명 번역
- **SEO 최적화**: SEOHead 컴포넌트를 통한 메타데이터 관리
- **플로팅 액션 버튼**: 우하단 고정 업로드 버튼

### 상수
```typescript
const GRID_SKELETON_COUNT = 9; // 3x3 그리드
const ANIMATION_DELAY_INCREMENT = 0.05;
const INITIAL_ANIMATION_DELAY = 0.1;
```

### 의존성
- React Query를 사용한 데이터 페칭
- wouter를 통한 라우팅
- Lucide React 아이콘
- shadcn/ui 컴포넌트

---

## 2. UploadVN 페이지 (client/src/pages/upload-vn.tsx)

### 기능
- 비주얼 노벨 업로드를 위한 종합적인 폼 인터페이스
- 썸네일 업로드 (정사각형 1080x1080, 세로형 1080x1920)
- 작품 정보 입력 (제목, 설명, 태그, 카테고리)
- 컨텐츠 등급 설정 (폭력성, 노출도, 성적 콘텐츠)
- 작품 파일 업로드 또는 외부 URL 연결

### 주요 특징
- **모바일 최적화**: 전체 화면 활용 및 하단 고정 버튼
- **드래그 앤 드롭**: 파일 업로드 영역에 대화형 인터페이스
- **카테고리 시스템**: 주 카테고리/부 카테고리 선택 가능
- **에피소드 관리**: 시리즈 형태의 콘텐츠 구성 지원
- **약관 동의**: 정책 및 이용약관 체크박스

### 폼 필드
```typescript
// 썸네일
- 정사각형 썸네일 (1080x1080, JPG/PNG, 500KB 이하)
- 세로형 썸네일 (1080x1920, JPG/PNG, 700KB 이하)

// 기본 정보
- 제목 (Title)
- 짧은 설명 (Short Description)
- 태그 (Tags, 쉼표로 구분)
- 카테고리 1, 2 (Romance, Fantasy, Sci-Fi, Horror, Comedy)

// 콘텐츠 등급
- 폭력성: None, Mild, Graphic
- 노출도: None, Partial, Full
- 성적 콘텐츠: None, Suggestive, Explicit

// 작품 업로드
- 외부 URL 또는 파일 업로드 (최대 100MB)

// 에피소드 관리
- 에피소드 추가 인터페이스
```

---

## 3. useAuth 훅 (client/src/hooks/useAuth.tsx)

### 기능
- Supabase를 활용한 인증 상태 관리
- Google OAuth 로그인/로그아웃 처리
- 사용자 프로필 자동 생성 및 관리
- 전역 인증 컨텍스트 제공

### 제공하는 값
```typescript
interface AuthContextType {
  user: User | null;           // 현재 사용자 정보
  isLoading: boolean;          // 로딩 상태
  isAuthenticated: boolean;    // 인증 여부
  error: AuthError | PostgrestError | null; // 에러 상태
  loginWithGoogle: () => Promise<void>;     // Google 로그인
  logout: () => Promise<void>;              // 로그아웃
  isLoggingOut: boolean;       // 로그아웃 진행 상태
}
```

### 주요 특징
- **자동 프로필 생성**: 신규 사용자 최초 로그인 시 프로필 자동 생성
- **세션 상태 동기화**: Supabase 인증 상태 변경 실시간 감지
- **에러 처리**: 포괄적인 에러 핸들링 및 로깅
- **타입 안전성**: TypeScript를 통한 엄격한 타입 체크

### 프로필 생성 로직
```typescript
const newProfile = {
  id: session.user.id,
  username: session.user.user_metadata?.full_name || 
            session.user.email?.split("@")[0] || 
            "Anonymous",
  profileImageUrl: session.user.user_metadata?.avatar_url || 
                   session.user.user_metadata?.picture || 
                   null,
  createdAt: new Date().toISOString(),
  storiesRead: 0,
  chaptersRead: 0,
  readingTimeHours: "0",
  favoritesCount: 0,
  currentStreak: 0,
};
```

---

## 4. SEOHead 컴포넌트 (client/src/components/seo-head.tsx)

### 기능
- 동적 메타데이터 관리 (제목, 설명, 키워드)
- Open Graph 및 Twitter 카드 메타태그 설정
- Canonical URL 및 로봇 메타태그 관리
- 검색 엔진 최적화(SEO) 지원

### Props
```typescript
interface SEOHeadProps {
  title?: string;              // 페이지 제목
  description?: string;        // 페이지 설명
  keywords?: string;           // 검색 키워드
  image?: string;             // OG 이미지 URL
  url?: string;               // Canonical URL
  type?: 'website' | 'article'; // OG 타입
  noindex?: boolean;          // 검색 엔진 인덱싱 제외
}
```

### 기본값
```typescript
title: "Visual Novel Hub - Discover Amazing Interactive Stories"
description: "Explore thousands of visual novels across romance, fantasy, horror, and sci-fi genres..."
keywords: "visual novels, interactive stories, romance novels, fantasy stories..."
image: "https://visual-novel-hub.replit.app/og-image.jpg"
url: "https://visual-novel-hub.replit.app/"
type: "website"
noindex: false
```

### 주요 특징
- **동적 메타태그 업데이트**: useEffect를 통한 실시간 메타데이터 변경
- **중복 방지**: 기존 메타태그 확인 후 업데이트 또는 생성
- **소셜 미디어 최적화**: Facebook, Twitter 등 SNS 공유 최적화
- **검색 엔진 대응**: robots 메타태그 및 canonical URL 관리

---

## 5. StructuredData 컴포넌트 (client/src/components/structured-data.tsx)

### 기능
- Schema.org 구조화된 데이터 생성 및 관리
- 검색 엔진의 리치 스니펫 생성 지원
- 다양한 콘텐츠 타입에 대한 구조화된 데이터 제공

### Props
```typescript
interface StructuredDataProps {
  type: 'WebSite' | 'ItemList' | 'Product' | 'Article'; // 구조화된 데이터 타입
  data?: any;     // 개별 데이터 객체
  items?: Item[]; // 아이템 목록 (ItemList 타입용)
}
```

### 지원하는 스키마 타입

#### 1. WebSite
- 사이트 전체 정보 및 검색 기능 정의
- SearchAction을 통한 사이트 내 검색 지원

#### 2. ItemList  
- 비주얼 노벨 랭킹 목록
- 각 아이템의 평점, 조회수, 장르 정보 포함

#### 3. Product
- 포인트 패키지 상품 정보
- 가격, 통화, 재고 상태 정보

#### 4. Article (Book 스키마 사용)
- 개별 비주얼 노벨 작품 정보
- 평점, 리뷰 수, 조회수 등 상세 정보

### 주요 특징
- **동적 업데이트**: 컴포넌트 props 변경 시 자동 구조화된 데이터 업데이트
- **중복 방지**: 기존 구조화된 데이터 제거 후 새로운 데이터 삽입
- **클린업**: 컴포넌트 언마운트 시 구조화된 데이터 제거
- **SEO 향상**: 검색 결과에서 리치 스니펫 표시 지원

---

## 아키텍처 특징

### 공통 설계 원칙
1. **타입 안전성**: 모든 컴포넌트에서 TypeScript 엄격 모드 적용
2. **재사용성**: 컴포넌트 분리 및 props 인터페이스 명확화
3. **성능 최적화**: React Query 캐싱, useMemo/useCallback 활용
4. **접근성**: ARIA 라벨 및 키보드 네비게이션 지원
5. **SEO 최적화**: 메타데이터 및 구조화된 데이터 적극 활용

### 상태 관리 패턴
- **전역 상태**: React Context (인증, 언어 설정)
- **서버 상태**: React Query (API 데이터 캐싱)
- **로컬 상태**: useState, useReducer (폼 상태, UI 상태)

### 스타일링 시스템
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **shadcn/ui**: 일관된 디자인 시스템 컴포넌트
- **framer-motion**: 부드러운 애니메이션 효과

### 에러 처리 전략
- 포괄적인 try-catch 블록
- 사용자 친화적인 에러 메시지
- 개발자용 상세 로깅
- fallback UI 제공

이러한 컴포넌트들은 모바일 우선 설계, 성능 최적화, SEO 친화적 구조를 통해 현대적인 웹 애플리케이션의 표준을 만족합니다.