import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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
  readingTimeHours: text("reading_time_hours").notNull().default("0"),
  favoritesCount: integer("favorites_count").notNull().default(0),
  currentStreak: integer("current_streak").notNull().default(0),
  createdAt: text("created_at"),
});

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  tags: text("tags").notNull().default("[]"), // JSON string for SQLite
  rating: text("rating").notNull().default("0"),
  viewCount: integer("view_count").notNull().default(0),
  likeCount: integer("like_count").notNull().default(0),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default("2024-01-01"),
});

export const rankings = sqliteTable("rankings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  itemId: integer("item_id").notNull(),
  rank: integer("rank").notNull(),
  previousRank: integer("previous_rank"),
  weeklyViews: integer("weekly_views").notNull().default(0),
});

export const pointsPackages = sqliteTable("points_packages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  price: text("price").notNull(),
  points: integer("points").notNull(),
  title: text("title").notNull(),
  isPopular: integer("is_popular", { mode: "boolean" }).default(false),
  discountPercent: integer("discount_percent").default(0),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const pointsPurchases = sqliteTable("points_purchases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull(),
  packageId: integer("package_id").notNull(),
  amount: text("amount").notNull(),
  points: integer("points").notNull(),
  status: text("status").notNull().default("pending"),
  paymentIntentId: text("payment_intent_id"),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
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
