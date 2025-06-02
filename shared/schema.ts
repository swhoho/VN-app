import { pgTable, text, serial, integer, boolean, decimal, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username"),
  password: text("password"),
  email: text("email"),
  provider: text("provider"),
  providerId: text("provider_id"),
  profileImageUrl: text("profile_image_url"),
  points: integer("points").notNull().default(0),
  membershipType: text("membership_type").notNull().default("free"),
  storiesRead: integer("stories_read").notNull().default(0),
  chaptersRead: integer("chapters_read").notNull().default(0),
  readingTimeHours: decimal("reading_time_hours").notNull().default("0"),
  favoritesCount: integer("favorites_count").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  createdAt: text("created_at"),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tags: text("tags").array().notNull().default([]),
  rating: decimal("rating").notNull().default("0"),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: text("created_at").notNull().default("2024-01-01"),
});

export const rankings = pgTable("rankings", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id").notNull(),
  rank: integer("rank").notNull(),
  previousRank: integer("previous_rank"),
  weeklyViews: integer("weekly_views").notNull().default(0),
});

export const pointsPackages = pgTable("points_packages", {
  id: serial("id").primaryKey(),
  price: decimal("price").notNull(),
  points: integer("points").notNull(),
  title: text("title").notNull(),
  isPopular: boolean("is_popular").default(false),
  discountPercent: integer("discount_percent").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pointsPurchases = pgTable("points_purchases", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  packageId: integer("package_id").notNull().references(() => pointsPackages.id),
  amount: decimal("amount").notNull(),
  points: integer("points").notNull(),
  status: varchar("status").notNull().default("pending"),
  paymentIntentId: varchar("payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertItemSchema = createInsertSchema(items).omit({
  id: true,
});

export const insertRankingSchema = createInsertSchema(rankings).omit({
  id: true,
});

export const insertPointsPackageSchema = createInsertSchema(pointsPackages).omit({
  id: true,
  createdAt: true,
});

export const insertPointsPurchaseSchema = createInsertSchema(pointsPurchases).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;
export type Item = typeof items.$inferSelect;
export type InsertRanking = z.infer<typeof insertRankingSchema>;
export type Ranking = typeof rankings.$inferSelect;
export type InsertPointsPackage = z.infer<typeof insertPointsPackageSchema>;
export type PointsPackage = typeof pointsPackages.$inferSelect;
export type InsertPointsPurchase = z.infer<typeof insertPointsPurchaseSchema>;
export type PointsPurchase = typeof pointsPurchases.$inferSelect;
