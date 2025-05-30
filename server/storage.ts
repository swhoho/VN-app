import { users, novels, rankings, type User, type InsertUser, type Novel, type InsertNovel, type Ranking, type InsertRanking } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllNovels(): Promise<Novel[]> {
    return await db.select().from(novels);
  }

  async getNovel(id: number): Promise<Novel | undefined> {
    const [novel] = await db.select().from(novels).where(eq(novels.id, id));
    return novel || undefined;
  }

  async getNovelsByGenre(genre: string): Promise<Novel[]> {
    return await db.select().from(novels).where(eq(novels.genre, genre));
  }

  async getFeaturedNovels(): Promise<Novel[]> {
    return await db.select().from(novels).where(eq(novels.featured, true));
  }

  async createNovel(insertNovel: InsertNovel): Promise<Novel> {
    const [novel] = await db
      .insert(novels)
      .values(insertNovel)
      .returning();
    return novel;
  }

  async getRankings(): Promise<(Ranking & { novel: Novel })[]> {
    const result = await db
      .select()
      .from(rankings)
      .innerJoin(novels, eq(rankings.novelId, novels.id))
      .orderBy(rankings.rank);

    return result.map(row => ({
      ...row.rankings,
      novel: row.novels
    }));
  }

  async updateRanking(novelId: number, rank: number, weeklyViews: number): Promise<void> {
    const [existingRanking] = await db
      .select()
      .from(rankings)
      .where(eq(rankings.novelId, novelId));

    if (existingRanking) {
      await db
        .update(rankings)
        .set({
          previousRank: existingRanking.rank,
          rank,
          weeklyViews
        })
        .where(eq(rankings.novelId, novelId));
    }
  }
}

export const storage = new DatabaseStorage();
