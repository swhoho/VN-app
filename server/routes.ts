import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { supabase } from "./supabase";
import { profiles, rankings, items } from "@shared/schema";
import { generateSitemap, generateRobotsTxt } from "./sitemap";
import fs from "fs/promises";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
// }
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2025-05-28.basil",
// });

export async function registerRoutes(app: Express): Promise<Server> {
  // Supabase JWT 검증 미들웨어
  const requireAuth = async (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid authorization header' });
      }

      const token = authHeader.split(' ')[1];
      
      // Supabase JWT 토큰 검증
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        console.error('Auth error:', error);
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      req.user = { id: user.id, email: user.email };
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };

  // 사용자 프로필 조회/생성 엔드포인트 추가
  app.get('/api/profile', requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      if (!userId) {
        return res.status(400).json({ error: 'User ID not found in session' });
      }

      // 프로필 조회
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code === 'PGRST116') {
        // 프로필이 없는 경우 자동으로 생성
        const { data: userData } = await supabase.auth.getUser((req.headers.authorization as string).split(' ')[1]);
        
        const newProfile = {
          id: userId,
          username: userData.user?.user_metadata?.full_name || 
                   userData.user?.email || 
                   `User ${userId.substring(0, 8)}`,
          profile_image_url: userData.user?.user_metadata?.avatar_url || null,
          stories_read: 0,
          chapters_read: 0,
          reading_time_hours: "0",
          favorites_count: 0,
          current_streak: 0,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) {
          console.error('프로필 생성 오류:', createError);
          return res.status(500).json({ error: 'Failed to create profile' });
        }

        return res.json(createdProfile);
      } else if (error) {
        console.error('프로필 조회 오류:', error);
        return res.status(500).json({ error: 'Failed to fetch profile' });
      }

      res.json(profile);
    } catch (error) {
      console.error('Error fetching/creating profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/my-page/stats', requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      if (!userId) {
        return res.status(400).json({ error: 'User ID not found in session' });
      }

      // 먼저 프로필이 존재하는지 확인하고 없으면 생성
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!profile) {
        // 프로필이 없으면 기본 통계값 반환
        return res.json({
          totalReadingTime: 0,
          favoritesCount: 0,
          completedCount: 0,
          achievementsCount: 0
        });
      }

      // 프로필에서 통계 정보 가져오기
      res.json({
        totalReadingTime: parseFloat(profile.reading_time_hours || "0"),
        favoritesCount: profile.favorites_count || 0,
        completedCount: profile.stories_read || 0,
        achievementsCount: profile.current_streak || 0
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ error: 'Failed to fetch user stats' });
    }
  });


  // SEO Routes
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const sitemap = await generateSitemap();
      res.set("Content-Type", "text/xml");
      res.send(sitemap);
    } catch (error) {
      res.status(500).json({ message: "Error generating sitemap" });
    }
  });

  app.get("/robots.txt", (req, res) => {
    const robotsTxt = generateRobotsTxt();
    res.set("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  app.get("/api/items", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('canvas', false) // 캔버스가 아닌 일반 아이템만 가져오기
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // 캔버스 아이템을 확실히 필터링
      const filteredData = data.filter(item => item.canvas === false);

      // tags가 JSON 문자열인 경우 파싱
      const parsedResult = filteredData.map(item => ({
        ...item,
        tags: typeof item.tags === 'string' ? JSON.parse(item.tags || "[]") : item.tags
      }));
      
      res.json(parsedResult);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ message: "Error fetching items" });
    }
  });

  // 캔버스 아이템을 위한 별도 엔드포인트 추가
  app.get("/api/canvas-items", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('canvas', true) // 캔버스 아이템만 가져오기
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // 캔버스 아이템을 확실히 필터링
      const filteredData = data.filter(item => item.canvas === true);
      
      // tags가 JSON 문자열인 경우 파싱
      const parsedResult = filteredData.map(item => ({
        ...item,
        tags: typeof item.tags === 'string' ? JSON.parse(item.tags || "[]") : item.tags
      }));
      
      res.json(parsedResult);
    } catch (error) {
      console.error("Error fetching canvas items:", error);
      res.status(500).json({ message: "Error fetching canvas items" });
    }
  });

  app.get("/api/rankings", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('rankings')
        .select(`
          *,
          items:item_id (
            id,
            title,
            description,
            image,
            rating,
            view_count,
            like_count,
            tags,
            canvas
          )
        `)
        .order('rank', { ascending: true });
      
      if (error) throw error;

      // 캔버스 아이템 및 연결되지 않은 아이템 필터링
      const filteredData = data.filter(row => row.items && !row.items.canvas);
      
      // 프론트엔드에서 기대하는 형태로 데이터 변환
      const transformedResult = filteredData.map(row => ({
        id: row.id,
        itemId: row.item_id,
        rank: row.rank,
        previousRank: row.previous_rank,
        weeklyViews: row.weekly_views,
        item: { // row.items가 항상 존재함을 보장
          id: row.items.id,
          title: row.items.title,
          description: row.items.description,
          image: row.items.image,
          rating: row.items.rating,
          viewCount: row.items.view_count, // 카멜 케이스로 변환
          likeCount: row.items.like_count, // 카멜 케이스로 변환
          tags: typeof row.items.tags === 'string' ? JSON.parse(row.items.tags || "[]") : row.items.tags
        }
      }));
      
      res.json(transformedResult);
    } catch (error) {
      console.error("Error fetching rankings:", error);
      res.status(500).json({ message: "Error fetching rankings" });
    }
  });

  // Serve static files from attached_assets
  app.use('/attached_assets', express.static(path.resolve(__dirname, '..', 'attached_assets')));

  // 허용된 이미지 도메인 화이트리스트
  const ALLOWED_IMAGE_DOMAINS = [
    'images.unsplash.com',
    'cdn.pixabay.com',
    'images.pexels.com',
    'via.placeholder.com',
    'picsum.photos',
    'source.unsplash.com',
    'res.cloudinary.com',
    'imgur.com',
    'i.imgur.com',
    'github.com',
    'raw.githubusercontent.com',
    'storage.googleapis.com',
    'storage.cloud.google.com',
    // 필요에 따라 추가 도메인을 여기에 추가
  ];

  // Rate limiting을 위한 간단한 메모리 기반 카운터
  const requestCounts = new Map<string, { count: number; resetTime: number }>();
  const RATE_LIMIT_PER_IP = 100; // IP당 시간당 요청 수
  const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1시간

  // 이미지 프록시 라우트 - 보안 강화된 외부 이미지 프록시
  app.get('/proxy/*', async (req, res) => {
    try {
      const targetUrl = (req.params as any)[0];
      const clientIP = req.ip || req.connection.remoteAddress || 'unknown';

      // Rate limiting 검사
      const now = Date.now();
      const userRequests = requestCounts.get(clientIP);
      
      if (userRequests) {
        if (now > userRequests.resetTime) {
          // 시간 윈도우가 지났으므로 리셋
          requestCounts.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        } else if (userRequests.count >= RATE_LIMIT_PER_IP) {
          return res.status(429).json({ 
            error: 'Too many requests. Please try again later.',
            retryAfter: Math.ceil((userRequests.resetTime - now) / 1000)
          });
        } else {
          userRequests.count++;
        }
      } else {
        requestCounts.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      }

      if (!targetUrl) {
        return res.status(400).json({ error: 'Missing target URL' });
      }

      // URL 처리 및 검증
      let fullUrl: string;
      let parsedUrl: URL;
      
      try {
        // 이미 완전한 URL인지 확인
        if (targetUrl.startsWith('https://') || targetUrl.startsWith('http://')) {
          fullUrl = targetUrl;
        } else {
          // URL 디코딩
          fullUrl = decodeURIComponent(targetUrl);
        }
        
        parsedUrl = new URL(fullUrl);
        
        // HTTPS만 허용 (보안상 HTTP는 차단)
        if (parsedUrl.protocol !== 'https:') {
          return res.status(400).json({ error: 'Only HTTPS URLs are allowed' });
        }
        
      } catch (error) {
        console.error('URL processing error:', error, 'Original:', targetUrl);
        return res.status(400).json({ error: 'Invalid URL format' });
      }

      // 도메인 화이트리스트 검증
      const hostname = parsedUrl.hostname.toLowerCase();
      const isAllowedDomain = ALLOWED_IMAGE_DOMAINS.some(domain => {
        return hostname === domain || hostname.endsWith('.' + domain);
      });

      if (!isAllowedDomain) {
        console.warn('Blocked request to unauthorized domain:', hostname);
        return res.status(403).json({ 
          error: 'Domain not allowed',
          allowedDomains: ALLOWED_IMAGE_DOMAINS
        });
      }

      // 외부 이미지 요청
      console.log('Fetching URL:', fullUrl);
      const response = await fetch(fullUrl, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent': 'VN-App-Proxy/1.0',
          'Accept': 'image/*',
        },
        // 타임아웃 설정 (10초)
        signal: AbortSignal.timeout(10000)
      });
      
      console.log('Response status:', response.status, 'Response URL:', response.url);
      
      if (!response.ok) {
        console.log('Response not OK:', response.status, response.statusText);
        return res.status(response.status).json({ 
          error: 'Failed to fetch image',
          statusCode: response.status 
        });
      }

      // Content-Type 검증 (이미지만 허용)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        return res.status(400).json({ 
          error: 'Invalid content type. Only images are allowed.',
          receivedType: contentType 
        });
      }

      // 파일 크기 제한 (5MB)
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) {
        return res.status(413).json({ error: 'Image too large. Maximum size is 5MB.' });
      }

      // 응답 헤더 설정
      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Cache-Control', 'public, max-age=3600, immutable');
      res.setHeader('X-Content-Type-Options', 'nosniff');

      // 이미지 데이터 스트리밍
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));

    } catch (error: any) {
      console.error('Proxy error:', error);
      if (error?.name === 'TimeoutError') {
        res.status(504).json({ error: 'Request timeout' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
