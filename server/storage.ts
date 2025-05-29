import { users, novels, rankings, type User, type InsertUser, type Novel, type InsertNovel, type Ranking, type InsertRanking } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Novel methods
  getAllNovels(): Promise<Novel[]>;
  getNovel(id: number): Promise<Novel | undefined>;
  getNovelsByGenre(genre: string): Promise<Novel[]>;
  getFeaturedNovels(): Promise<Novel[]>;
  createNovel(novel: InsertNovel): Promise<Novel>;

  // Ranking methods
  getRankings(): Promise<(Ranking & { novel: Novel })[]>;
  updateRanking(novelId: number, rank: number, weeklyViews: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private novels: Map<number, Novel>;
  private rankings: Map<number, Ranking>;
  private currentUserId: number;
  private currentNovelId: number;
  private currentRankingId: number;

  constructor() {
    this.users = new Map();
    this.novels = new Map();
    this.rankings = new Map();
    this.currentUserId = 1;
    this.currentNovelId = 1;
    this.currentRankingId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample novels
    const sampleNovels: InsertNovel[] = [
      {
        title: "Mystic Academy",
        author: "Sarah Chen",
        description: "Enter a world where magic and romance intertwine in the prestigious Mystic Academy. Follow the journey of a young student discovering their powers while navigating complex relationships and ancient mysteries.",
        genre: "Romance",
        coverImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        rating: "4.8",
        totalChapters: 12,
        availableChapters: 12,
        status: "complete",
        viewCount: 890000,
        likeCount: 45000,
        isPremium: false,
        featured: false,
      },
      {
        title: "Dark Secrets",
        author: "Alex Dark",
        description: "Uncover the chilling truth behind the abandoned mansion on Elm Street. Each chapter reveals darker secrets as you piece together a mystery that spans generations.",
        genre: "Horror",
        coverImage: "https://images.unsplash.com/photo-1520637836862-4d197d17c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        rating: "4.6",
        totalChapters: 8,
        availableChapters: 8,
        status: "ongoing",
        viewCount: 650000,
        likeCount: 32000,
        isPremium: true,
        featured: false,
      },
      {
        title: "Cyber Love 2149",
        author: "Neo Tokyo",
        description: "In a future where AI consciousness and human emotion blur, explore a love story that challenges the very definition of what it means to be alive.",
        genre: "Sci-Fi",
        coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        rating: "4.9",
        totalChapters: 15,
        availableChapters: 15,
        status: "complete",
        viewCount: 720000,
        likeCount: 38000,
        isPremium: false,
        featured: false,
      },
      {
        title: "Royal Intrigue",
        author: "Victoria Crown",
        description: "Navigate the treacherous waters of royal court politics, where every smile hides a secret and every alliance could be your last.",
        genre: "Drama",
        coverImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        rating: "4.7",
        totalChapters: 20,
        availableChapters: 20,
        status: "complete",
        viewCount: 580000,
        likeCount: 29000,
        isPremium: true,
        featured: false,
      },
      {
        title: "Eternal Bonds",
        author: "Luna Hearts",
        description: "A heartwarming tale that captured millions of hearts worldwide. Experience the ultimate romance story that transcends time and space.",
        genre: "Romance",
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        rating: "4.9",
        totalChapters: 25,
        availableChapters: 25,
        status: "complete",
        viewCount: 1200000,
        likeCount: 60000,
        isPremium: false,
        featured: true,
      },
    ];

    sampleNovels.forEach(novel => {
      this.createNovel(novel);
    });

    // Sample rankings
    const sampleRankings: InsertRanking[] = [
      { novelId: 5, rank: 1, previousRank: 1, weeklyViews: 250000 },
      { novelId: 1, rank: 2, previousRank: 4, weeklyViews: 180000 },
      { novelId: 3, rank: 3, previousRank: 2, weeklyViews: 165000 },
      { novelId: 2, rank: 4, previousRank: 3, weeklyViews: 140000 },
      { novelId: 4, rank: 5, previousRank: 5, weeklyViews: 120000 },
    ];

    sampleRankings.forEach(ranking => {
      const id = this.currentRankingId++;
      this.rankings.set(id, { ...ranking, id });
    });

    // Sample user
    this.createUser({
      username: "user123",
      password: "password",
      points: 1250,
      membershipType: "free",
      storiesRead: 23,
      chaptersRead: 156,
      readingTimeHours: "45",
      favoritesCount: 8,
      currentStreak: 7,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      const updatedUser = { ...user, ...updates };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return undefined;
  }

  async getAllNovels(): Promise<Novel[]> {
    return Array.from(this.novels.values());
  }

  async getNovel(id: number): Promise<Novel | undefined> {
    return this.novels.get(id);
  }

  async getNovelsByGenre(genre: string): Promise<Novel[]> {
    return Array.from(this.novels.values()).filter(
      (novel) => novel.genre.toLowerCase() === genre.toLowerCase(),
    );
  }

  async getFeaturedNovels(): Promise<Novel[]> {
    return Array.from(this.novels.values()).filter(
      (novel) => novel.featured,
    );
  }

  async createNovel(insertNovel: InsertNovel): Promise<Novel> {
    const id = this.currentNovelId++;
    const novel: Novel = { ...insertNovel, id };
    this.novels.set(id, novel);
    return novel;
  }

  async getRankings(): Promise<(Ranking & { novel: Novel })[]> {
    const rankings = Array.from(this.rankings.values());
    const enrichedRankings = rankings.map(ranking => {
      const novel = this.novels.get(ranking.novelId);
      if (!novel) {
        throw new Error(`Novel not found for ranking: ${ranking.novelId}`);
      }
      return { ...ranking, novel };
    });
    
    return enrichedRankings.sort((a, b) => a.rank - b.rank);
  }

  async updateRanking(novelId: number, rank: number, weeklyViews: number): Promise<void> {
    const existingRanking = Array.from(this.rankings.values()).find(r => r.novelId === novelId);
    if (existingRanking) {
      existingRanking.previousRank = existingRanking.rank;
      existingRanking.rank = rank;
      existingRanking.weeklyViews = weeklyViews;
    }
  }
}

export const storage = new MemStorage();
