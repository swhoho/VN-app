import { users, items, rankings, type User, type InsertUser, type Item, type InsertItem, type Ranking, type InsertRanking } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Item methods
  getAllItems(): Promise<Item[]>;
  getItem(id: number): Promise<Item | undefined>;
  getItemsByTag(tag: string): Promise<Item[]>;
  getFeaturedItems(): Promise<Item[]>;
  createItem(item: InsertItem): Promise<Item>;

  // Ranking methods
  getRankings(): Promise<(Ranking & { item: Item })[]>;
  updateRanking(itemId: number, rank: number, weeklyViews: number): Promise<void>;
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

  async getAllItems(): Promise<Item[]> {
    return await db.select().from(items);
  }

  async getItem(id: number): Promise<Item | undefined> {
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item || undefined;
  }

  async getItemsByTag(tag: string): Promise<Item[]> {
    return await db.select().from(items).where(eq(items.tags, [tag]));
  }

  async getFeaturedItems(): Promise<Item[]> {
    return await db.select().from(items).where(eq(items.featured, true));
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const [item] = await db
      .insert(items)
      .values(insertItem)
      .returning();
    return item;
  }

  async getRankings(): Promise<(Ranking & { item: Item })[]> {
    const result = await db
      .select()
      .from(rankings)
      .innerJoin(items, eq(rankings.itemId, items.id))
      .orderBy(rankings.rank);

    return result.map(row => ({
      ...row.rankings,
      item: row.items
    }));
  }

  async updateRanking(itemId: number, rank: number, weeklyViews: number): Promise<void> {
    const [existingRanking] = await db
      .select()
      .from(rankings)
      .where(eq(rankings.itemId, itemId));

    if (existingRanking) {
      await db
        .update(rankings)
        .set({
          previousRank: existingRanking.rank,
          rank,
          weeklyViews
        })
        .where(eq(rankings.itemId, itemId));
    }
  }
}

export const storage = new DatabaseStorage();
