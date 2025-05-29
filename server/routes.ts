import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all novels
  app.get("/api/novels", async (req, res) => {
    try {
      const novels = await storage.getAllNovels();
      res.json(novels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch novels" });
    }
  });

  // Get novel by ID
  app.get("/api/novels/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const novel = await storage.getNovel(id);
      if (!novel) {
        return res.status(404).json({ message: "Novel not found" });
      }
      res.json(novel);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch novel" });
    }
  });

  // Get novels by genre
  app.get("/api/novels/genre/:genre", async (req, res) => {
    try {
      const genre = req.params.genre;
      const novels = await storage.getNovelsByGenre(genre);
      res.json(novels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch novels by genre" });
    }
  });

  // Get featured novels
  app.get("/api/novels/featured", async (req, res) => {
    try {
      const novels = await storage.getFeaturedNovels();
      res.json(novels);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured novels" });
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

  const httpServer = createServer(app);
  return httpServer;
}
