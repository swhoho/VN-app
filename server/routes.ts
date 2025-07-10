import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import passport from "./auth";
import { eq } from "drizzle-orm";
import { db } from "./db";
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
  // Authentication routes
  app.get('/api/auth/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  }));

  app.get('/api/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Logout failed' });
      }
      res.json({ success: true });
    });
  });

  app.get('/api/auth/me', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });


  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    next();
  };

  // Create payment intent for points purchase
  // app.post("/api/create-payment-intent", requireAuth, async (req, res) => {
  //   try {
  //     const { amount, packageId } = req.body;
      
  //     if (!amount || amount <= 0) {
  //       return res.status(400).json({ message: "Invalid amount" });
  //     }

  //     const paymentIntent = await stripe.paymentIntents.create({
  //       amount: Math.round(amount * 100), // Convert to cents
  //       currency: "usd",
  //       metadata: {
  //         packageId: packageId.toString(),
  //         userId: (req.user as any)?.id?.toString() || "1" // Use authenticated user ID
  //       },
  //     });

  //     res.json({ 
  //       clientSecret: paymentIntent.client_secret 
  //     });
  //   } catch (error: any) {
  //     console.error("Payment intent creation error:", error);
  //     res.status(500).json({ 
  //       message: "Failed to create payment intent",
  //       error: process.env.NODE_ENV === 'development' ? error.message : undefined
  //     });
  //   }
  // });

  // Handle successful payment and add points to user
  // app.post("/api/points/purchase", requireAuth, async (req, res) => {
  //   try {
  //     const { paymentIntentId, packageId, points } = req.body;
      
  //     if (!paymentIntentId || !packageId || !points) {
  //       return res.status(400).json({ message: "Missing required fields" });
  //     }

  //     // Verify payment with Stripe
  //     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
  //     if (paymentIntent.status !== 'succeeded') {
  //       return res.status(400).json({ message: "Payment not completed" });
  //     }

  //     // Add points to authenticated user
  //     const userId = (req.user as any).id;
  //     const user = await db.query.profiles.findFirst({
  //       where: (profiles, { eq }) => eq(profiles.id, userId),
  //     });
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     const newPoints = (user.points || 0) + points;
  //     await db.update(profiles).set({ points: newPoints }).where(eq(profiles.id, userId));

  //     res.json({ 
  //       success: true, 
  //       newPoints,
  //       message: "Points added successfully" 
  //     });
  //   } catch (error: any) {
  //     console.error("Points purchase error:", error);
  //     res.status(500).json({ 
  //       message: "Error processing purchase: " + error.message 
  //     });
  //   }
  // });

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
      const result = await db.select().from(items);
      // SQLite에서 JSON 문자열로 저장된 tags를 파싱
      const parsedResult = result.map(item => ({
        ...item,
        tags: JSON.parse(item.tags || "[]")
      }));
      res.json(parsedResult);
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ message: "Error fetching items" });
    }
  });

  app.get("/api/rankings", async (req, res) => {
    try {
      const result = await db.select().from(rankings).leftJoin(items, eq(rankings.itemId, items.id));
      
      // 프론트엔드에서 기대하는 형태로 데이터 변환
      const transformedResult = result.map(row => ({
        id: row.rankings.id,
        itemId: row.rankings.itemId,
        rank: row.rankings.rank,
        previousRank: row.rankings.previousRank,
        weeklyViews: row.rankings.weeklyViews,
        item: row.items ? {
          ...row.items,
          tags: JSON.parse(row.items.tags || "[]")
        } : null
      }));
      
      res.json(transformedResult);
    } catch (error) {
      console.error("Error fetching rankings:", error);
      res.status(500).json({ message: "Error fetching rankings" });
    }
  });

  // Serve static files from attached_assets
  app.use('/attached_assets', express.static(path.resolve(__dirname, '..', 'attached_assets')));

  // 이미지 프록시 라우트 - 외부 이미지 URL을 프록시하여 CORS 문제 해결
  app.get('/proxy/*', async (req, res) => {
    try {
      const encodedUrl = req.params[0];
      if (!encodedUrl) {
        return res.status(400).json({ error: 'Missing target URL' });
      }

      // URL 디코딩
      let fullUrl: string;
      try {
        fullUrl = decodeURIComponent(encodedUrl);
        console.log('Decoded URL:', fullUrl);
        new URL(fullUrl);
      } catch (error) {
        console.error('URL decode error:', error);
        return res.status(400).json({ error: 'Invalid URL' });
      }

      // 외부 이미지 요청
      const response = await fetch(fullUrl);
      
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch image' });
      }

      // Content-Type 설정
      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }

      // CORS 헤더 설정
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      // 캐시 헤더 설정
      res.setHeader('Cache-Control', 'public, max-age=3600');

      // 이미지 데이터 스트리밍
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));

    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
