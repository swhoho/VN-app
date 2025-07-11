# 📚 문서 센터

비주얼 노벨 플랫폼 프로젝트의 모든 문서를 한 곳에서 찾을 수 있습니다.

## 📋 문서 목록

### 🏠 [프로젝트 개요 (README.md)](../README.md)
- 프로젝트 소개 및 개요
- 빠른 시작 가이드
- 주요 기능 소개
- 기술 스택 및 아키텍처

### 🔌 [API 문서 (API.md)](./API.md)
- REST API 엔드포인트 명세
- 인증 및 보안 가이드
- 요청/응답 예시
- 오류 처리 및 상태 코드

### 🧩 [컴포넌트 문서 (COMPONENTS.md)](./COMPONENTS.md)
- React 컴포넌트 사용 가이드
- UI 컴포넌트 라이브러리
- 커스텀 훅 문서
- 컴포넌트 개발 가이드

### 🗄️ [데이터베이스 문서 (DATABASE.md)](./DATABASE.md)
- 데이터베이스 스키마 설계
- 테이블 구조 및 관계
- 데이터 조작 예시
- 마이그레이션 가이드

### 🚀 [배포 가이드 (DEPLOYMENT.md)](./DEPLOYMENT.md)
- 개발 환경 설정
- 프로덕션 배포 방법
- 플랫폼별 배포 가이드
- CI/CD 파이프라인

### 🌍 [다국어 지원 가이드 (INTERNATIONALIZATION.md)](./INTERNATIONALIZATION.md)
- 15개 언어 지원 시스템
- 번역 관리 및 추가 방법
- 지역화 고려사항
- 번역 품질 관리

---

## 🎯 문서 사용법

### 개발자를 위한 가이드
1. **처음 시작**: [README.md](../README.md)로 프로젝트 개요 파악
2. **개발 환경 설정**: [DEPLOYMENT.md](./DEPLOYMENT.md)의 로컬 환경 설정 섹션
3. **컴포넌트 개발**: [COMPONENTS.md](./COMPONENTS.md)의 개발 가이드
4. **API 연동**: [API.md](./API.md)의 엔드포인트 명세

### 기획자/디자이너를 위한 가이드
1. **프로젝트 이해**: [README.md](../README.md)의 기능 소개
2. **UI 컴포넌트**: [COMPONENTS.md](./COMPONENTS.md)의 UI 컴포넌트 섹션
3. **다국어 지원**: [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md)의 지원 언어 목록

### 운영자를 위한 가이드
1. **배포 및 운영**: [DEPLOYMENT.md](./DEPLOYMENT.md)의 프로덕션 배포
2. **데이터베이스 관리**: [DATABASE.md](./DATABASE.md)의 데이터 관리
3. **API 모니터링**: [API.md](./API.md)의 모니터링 섹션

---

## 📝 문서 업데이트 정책

### 업데이트 주기
- **주요 기능 추가**: 즉시 업데이트
- **마이너 변경사항**: 주간 업데이트
- **정기 점검**: 월간 전체 문서 검토

### 버전 관리
- 문서 버전은 프로젝트 버전과 동기화
- 중요한 변경사항은 변경 로그 기록
- 이전 버전 문서는 `docs/archive/` 디렉토리에 보관

---

## 🔍 문서 검색 및 네비게이션

### 빠른 검색
- **API 엔드포인트**: `GET /api/items` 등의 키워드로 검색
- **컴포넌트**: `Button`, `Card` 등의 컴포넌트명으로 검색
- **데이터베이스**: 테이블명이나 필드명으로 검색
- **다국어**: 언어 코드나 번역 키로 검색

### 문서 간 링크
- 관련 문서들은 상호 링크로 연결
- 코드 예시에서 관련 문서로 직접 이동
- 용어집 및 색인 제공

---

## 💡 문서 작성 가이드

### 마크다운 규칙
```markdown
# 제목 1 (H1) - 문서 제목
## 제목 2 (H2) - 주요 섹션
### 제목 3 (H3) - 하위 섹션
#### 제목 4 (H4) - 세부 내용

**굵은 글씨**: 중요한 용어나 강조
*기울임*: 매개변수나 변수명
`코드`: 인라인 코드
```

### 코드 블록
```typescript
// TypeScript 코드 예시
interface ExampleInterface {
  id: number
  name: string
}
```

```bash
# 터미널 명령어
npm install
npm run dev
```

### 이모지 사용
- 📋 개요/목록
- 🔧 설정/도구
- 🚀 배포/성능
- 🔐 보안/인증
- 📊 데이터/통계
- 🌍 국제화/다국어
- 💡 팁/참고사항
- ⚠️ 주의사항
- ✅ 완료/성공
- ❌ 실패/오류

---

## 🤝 문서 기여 방법

### 기여 절차
1. **이슈 생성**: 문서 개선 제안이나 오류 리포트
2. **브랜치 생성**: `docs/feature-name` 형태로 브랜치 생성
3. **문서 작성**: 마크다운 가이드라인 준수
4. **검토 요청**: Pull Request 생성
5. **피드백 반영**: 리뷰 코멘트 반영
6. **병합**: 승인 후 main 브랜치에 병합

### 문서 작성 체크리스트
- [ ] 제목과 목차가 명확한가?
- [ ] 코드 예시가 정확하고 실행 가능한가?
- [ ] 스크린샷이나 다이어그램이 필요한가?
- [ ] 관련 문서들과 링크가 연결되어 있는가?
- [ ] 맞춤법과 문법이 정확한가?
- [ ] 용어 사용이 일관성 있는가?

---

## 📊 문서 통계

### 현재 문서 현황
- **총 문서 수**: 6개
- **총 페이지 수**: 약 200+ 페이지
- **마지막 업데이트**: 2024년 1월
- **언어**: 한국어 (추후 다국어 지원 예정)

### 문서별 상세 정보
| 문서 | 페이지 수 | 섹션 수 | 코드 예시 | 마지막 업데이트 |
|------|-----------|---------|-----------|-----------------|
| README.md | 25 | 12 | 15 | 2024-01-15 |
| API.md | 35 | 8 | 25 | 2024-01-15 |
| COMPONENTS.md | 45 | 15 | 35 | 2024-01-15 |
| DATABASE.md | 40 | 12 | 30 | 2024-01-15 |
| DEPLOYMENT.md | 35 | 10 | 20 | 2024-01-15 |
| INTERNATIONALIZATION.md | 30 | 9 | 15 | 2024-01-15 |

---

## 🔗 외부 리소스

### 참고 문서
- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Drizzle ORM 문서](https://orm.drizzle.team/)

### 도구 및 라이브러리
- [Radix UI](https://radix-ui.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Query](https://tanstack.com/query/latest)

### 커뮤니티
- [GitHub Discussions](https://github.com/your-repo/discussions)
- [Discord 서버](https://discord.gg/your-server)
- [개발자 블로그](https://blog.example.com)

---

## 📞 문의 및 지원

### 문서 관련 문의
- **이슈 트래커**: GitHub Issues
- **이메일**: docs@example.com
- **Discord**: #docs 채널

### 기술 지원
- **개발 문의**: GitHub Discussions
- **버그 리포트**: GitHub Issues
- **기능 요청**: GitHub Issues with enhancement label

---

**📚 모든 문서는 MIT 라이선스 하에 제공되며, 프로젝트와 함께 지속적으로 업데이트됩니다.**