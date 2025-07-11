# 배포 가이드

## 📋 개요

이 문서는 비주얼 노벨 플랫폼을 다양한 환경에 배포하는 방법을 설명합니다. 개발 환경 설정부터 프로덕션 배포까지 전체 과정을 다룹니다.

## 🔧 개발 환경 설정

### 필수 요구사항
- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상 (또는 yarn 1.22.0 이상)
- **Git**: 2.30.0 이상
- **SQLite**: 3.35.0 이상 (내장)

### 권장 도구
- **Visual Studio Code**: 개발 IDE
- **Chrome DevTools**: 디버깅
- **Postman**: API 테스트

---

## 🏗️ 로컬 개발 환경 설정

### 1. 프로젝트 클론
```bash
# 저장소 클론
git clone https://github.com/your-username/VN-app.git
cd VN-app

# 브랜치 확인
git branch -a
git checkout main
```

### 2. 의존성 설치
```bash
# NPM 사용
npm install

# 또는 Yarn 사용
yarn install
```

### 3. 환경 변수 설정
```bash
# .env 파일 생성
cp .env.example .env

# 환경 변수 설정 (.env 파일 편집)
NODE_ENV=development
DATABASE_PATH=./database.db
SESSION_SECRET=your-session-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**환경 변수 설명**:
- `NODE_ENV`: 실행 환경 (development, production)
- `DATABASE_PATH`: SQLite 데이터베이스 파일 경로
- `SESSION_SECRET`: 세션 암호화 키 (32자 이상 랜덤 문자열)
- `GOOGLE_CLIENT_ID`: Google OAuth 클라이언트 ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth 클라이언트 시크릿

### 4. 데이터베이스 설정
```bash
# 데이터베이스 스키마 생성
npm run db:generate

# 데이터베이스 마이그레이션 적용
npm run db:push

# 샘플 데이터 시드 (선택사항)
npm run db:seed
```

### 5. 개발 서버 실행
```bash
# 개발 서버 시작
npm run dev

# 또는 분리 실행
npm run dev:client    # 클라이언트만
npm run dev:server    # 서버만
```

### 6. 개발 환경 확인
```bash
# 브라우저에서 확인
http://localhost:3000

# API 확인
http://localhost:3000/api/items
http://localhost:3000/api/rankings
```

---

## 🔐 Google OAuth 설정

### Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "OAuth 동의 화면" 설정
4. "API 및 서비스" > "사용자 인증 정보" > "OAuth 2.0 클라이언트 ID" 생성

### OAuth 클라이언트 설정
```javascript
// 승인된 JavaScript 출처
http://localhost:3000
https://yourdomain.com

// 승인된 리디렉션 URI
http://localhost:3000/api/auth/google/callback
https://yourdomain.com/api/auth/google/callback
```

### 환경 변수 업데이트
```bash
# .env 파일에 Google OAuth 정보 추가
GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
```

---

## 🏭 프로덕션 빌드

### 1. 프로덕션 환경 변수 설정
```bash
# .env.production 파일 생성
NODE_ENV=production
DATABASE_PATH=/var/lib/vn-app/database.db
SESSION_SECRET=your-production-session-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PORT=3000
```

### 2. 애플리케이션 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 확인
ls -la dist/
```

### 3. 프로덕션 서버 실행
```bash
# 프로덕션 서버 시작
npm start

# 또는 PM2 사용
pm2 start npm --name "vn-app" -- start
```

### 4. 빌드 최적화
```bash
# 빌드 크기 분석
npm run build -- --analyze

# 타입 검사
npm run check

# 테스트 실행
npm test
```

---

## 🌐 배포 플랫폼별 가이드

### 1. Replit 배포 (현재 설정)

**설정 파일**: `replit.nix`
```nix
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.sqlite
  ];
}
```

**실행 명령어**: `.replit`
```toml
modules = ["nodejs-18"]
run = "npm run dev"

[deployment]
run = ["sh", "-c", "npm run build && npm start"]
```

**배포 단계**:
1. Replit에서 프로젝트 import
2. 환경 변수 설정 (Secrets 탭)
3. "Deploy" 버튼 클릭
4. 배포 URL 확인

---

### 2. Vercel 배포

**설정 파일**: `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "client/dist/$1"
    }
  ]
}
```

**배포 단계**:
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 배포
vercel

# 프로덕션 배포
vercel --prod
```

---

### 3. Netlify 배포

**설정 파일**: `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Netlify Functions 설정**:
```javascript
// netlify/functions/api.js
const express = require('express');
const serverless = require('serverless-http');
const app = require('../../server/index');

module.exports.handler = serverless(app);
```

---

### 4. Railway 배포

**설정 파일**: `railway.toml`
```toml
[build]
  builder = "nixpacks"

[deploy]
  startCommand = "npm start"
  restartPolicyType = "on-failure"
  restartPolicyMaxRetries = 10
```

**배포 단계**:
```bash
# Railway CLI 설치
npm install -g @railway/cli

# 프로젝트 배포
railway login
railway init
railway up
```

---

### 5. DigitalOcean App Platform 배포

**설정 파일**: `.do/app.yaml`
```yaml
name: vn-app
services:
- name: web
  source_dir: /
  github:
    repo: your-username/VN-app
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_PATH
    value: /var/lib/vn-app/database.db
```

---

## 🐳 Docker 컨테이너 배포

### Dockerfile 작성
```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# 의존성 설치
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 빌드 단계
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 프로덕션 단계
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

### Docker Compose 설정
```yaml
# docker-compose.yml
version: '3.8'

services:
  vn-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_PATH=/app/data/database.db
    volumes:
      - ./data:/app/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - vn-app
    restart: unless-stopped
```

### Docker 명령어
```bash
# 이미지 빌드
docker build -t vn-app .

# 컨테이너 실행
docker run -p 3000:3000 -e NODE_ENV=production vn-app

# Docker Compose 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f vn-app
```

---

## 🔒 보안 설정

### 1. 환경 변수 보안
```bash
# 강력한 세션 시크릿 생성
openssl rand -base64 32

# 환경 변수 파일 권한 설정
chmod 600 .env
```

### 2. HTTPS 설정
```javascript
// server/index.ts
import https from 'https';
import fs from 'fs';

if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync('/path/to/private-key.pem'),
    cert: fs.readFileSync('/path/to/certificate.pem')
  };
  
  https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
}
```

### 3. Nginx 리버스 프록시
```nginx
# nginx.conf
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/nginx/ssl/certificate.pem;
    ssl_certificate_key /etc/nginx/ssl/private-key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📊 모니터링 및 로깅

### 1. PM2 프로세스 관리
```bash
# PM2 설치
npm install -g pm2

# 애플리케이션 실행
pm2 start npm --name "vn-app" -- start

# 모니터링
pm2 monit

# 로그 확인
pm2 logs vn-app

# 자동 재시작 설정
pm2 startup
pm2 save
```

### 2. 로그 설정
```javascript
// server/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

### 3. 헬스체크 엔드포인트
```javascript
// server/routes.ts
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

---

## 🚀 성능 최적화

### 1. 캐싱 전략
```javascript
// server/cache.ts
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10분 TTL

export const getCachedData = (key: string, fetchFn: () => Promise<any>) => {
  const cached = cache.get(key);
  if (cached) {
    return Promise.resolve(cached);
  }
  
  return fetchFn().then(data => {
    cache.set(key, data);
    return data;
  });
};
```

### 2. 압축 설정
```javascript
// server/index.ts
import compression from 'compression';

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
```

### 3. 정적 파일 최적화
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  }
});
```

---

## 🔄 CI/CD 파이프라인

### GitHub Actions 설정
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-args: '--prod'
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🛠️ 문제 해결

### 일반적인 문제들

#### 1. 포트 충돌
```bash
# 포트 사용 중인 프로세스 찾기
lsof -i :3000

# 프로세스 종료
kill -9 PID

# 다른 포트 사용
PORT=3001 npm run dev
```

#### 2. 데이터베이스 마이그레이션 오류
```bash
# 데이터베이스 재설정
rm database.db
npm run db:push
npm run db:seed
```

#### 3. 빌드 오류
```bash
# 노드 모듈 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 정리
npm run build -- --clean
```

#### 4. Google OAuth 오류
- 리디렉션 URI 확인
- 클라이언트 ID/시크릿 확인
- OAuth 동의 화면 설정 확인

### 디버깅 도구
```bash
# 개발 도구 실행
npm run debug

# 로그 레벨 설정
DEBUG=* npm run dev

# 메모리 사용량 모니터링
node --inspect server/index.js
```

---

## 📈 배포 후 체크리스트

### 🔍 기능 테스트
- [ ] 홈페이지 로딩 확인
- [ ] 사용자 인증 (Google OAuth) 테스트
- [ ] API 엔드포인트 응답 확인
- [ ] 다국어 전환 기능 테스트
- [ ] 반응형 디자인 확인
- [ ] 이미지 프록시 기능 테스트

### 🚀 성능 테스트
- [ ] 페이지 로딩 속도 측정
- [ ] API 응답 시간 확인
- [ ] 동시 사용자 테스트
- [ ] 메모리 사용량 모니터링

### 🔒 보안 테스트
- [ ] HTTPS 연결 확인
- [ ] 보안 헤더 설정 확인
- [ ] 환경 변수 보안 확인
- [ ] 데이터베이스 접근 권한 확인

### 📊 모니터링 설정
- [ ] 로그 수집 설정
- [ ] 오류 추적 설정
- [ ] 성능 모니터링 설정
- [ ] 알림 설정

---

## 🔄 업데이트 및 롤백

### 업데이트 절차
```bash
# 1. 코드 변경사항 확인
git pull origin main

# 2. 의존성 업데이트
npm install

# 3. 데이터베이스 마이그레이션
npm run db:push

# 4. 새 버전 빌드
npm run build

# 5. 서비스 재시작
pm2 restart vn-app
```

### 롤백 절차
```bash
# 1. 이전 버전으로 롤백
git checkout previous-commit-hash

# 2. 이전 버전 빌드
npm run build

# 3. 서비스 재시작
pm2 restart vn-app

# 4. 데이터베이스 롤백 (필요시)
# 백업에서 복원
```

---

이 문서는 새로운 배포 플랫폼이나 도구가 추가될 때마다 업데이트됩니다. 배포 과정에서 문제가 발생하면 문제 해결 섹션을 참고하거나 개발팀에 문의하세요.