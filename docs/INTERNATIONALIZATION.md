# 다국어 지원 가이드 (국제화 i18n)

## 📋 개요

비주얼 노벨 플랫폼은 15개 언어를 지원하는 다국어 시스템을 구축하고 있습니다. 이 문서는 다국어 지원 시스템의 구조, 새로운 언어 추가 방법, 번역 관리 방법을 설명합니다.

## 🌍 지원 언어

### 현재 지원 언어 (15개)
| 언어 | 언어 코드 | 로케일 | 상태 |
|------|-----------|---------|------|
| 한국어 | `ko` | ko-KR | ✅ 완료 |
| 영어 | `en` | en-US | ✅ 완료 |
| 일본어 | `ja` | ja-JP | ✅ 완료 |
| 중국어 (간체) | `zh-CN` | zh-CN | ✅ 완료 |
| 중국어 (번체) | `zh-TW` | zh-TW | ✅ 완료 |
| 스페인어 | `es` | es-ES | ✅ 완료 |
| 프랑스어 | `fr` | fr-FR | ✅ 완료 |
| 독일어 | `de` | de-DE | ✅ 완료 |
| 이탈리아어 | `it` | it-IT | ✅ 완료 |
| 포르투갈어 | `pt` | pt-BR | ✅ 완료 |
| 러시아어 | `ru` | ru-RU | ✅ 완료 |
| 아랍어 | `ar` | ar-SA | ✅ 완료 |
| 힌디어 | `hi` | hi-IN | ✅ 완료 |
| 태국어 | `th` | th-TH | ✅ 완료 |
| 베트남어 | `vi` | vi-VN | ✅ 완료 |

---

## 🏗️ 다국어 시스템 구조

### 파일 구조
```
client/src/
├── hooks/
│   └── use-language.tsx     # 언어 상태 관리 훅
├── lib/
│   └── i18n.ts             # 다국어 데이터 및 유틸리티
└── components/
    └── language-selector.tsx # 언어 선택 컴포넌트
```

### 핵심 컴포넌트

#### 1. 언어 상태 관리 (`use-language.tsx`)
```typescript
interface LanguageContextType {
  language: string
  setLanguage: (language: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ko',
  setLanguage: () => {}
})

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
```

#### 2. 번역 데이터 (`i18n.ts`)
```typescript
interface TranslationData {
  [key: string]: string
}

interface Translations {
  [language: string]: TranslationData
}

export const translations: Translations = {
  ko: {
    'nav.home': '홈',
    'nav.ranking': '랭킹',
    'nav.search': '검색',
    'nav.myPage': '마이페이지',
    // ... 더 많은 번역
  },
  en: {
    'nav.home': 'Home',
    'nav.ranking': 'Ranking',
    'nav.search': 'Search',
    'nav.myPage': 'My Page',
    // ... 더 많은 번역
  }
  // ... 다른 언어들
}
```

---

## 🔧 다국어 시스템 사용법

### 1. 컴포넌트에서 번역 사용
```tsx
import { useLanguage } from '@/hooks/use-language'
import { getTranslation } from '@/lib/i18n'

const MyComponent = () => {
  const { language } = useLanguage()
  
  return (
    <div>
      <h1>{getTranslation(language, 'page.title')}</h1>
      <p>{getTranslation(language, 'page.description')}</p>
    </div>
  )
}
```

### 2. 언어 변경
```tsx
import { useLanguage } from '@/hooks/use-language'

const LanguageButton = () => {
  const { language, setLanguage } = useLanguage()
  
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
  }
  
  return (
    <button onClick={() => handleLanguageChange('en')}>
      English
    </button>
  )
}
```

### 3. 아이템별 다국어 제목/설명
```tsx
import { getItemTranslation } from '@/lib/i18n'

const NovelCard = ({ item, language }) => {
  const title = getItemTranslation(language, item.id, 'title') || item.title
  const description = getItemTranslation(language, item.id, 'description') || item.description
  
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
```

---

## 📝 번역 키 명명 규칙

### 네임스페이스 구조
```
카테고리.섹션.요소.속성
```

### 예시
```typescript
const translationKeys = {
  // 네비게이션
  'nav.home': '홈',
  'nav.ranking': '랭킹',
  'nav.search': '검색',
  'nav.myPage': '마이페이지',
  
  // 버튼
  'btn.login': '로그인',
  'btn.logout': '로그아웃',
  'btn.submit': '제출',
  'btn.cancel': '취소',
  
  // 폼
  'form.email.label': '이메일',
  'form.email.placeholder': '이메일을 입력하세요',
  'form.password.label': '비밀번호',
  'form.password.placeholder': '비밀번호를 입력하세요',
  
  // 메시지
  'msg.success.login': '로그인에 성공했습니다',
  'msg.error.login': '로그인에 실패했습니다',
  'msg.error.network': '네트워크 오류가 발생했습니다',
  
  // 장르
  'genre.romance': '로맨스',
  'genre.horror': '호러',
  'genre.scifi': 'SF',
  'genre.fantasy': '판타지',
  
  // 페이지
  'page.home.title': '홈',
  'page.home.description': '다양한 비주얼 노벨을 만나보세요',
  'page.ranking.title': '랭킹',
  'page.ranking.description': '인기 있는 작품들을 확인하세요'
}
```

---

## 🌐 새로운 언어 추가

### 1. 언어 코드 추가
```typescript
// lib/i18n.ts
export const supportedLanguages = [
  'ko', 'en', 'ja', 'zh-CN', 'zh-TW', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ar', 'hi', 'th', 'vi',
  'sv' // 새로운 언어: 스웨덴어
] as const

export type SupportedLanguage = typeof supportedLanguages[number]
```

### 2. 번역 데이터 추가
```typescript
// lib/i18n.ts
export const translations: Translations = {
  // 기존 언어들...
  
  sv: { // 스웨덴어 추가
    'nav.home': 'Hem',
    'nav.ranking': 'Ranking',
    'nav.search': 'Sök',
    'nav.myPage': 'Min sida',
    'btn.login': 'Logga in',
    'btn.logout': 'Logga ut',
    'genre.romance': 'Romantik',
    'genre.horror': 'Skräck',
    'genre.scifi': 'Science Fiction',
    'genre.fantasy': 'Fantasy',
    // ... 모든 키에 대한 번역 추가
  }
}
```

### 3. 언어 메타데이터 추가
```typescript
// lib/i18n.ts
export const languageInfo = {
  // 기존 언어들...
  
  sv: {
    name: 'Svenska',
    nativeName: 'Svenska',
    flag: '🇸🇪',
    rtl: false,
    dateFormat: 'YYYY-MM-DD',
    numberFormat: {
      decimal: ',',
      thousand: ' '
    }
  }
}
```

### 4. 언어 선택기 업데이트
```typescript
// components/language-selector.tsx
const languages = [
  // 기존 언어들...
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' }
]
```

---

## 🔄 번역 관리 워크플로우

### 1. 번역 키 추출
```bash
# 새로운 번역 키 찾기
grep -r "getTranslation" client/src --include="*.tsx" --include="*.ts" | grep -o "'[^']*'" | sort | uniq
```

### 2. 번역 완성도 확인
```typescript
// scripts/check-translations.ts
import { translations, supportedLanguages } from '../client/src/lib/i18n'

const checkTranslationCompleteness = () => {
  const baseLanguage = 'ko'
  const baseKeys = Object.keys(translations[baseLanguage])
  
  supportedLanguages.forEach(lang => {
    if (lang === baseLanguage) return
    
    const langKeys = Object.keys(translations[lang] || {})
    const missingKeys = baseKeys.filter(key => !langKeys.includes(key))
    
    if (missingKeys.length > 0) {
      console.log(`${lang}: ${missingKeys.length} missing keys`)
      missingKeys.forEach(key => console.log(`  - ${key}`))
    }
  })
}

checkTranslationCompleteness()
```

### 3. 번역 검증
```typescript
// scripts/validate-translations.ts
const validateTranslations = () => {
  supportedLanguages.forEach(lang => {
    const langTranslations = translations[lang] || {}
    
    Object.entries(langTranslations).forEach(([key, value]) => {
      // 빈 번역 확인
      if (!value || value.trim() === '') {
        console.log(`${lang}: Empty translation for key "${key}"`)
      }
      
      // 플레이스홀더 일치 확인
      const placeholders = key.match(/\{[^}]+\}/g) || []
      const valuePlaceholders = value.match(/\{[^}]+\}/g) || []
      
      if (placeholders.length !== valuePlaceholders.length) {
        console.log(`${lang}: Placeholder mismatch for key "${key}"`)
      }
    })
  })
}
```

---

## 🎨 UI 다국어 고려사항

### 1. 텍스트 길이 변화
```css
/* 다국어 텍스트 길이 대응 */
.button {
  min-width: 100px;
  padding: 8px 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navigation-item {
  flex: 1;
  text-align: center;
}
```

### 2. RTL (Right-to-Left) 언어 지원
```css
/* 아랍어 등 RTL 언어 지원 */
[dir="rtl"] .container {
  direction: rtl;
  text-align: right;
}

[dir="rtl"] .navigation {
  flex-direction: row-reverse;
}
```

### 3. 폰트 지원
```css
/* 다국어 폰트 스택 */
.text-base {
  font-family: 
    /* 한국어 */
    'Noto Sans KR',
    /* 일본어 */
    'Noto Sans JP',
    /* 중국어 */
    'Noto Sans SC',
    'Noto Sans TC',
    /* 아랍어 */
    'Noto Sans Arabic',
    /* 힌디어 */
    'Noto Sans Devanagari',
    /* 태국어 */
    'Noto Sans Thai',
    /* 기본 */
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}
```

---

## 📊 아이템별 다국어 콘텐츠 관리

### 1. 데이터 구조
```typescript
// lib/i18n.ts
export const itemTranslations = {
  1: { // 아이템 ID
    ko: {
      title: '가을의 회상',
      description: '사랑과 우정에 대한 따뜻한 이야기'
    },
    en: {
      title: 'Autumn Reverie',
      description: 'A heartwarming story about love and friendship'
    },
    ja: {
      title: '秋の追憶',
      description: '愛と友情についての心温まる物語'
    }
    // ... 다른 언어들
  },
  2: {
    ko: {
      title: '미스터리 저택',
      description: '유령이 나오는 저택의 비밀을 밝혀보세요'
    },
    en: {
      title: 'Mystery Manor',
      description: 'Uncover the secrets of the haunted mansion'
    },
    ja: {
      title: 'ミステリーマンション',
      description: '幽霊屋敷の秘密を解き明かそう'
    }
    // ... 다른 언어들
  }
}
```

### 2. 번역 유틸리티 함수
```typescript
// lib/i18n.ts
export const getItemTranslation = (
  language: string,
  itemId: number,
  field: 'title' | 'description'
): string | null => {
  const item = itemTranslations[itemId]
  if (!item) return null
  
  const translation = item[language]
  if (!translation) return null
  
  return translation[field] || null
}
```

### 3. 사용 예시
```tsx
const NovelCard = ({ item, language }) => {
  const getTitle = () => {
    const translation = getItemTranslation(language, item.id, 'title')
    return translation || item.title
  }
  
  const getDescription = () => {
    const translation = getItemTranslation(language, item.id, 'description')
    return translation || item.description
  }
  
  return (
    <div>
      <h3>{getTitle()}</h3>
      <p>{getDescription()}</p>
    </div>
  )
}
```

---

## 🏷️ 태그 및 장르 다국어 지원

### 1. 태그 번역 데이터
```typescript
// lib/i18n.ts
export const tagTranslations = {
  romance: {
    ko: '로맨스',
    en: 'Romance',
    ja: 'ロマンス',
    'zh-CN': '浪漫',
    'zh-TW': '浪漫',
    es: 'Romance',
    fr: 'Romance',
    de: 'Romantik',
    it: 'Romantico',
    pt: 'Romance',
    ru: 'Романтика',
    ar: 'رومانسي',
    hi: 'रोमांस',
    th: 'โรแมนติก',
    vi: 'Lãng mạn'
  },
  horror: {
    ko: '호러',
    en: 'Horror',
    ja: 'ホラー',
    'zh-CN': '恐怖',
    'zh-TW': '恐怖',
    es: 'Terror',
    fr: 'Horreur',
    de: 'Horror',
    it: 'Horror',
    pt: 'Terror',
    ru: 'Ужасы',
    ar: 'رعب',
    hi: 'डरावना',
    th: 'สยองขวัญ',
    vi: 'Kinh dị'
  },
  scifi: {
    ko: 'SF',
    en: 'Sci-Fi',
    ja: 'SF',
    'zh-CN': '科幻',
    'zh-TW': '科幻',
    es: 'Ciencia Ficción',
    fr: 'Science-Fiction',
    de: 'Science-Fiction',
    it: 'Fantascienza',
    pt: 'Ficção Científica',
    ru: 'Фантастика',
    ar: 'خيال علمي',
    hi: 'विज्ञान कथा',
    th: 'ไซไฟ',
    vi: 'Khoa học viễn tưởng'
  },
  fantasy: {
    ko: '판타지',
    en: 'Fantasy',
    ja: 'ファンタジー',
    'zh-CN': '奇幻',
    'zh-TW': '奇幻',
    es: 'Fantasía',
    fr: 'Fantasy',
    de: 'Fantasy',
    it: 'Fantasy',
    pt: 'Fantasia',
    ru: 'Фэнтези',
    ar: 'خيال',
    hi: 'कल्पना',
    th: 'แฟนตาซี',
    vi: 'Giả tưởng'
  }
}
```

### 2. 태그 번역 유틸리티
```typescript
// lib/i18n.ts
export const getTagTranslation = (
  language: string,
  tag: string
): string => {
  const tagTranslation = tagTranslations[tag]
  if (!tagTranslation) return tag
  
  return tagTranslation[language] || tag
}
```

### 3. 사용 예시
```tsx
const TagList = ({ tags, language }) => {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <span key={tag} className="tag">
          {getTagTranslation(language, tag)}
        </span>
      ))}
    </div>
  )
}
```

---

## 🔧 개발 도구 및 스크립트

### 1. 번역 추출 스크립트
```bash
#!/bin/bash
# scripts/extract-translations.sh

echo "번역 키 추출 중..."

# TypeScript/TSX 파일에서 번역 키 추출
grep -r "getTranslation\|getItemTranslation\|getTagTranslation" client/src \
  --include="*.tsx" --include="*.ts" \
  | grep -o "'[^']*'" \
  | sort \
  | uniq > translation-keys.txt

echo "추출된 번역 키: $(wc -l < translation-keys.txt)개"
```

### 2. 번역 완성도 리포트
```typescript
// scripts/translation-report.ts
import { translations, supportedLanguages } from '../client/src/lib/i18n'

const generateReport = () => {
  const baseLanguage = 'ko'
  const baseKeys = Object.keys(translations[baseLanguage])
  const report = []
  
  supportedLanguages.forEach(lang => {
    if (lang === baseLanguage) return
    
    const langKeys = Object.keys(translations[lang] || {})
    const completed = langKeys.length
    const total = baseKeys.length
    const percentage = Math.round((completed / total) * 100)
    
    report.push({
      language: lang,
      completed,
      total,
      percentage,
      missing: total - completed
    })
  })
  
  // 완성도 순으로 정렬
  report.sort((a, b) => b.percentage - a.percentage)
  
  console.table(report)
}

generateReport()
```

### 3. 번역 동기화 스크립트
```typescript
// scripts/sync-translations.ts
import fs from 'fs'
import { translations, supportedLanguages } from '../client/src/lib/i18n'

const syncTranslations = () => {
  const baseLanguage = 'ko'
  const baseKeys = Object.keys(translations[baseLanguage])
  
  supportedLanguages.forEach(lang => {
    if (lang === baseLanguage) return
    
    const langTranslations = translations[lang] || {}
    const missingKeys = baseKeys.filter(key => !langTranslations[key])
    
    if (missingKeys.length > 0) {
      console.log(`${lang}: ${missingKeys.length} missing keys`)
      
      // 누락된 키에 대해 기본값 추가
      missingKeys.forEach(key => {
        langTranslations[key] = `[${lang}] ${translations[baseLanguage][key]}`
      })
      
      // 파일 업데이트
      translations[lang] = langTranslations
    }
  })
  
  // 업데이트된 번역 파일 저장
  const output = `export const translations = ${JSON.stringify(translations, null, 2)}`
  fs.writeFileSync('client/src/lib/i18n-generated.ts', output)
}

syncTranslations()
```

---

## 🌍 지역화 (Localization) 고려사항

### 1. 날짜 형식
```typescript
// lib/date-format.ts
export const formatDate = (date: Date, language: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  
  return new Intl.DateTimeFormat(getLocale(language), options).format(date)
}

const getLocale = (language: string): string => {
  const localeMap = {
    ko: 'ko-KR',
    en: 'en-US',
    ja: 'ja-JP',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    pt: 'pt-BR',
    ru: 'ru-RU',
    ar: 'ar-SA',
    hi: 'hi-IN',
    th: 'th-TH',
    vi: 'vi-VN'
  }
  
  return localeMap[language] || 'en-US'
}
```

### 2. 숫자 형식
```typescript
// lib/number-format.ts
export const formatNumber = (number: number, language: string): string => {
  return new Intl.NumberFormat(getLocale(language)).format(number)
}

export const formatCurrency = (amount: number, language: string): string => {
  const currencyMap = {
    ko: 'KRW',
    en: 'USD',
    ja: 'JPY',
    'zh-CN': 'CNY',
    'zh-TW': 'TWD',
    es: 'EUR',
    fr: 'EUR',
    de: 'EUR',
    it: 'EUR',
    pt: 'BRL',
    ru: 'RUB',
    ar: 'SAR',
    hi: 'INR',
    th: 'THB',
    vi: 'VND'
  }
  
  return new Intl.NumberFormat(getLocale(language), {
    style: 'currency',
    currency: currencyMap[language] || 'USD'
  }).format(amount)
}
```

### 3. 시간대 처리
```typescript
// lib/timezone.ts
export const formatDateTime = (date: Date, language: string): string => {
  const timezone = getTimezone(language)
  
  return new Intl.DateTimeFormat(getLocale(language), {
    timeZone: timezone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getTimezone = (language: string): string => {
  const timezoneMap = {
    ko: 'Asia/Seoul',
    en: 'America/New_York',
    ja: 'Asia/Tokyo',
    'zh-CN': 'Asia/Shanghai',
    'zh-TW': 'Asia/Taipei',
    es: 'Europe/Madrid',
    fr: 'Europe/Paris',
    de: 'Europe/Berlin',
    it: 'Europe/Rome',
    pt: 'America/Sao_Paulo',
    ru: 'Europe/Moscow',
    ar: 'Asia/Riyadh',
    hi: 'Asia/Kolkata',
    th: 'Asia/Bangkok',
    vi: 'Asia/Ho_Chi_Minh'
  }
  
  return timezoneMap[language] || 'UTC'
}
```

---

## 🔍 테스트 및 품질 관리

### 1. 번역 테스트
```typescript
// tests/i18n.test.ts
import { getTranslation, supportedLanguages } from '../client/src/lib/i18n'

describe('i18n', () => {
  const testKeys = ['nav.home', 'nav.ranking', 'btn.login', 'btn.logout']
  
  test('모든 언어에 대해 번역이 존재해야 함', () => {
    supportedLanguages.forEach(lang => {
      testKeys.forEach(key => {
        const translation = getTranslation(lang, key)
        expect(translation).toBeDefined()
        expect(translation).not.toBe('')
      })
    })
  })
  
  test('번역 키가 자기 자신을 반환하지 않아야 함', () => {
    supportedLanguages.forEach(lang => {
      testKeys.forEach(key => {
        const translation = getTranslation(lang, key)
        expect(translation).not.toBe(key)
      })
    })
  })
})
```

### 2. UI 테스트
```typescript
// tests/language-selector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { LanguageProvider } from '../client/src/hooks/use-language'
import LanguageSelector from '../client/src/components/language-selector'

describe('LanguageSelector', () => {
  test('언어 변경이 정상적으로 작동해야 함', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    )
    
    const selector = screen.getByRole('combobox')
    fireEvent.click(selector)
    
    const englishOption = screen.getByText('English')
    fireEvent.click(englishOption)
    
    expect(selector).toHaveDisplayValue('English')
  })
})
```

---

## 📈 성능 최적화

### 1. 번역 데이터 지연 로딩
```typescript
// lib/i18n-lazy.ts
const translationCache = new Map<string, any>()

export const loadTranslations = async (language: string) => {
  if (translationCache.has(language)) {
    return translationCache.get(language)
  }
  
  try {
    const translations = await import(`./translations/${language}.json`)
    translationCache.set(language, translations.default)
    return translations.default
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error)
    return {}
  }
}
```

### 2. 번역 함수 메모이제이션
```typescript
// lib/i18n.ts
import { useMemo } from 'react'

export const useTranslation = (language: string) => {
  const translate = useMemo(() => {
    return (key: string, params?: Record<string, any>) => {
      let translation = getTranslation(language, key)
      
      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          translation = translation.replace(`{${param}}`, value)
        })
      }
      
      return translation
    }
  }, [language])
  
  return translate
}
```

---

## 🚀 향후 계획

### 1. 추가 언어 지원
- 네덜란드어 (nl)
- 스웨덴어 (sv)
- 노르웨이어 (no)
- 덴마크어 (da)
- 핀란드어 (fi)

### 2. 번역 관리 도구
- 번역 관리 대시보드
- 번역자 협업 도구
- 자동 번역 API 연동

### 3. 고급 지역화 기능
- 지역별 콘텐츠 필터링
- 현지화된 이미지 및 미디어
- 문화적 맥락 고려한 콘텐츠

---

## 🤝 기여 가이드

### 번역 기여 방법
1. 번역이 필요한 언어 확인
2. 번역 키 파일 생성
3. 번역 작업 수행
4. 테스트 및 검증
5. Pull Request 제출

### 번역 품질 가이드라인
- 자연스러운 현지 언어 사용
- 문화적 맥락 고려
- 일관된 용어 사용
- 적절한 길이 유지

---

이 문서는 다국어 지원 시스템이 발전함에 따라 지속적으로 업데이트됩니다. 새로운 언어 추가나 기능 개선 사항이 있을 때마다 관련 내용을 반영합니다.