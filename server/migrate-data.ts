import { db } from "./db";
import { profiles, items, rankings } from "@shared/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

// items.json 파일에서 데이터 읽기
const itemsPath = path.join(process.cwd(), "items.json");
const itemsJsonData = JSON.parse(fs.readFileSync(itemsPath, "utf8"));

// items.json 데이터를 DB 스키마에 맞게 변환
const itemsData = itemsJsonData.map((item: any) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  rating: item.rating,
  viewCount: item.view_count,
  likeCount: item.like_count,
  featured: item.featured,
  image: item.image,
  tags: JSON.stringify(item.tags), // SQLite에서는 JSON 문자열로 저장
  createdAt: item.created_at
}));


export async function migrateData() {
  console.log("Starting data migration...");

  try {
    // Clear existing data (테이블이 존재하는 경우에만)
    console.log("Clearing existing data...");
    try {
      await db.delete(rankings);
    } catch (e) {
      console.log("Rankings table doesn't exist, skipping delete...");
    }
    try {
      await db.delete(items);
    } catch (e) {
      console.log("Items table doesn't exist, skipping delete...");
    }

    // Insert items
    console.log("Inserting items...");
    for (const itemData of itemsData) {
      await db.insert(items).values({
        ...itemData,
        createdAt: itemData.createdAt,
      });
    }

    // Update rankings based on view counts from the new items
    console.log("Updating rankings based on view counts...");
    const allItems = await db.select().from(items);
    const sortedItems = allItems.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    
    // Create rankings for top 6 items
    for (let i = 0; i < Math.min(6, sortedItems.length); i++) {
      const item = sortedItems[i];
      await db.insert(rankings).values({
        itemId: item.id,
        rank: i + 1,
        previousRank: i + 1, // Set same as current rank initially
        weeklyViews: item.viewCount || 0
      });
    }

    console.log("Data migration completed successfully!");
    console.log(`Inserted ${itemsData.length} items`);
    console.log(`Created ${Math.min(6, sortedItems.length)} rankings`);

  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateData()
    .then(() => {
      console.log("Migration completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed:", error);
      process.exit(1);
    });
}
