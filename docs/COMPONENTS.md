# 컴포넌트 문서

## 📋 개요

비주얼 노벨 플랫폼은 재사용 가능한 React 컴포넌트를 기반으로 구축되었습니다. 이 문서는 주요 컴포넌트들의 사용법과 API를 설명합니다.

## 🏗️ 컴포넌트 아키텍처

### 컴포넌트 분류
- **UI 컴포넌트** (`/components/ui/`): 기본 UI 프리미티브
- **비즈니스 컴포넌트** (`/components/`): 애플리케이션 특화 컴포넌트
- **페이지 컴포넌트** (`/pages/`): 전체 페이지 구성 컴포넌트
- **커스텀 훅** (`/hooks/`): 재사용 가능한 로직 훅

### 디자인 시스템
- **Atomic Design**: 원자 → 분자 → 유기체 → 템플릿 → 페이지
- **Radix UI**: 접근성 중심 프리미티브
- **Tailwind CSS**: 유틸리티 기반 스타일링

---

## 🎨 UI 컴포넌트 (Shadcn/ui)

### Button
**위치**: `/components/ui/button.tsx`

**설명**: 다양한 스타일과 크기를 지원하는 버튼 컴포넌트

**Props**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

**사용 예시**:
```tsx
import { Button } from '@/components/ui/button'

// 기본 버튼
<Button>클릭하세요</Button>

// 변형 버튼
<Button variant="outline">아웃라인</Button>
<Button variant="destructive">위험</Button>

// 크기 변형
<Button size="sm">작은 버튼</Button>
<Button size="lg">큰 버튼</Button>

// 아이콘 버튼
<Button size="icon">
  <Plus className="h-4 w-4" />
</Button>
```

---

### Card
**위치**: `/components/ui/card.tsx`

**설명**: 컨텐츠를 담는 카드 컴포넌트

**컴포넌트 구성**:
- `Card`: 기본 카드 컨테이너
- `CardHeader`: 카드 헤더
- `CardTitle`: 카드 제목
- `CardDescription`: 카드 설명
- `CardContent`: 카드 내용
- `CardFooter`: 카드 푸터

**사용 예시**:
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardContent>
    <p>카드 내용</p>
  </CardContent>
</Card>
```

---

### Dialog
**위치**: `/components/ui/dialog.tsx`

**설명**: 모달 대화상자 컴포넌트

**컴포넌트 구성**:
- `Dialog`: 루트 컴포넌트
- `DialogTrigger`: 대화상자 트리거
- `DialogContent`: 대화상자 내용
- `DialogHeader`: 대화상자 헤더
- `DialogTitle`: 대화상자 제목
- `DialogDescription`: 대화상자 설명

**사용 예시**:
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button>대화상자 열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>대화상자 제목</DialogTitle>
    </DialogHeader>
    <p>대화상자 내용</p>
  </DialogContent>
</Dialog>
```

---

### Badge
**위치**: `/components/ui/badge.tsx`

**설명**: 상태나 카테고리를 표시하는 뱃지 컴포넌트

**Props**:
```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}
```

**사용 예시**:
```tsx
import { Badge } from '@/components/ui/badge'

<Badge>기본</Badge>
<Badge variant="secondary">보조</Badge>
<Badge variant="destructive">위험</Badge>
<Badge variant="outline">아웃라인</Badge>
```

---

## 🧩 비즈니스 컴포넌트

### Header
**위치**: `/components/header.tsx`

**설명**: 애플리케이션의 상단 헤더 컴포넌트

**기능**:
- 로고 및 브랜드명 표시
- 언어 선택기
- 테마 토글 (라이트/다크 모드)
- 사용자 메뉴 (로그인 상태에 따라)

**사용 예시**:
```tsx
import Header from '@/components/header'

<Header />
```

**주요 기능**:
- 반응형 디자인 (모바일/데스크톱)
- 다국어 지원
- 인증 상태 관리
- 테마 전환

---

### BottomNavigation
**위치**: `/components/bottom-navigation.tsx`

**설명**: 모바일 친화적인 하단 네비게이션 컴포넌트

**기능**:
- 주요 페이지 네비게이션
- 현재 페이지 강조
- 아이콘 및 레이블

**네비게이션 항목**:
- 홈 (`/`)
- 랭킹 (`/ranking`)
- 검색 (`/search`)
- 마이페이지 (`/my-page`)

**사용 예시**:
```tsx
import BottomNavigation from '@/components/bottom-navigation'

<BottomNavigation />
```

---

### NovelCard
**위치**: `/components/novel-card.tsx`

**설명**: 비주얼 노벨 아이템을 표시하는 카드 컴포넌트

**Props**:
```typescript
interface NovelCardProps {
  item: {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    rating: string
    viewCount: number
    likeCount: number
    featured: boolean
  }
  language: string
}
```

**기능**:
- 이미지 프록시 처리
- 다국어 제목/설명 지원
- 별점 표시
- 피처드 배지
- 태그 표시
- 조회수/좋아요 수 표시

**사용 예시**:
```tsx
import NovelCard from '@/components/novel-card'

<NovelCard 
  item={{
    id: 1,
    title: "Autumn Reverie",
    description: "A heartwarming story...",
    image: "https://example.com/image.jpg",
    tags: ["romance", "slice-of-life"],
    rating: "4.5",
    viewCount: 12500,
    likeCount: 850,
    featured: true
  }}
  language="ko"
/>
```

---

### LanguageSelector
**위치**: `/components/language-selector.tsx`

**설명**: 언어 선택 드롭다운 컴포넌트

**기능**:
- 15개 언어 지원
- 현재 언어 표시
- 언어 변경 시 즉시 반영
- 국기 아이콘 표시

**지원 언어**:
- 한국어 (ko)
- 영어 (en)
- 일본어 (ja)
- 중국어 간체 (zh-CN)
- 중국어 번체 (zh-TW)
- 스페인어 (es)
- 프랑스어 (fr)
- 독일어 (de)
- 이탈리아어 (it)
- 포르투갈어 (pt)
- 러시아어 (ru)
- 아랍어 (ar)
- 힌디어 (hi)
- 태국어 (th)
- 베트남어 (vi)

**사용 예시**:
```tsx
import LanguageSelector from '@/components/language-selector'

<LanguageSelector />
```

---

### ThemeProvider
**위치**: `/components/theme-provider.tsx`

**설명**: 테마 관리를 위한 컨텍스트 프로바이더

**기능**:
- 라이트/다크 모드 지원
- 시스템 테마 감지
- 테마 상태 지속성 (localStorage)

**사용 예시**:
```tsx
import { ThemeProvider } from '@/components/theme-provider'

<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>
```

---

### ComingSoonModal
**위치**: `/components/coming-soon-modal.tsx`

**설명**: 개발 중인 기능에 대한 안내 모달

**기능**:
- 자동 표시/숨김
- 다국어 지원
- 쿠키 기반 재표시 방지

**사용 예시**:
```tsx
import ComingSoonModal from '@/components/coming-soon-modal'

<ComingSoonModal />
```

---

## 📄 페이지 컴포넌트

### Home
**위치**: `/pages/home.tsx`

**설명**: 메인 홈페이지 컴포넌트

**기능**:
- 비주얼 노벨 그리드 표시
- 장르별 필터링
- 드래그 스크롤 지원
- 무한 스크롤 (향후 구현 예정)
- 피처드 아이템 우선 표시

**주요 상태**:
```typescript
const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
const [items, setItems] = useState<Item[]>([])
const [loading, setLoading] = useState(true)
```

**사용 예시**:
```tsx
import Home from '@/pages/home'

<Home />
```

---

### Ranking
**위치**: `/pages/ranking.tsx`

**설명**: 랭킹 페이지 컴포넌트

**기능**:
- 순위별 아이템 표시
- 순위 변동 표시
- 주간 조회수 표시
- 정렬 옵션

**사용 예시**:
```tsx
import Ranking from '@/pages/ranking'

<Ranking />
```

---

### MyPage
**위치**: `/pages/my-page.tsx`

**설명**: 마이페이지 컴포넌트

**기능**:
- 사용자 프로필 표시
- 독서 통계
- 포인트 잔액
- 설정 옵션

**사용 예시**:
```tsx
import MyPage from '@/pages/my-page'

<MyPage />
```

---

## 🎣 커스텀 훅

### useLanguage
**위치**: `/hooks/use-language.tsx`

**설명**: 다국어 지원을 위한 훅

**반환값**:
```typescript
{
  language: string
  setLanguage: (language: string) => void
}
```

**사용 예시**:
```tsx
import { useLanguage } from '@/hooks/use-language'

const { language, setLanguage } = useLanguage()

// 현재 언어 확인
console.log(language) // 'ko'

// 언어 변경
setLanguage('en')
```

---

### useMobile
**위치**: `/hooks/use-mobile.tsx`

**설명**: 모바일 기기 감지를 위한 훅

**반환값**:
```typescript
boolean // 모바일 여부
```

**사용 예시**:
```tsx
import { useMobile } from '@/hooks/use-mobile'

const isMobile = useMobile()

return (
  <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
    {/* 컨텐츠 */}
  </div>
)
```

---

### useToast
**위치**: `/hooks/use-toast.ts`

**설명**: 토스트 알림을 위한 훅

**반환값**:
```typescript
{
  toast: (options: ToastOptions) => void
  dismiss: (toastId?: string) => void
}
```

**사용 예시**:
```tsx
import { useToast } from '@/hooks/use-toast'

const { toast } = useToast()

// 성공 메시지
toast({
  title: "성공",
  description: "작업이 완료되었습니다.",
  variant: "default"
})

// 오류 메시지
toast({
  title: "오류",
  description: "문제가 발생했습니다.",
  variant: "destructive"
})
```

---

### useAuth
**위치**: `/hooks/useAuth.ts`

**설명**: 사용자 인증 상태 관리 훅

**반환값**:
```typescript
{
  user: User | null
  loading: boolean
  login: () => void
  logout: () => void
}
```

**사용 예시**:
```tsx
import { useAuth } from '@/hooks/useAuth'

const { user, loading, login, logout } = useAuth()

if (loading) return <div>로딩 중...</div>

return (
  <div>
    {user ? (
      <div>
        <p>안녕하세요, {user.displayName}님!</p>
        <button onClick={logout}>로그아웃</button>
      </div>
    ) : (
      <button onClick={login}>로그인</button>
    )}
  </div>
)
```

---

## 🎨 스타일링 가이드

### Tailwind CSS 클래스 네이밍
```tsx
// 좋은 예시
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    제목
  </h1>
</div>

// 나쁜 예시
<div className="flex items-center justify-between p-4" style={{backgroundColor: 'white'}}>
  <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>
    제목
  </h1>
</div>
```

### 반응형 디자인
```tsx
// 모바일 우선 접근법
<div className="w-full md:w-1/2 lg:w-1/3">
  <div className="p-4 sm:p-6 md:p-8">
    <h2 className="text-lg sm:text-xl md:text-2xl">
      반응형 제목
    </h2>
  </div>
</div>
```

### 다크 모드 지원
```tsx
// 다크 모드 클래스 사용
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <p className="text-gray-600 dark:text-gray-300">
    다크 모드 지원 텍스트
  </p>
</div>
```

---

## 🔧 컴포넌트 개발 가이드

### 1. 새 컴포넌트 생성
```tsx
// components/my-component.tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * 내 컴포넌트 설명
 * @param variant - 컴포넌트 변형
 * @param size - 컴포넌트 크기
 */
const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        className={cn(
          'base-styles',
          {
            'variant-default': variant === 'default',
            'variant-secondary': variant === 'secondary',
            'size-sm': size === 'sm',
            'size-md': size === 'md',
            'size-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

MyComponent.displayName = 'MyComponent'

export default MyComponent
```

### 2. 타입 정의
```typescript
// types/component.ts
export interface ComponentProps {
  id: string
  title: string
  description?: string
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
}
```

### 3. 테스트 작성
```tsx
// __tests__/my-component.test.tsx
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/my-component'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent>Test content</MyComponent>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
```

---

## 🎯 모범 사례

### 1. 컴포넌트 구조
- **단일 책임 원칙**: 각 컴포넌트는 하나의 명확한 목적을 가져야 함
- **재사용성**: 재사용 가능한 컴포넌트로 설계
- **Props 타입 정의**: TypeScript 인터페이스로 Props 타입 명확히 정의

### 2. 성능 최적화
- **React.memo**: 불필요한 리렌더링 방지
- **useMemo/useCallback**: 복잡한 계산이나 함수 메모이제이션
- **지연 로딩**: 큰 컴포넌트는 React.lazy 사용

### 3. 접근성 (a11y)
- **키보드 네비게이션**: 모든 인터랙티브 요소에 키보드 접근 가능
- **스크린 리더**: ARIA 속성 적절히 사용
- **색상 대비**: 충분한 색상 대비 비율 유지

### 4. 국제화 (i18n)
- **텍스트 하드코딩 금지**: 모든 텍스트는 번역 함수 사용
- **날짜/숫자 형식**: 지역별 형식 지원
- **RTL 지원**: 아랍어 등 우->좌 언어 지원

---

## 🚀 확장 가능성

### React Native 대응
현재 웹 컴포넌트들은 React Native로 확장 가능하도록 설계되었습니다:

```tsx
// 웹과 네이티브 공통 인터페이스
interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
}

// 웹 구현
export const Button: React.FC<ButtonProps> = ({ title, onPress, variant }) => (
  <button 
    onClick={onPress}
    className={cn('btn', `btn-${variant}`)}
  >
    {title}
  </button>
)

// React Native 구현 (향후)
export const Button: React.FC<ButtonProps> = ({ title, onPress, variant }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[styles.button, styles[variant]]}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
)
```

---

이 문서는 프로젝트의 성장과 함께 지속적으로 업데이트됩니다. 새로운 컴포넌트가 추가되거나 기존 컴포넌트가 수정될 때마다 관련 문서도 함께 갱신됩니다.