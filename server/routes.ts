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
        item: row.items // rankings 데이터에 item 프로퍼티 추가
      }));
      
      res.json(transformedResult);
    } catch (error) {
      console.error("Error fetching rankings:", error);
      res.status(500).json({ message: "Error fetching rankings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
