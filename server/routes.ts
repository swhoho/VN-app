import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import passport from "./auth";
import { storage } from "./storage";
import { generateSitemap, generateRobotsTxt } from "./sitemap";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

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

  // Search novels
  app.get("/api/novels/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.json([]);
      }
      const items = await storage.searchItems(query);
      res.json(items);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Failed to search items" });
    }
  });

  // Get all items
  app.get("/api/items", async (req, res) => {
    try {
      const items = await storage.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch items" });
    }
  });

  // Get item by ID
  app.get("/api/items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getItem(id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch item" });
    }
  });

  // Get items by tag
  app.get("/api/items/tag/:tag", async (req, res) => {
    try {
      const tag = req.params.tag;
      const items = await storage.getItemsByTag(tag);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch items by tag" });
    }
  });





  // Get rankings
  app.get("/api/rankings", async (req, res) => {
    try {
      const rankings = await storage.getRankings();
      res.json(rankings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rankings" });
    }
  });

  // Get user profile
  app.get("/api/user/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get current user (for demo purposes, always return user ID 1)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
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
  app.post("/api/create-payment-intent", requireAuth, async (req, res) => {
    try {
      const { amount, packageId } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          packageId: packageId.toString(),
          userId: req.user?.id?.toString() || "1" // Use authenticated user ID
        },
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret 
      });
    } catch (error: any) {
      console.error("Payment intent creation error:", error);
      res.status(500).json({ 
        message: "Failed to create payment intent",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

  // Handle successful payment and add points to user
  app.post("/api/points/purchase", requireAuth, async (req, res) => {
    try {
      const { paymentIntentId, packageId, points } = req.body;
      
      if (!paymentIntentId || !packageId || !points) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Verify payment with Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ message: "Payment not completed" });
      }

      // Add points to authenticated user
      const userId = req.user?.id || 1; // Fallback to demo user
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newPoints = (user.points || 0) + points;
      await storage.updateUser(userId, { points: newPoints });

      res.json({ 
        success: true, 
        newPoints,
        message: "Points added successfully" 
      });
    } catch (error: any) {
      console.error("Points purchase error:", error);
      res.status(500).json({ 
        message: "Error processing purchase: " + error.message 
      });
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

  const httpServer = createServer(app);
  return httpServer;
}
