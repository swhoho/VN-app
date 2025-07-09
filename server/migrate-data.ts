import { db } from "./db";
import { users, items, rankings } from "@shared/schema";
import { eq } from "drizzle-orm";

// Data from the provided JSON files
const itemsData = [
  {
    id: 16,
    title: "Rebel's Twilight Confession",
    description: "Step into the last moments of daylight as you navigate a risky romance with the school's most notorious rebel girl. In this visual novel, your heartfelt choices determine whether her tough exterior will crack and reveal the warmth beneath. Will you gain her trust before the final bell rings?",
    rating: "4.7",
    viewCount: 15234,
    likeCount: 4321,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/highschool.jpeg",
    tags: ["Romance", "Drama", "High School", "Delinquent", "Slice of Life"],
    createdAt: "2024-01-01"
  },
  {
    id: 17,
    title: "Seraph Dawn: Last Stand",
    description: "In a world ravaged by the mysterious Cancer threat, you become one of the elite Seraph pilots—humanity's final hope. Stand on the rain-slicked runway at dawn, gripping your helmet as the towering mech behind you readies for combat. Your choices will shape the battle against overwhelming odds and reveal the courage hidden within your resolve.",
    rating: "4.8",
    viewCount: 23456,
    likeCount: 6789,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/meca.png",
    tags: ["Action", "Sci-Fi", "Mecha", "Drama", "RPG"],
    createdAt: "2024-01-01"
  },
  {
    id: 18,
    title: "Seraph Twilight: Battle at Dusk",
    description: "Amid a crumbling cityscape at twilight, you stand as a Seraph pilot—humanity's last line of defense. The rain-slicked streets reflect neon holo-ads as the towering mech behind you prepares for one final mission. Hold your rifle tight and steel your resolve: tonight, the fate of the world rests in your hands.",
    rating: "4.9",
    viewCount: 34789,
    likeCount: 9123,
    featured: true, // Making this one featured as requested
    image: "https://storage.cloud.google.com/aivn/SF.png",
    tags: ["Action", "Sci-Fi", "Mecha", "Drama", "RPG"],
    createdAt: "2024-01-01"
  },
  {
    id: 19,
    title: "Sunlit Pages: Literature Club Chronicles",
    description: "Join the Literature Club and experience heartfelt moments with four unique personalities as they bond over poetry, novels, and shared dreams. In this visual novel, your choices will shape friendships, reveal hidden passions, and bring warmth to each bright afternoon in the classroom.",
    rating: "4.7",
    viewCount: 18945,
    likeCount: 5234,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/book1.png",
    tags: ["Romance", "Slice of Life", "School", "Drama", "Friendship"],
    createdAt: "2024-01-01"
  },
  {
    id: 20,
    title: "Pages of Connection: Clubroom Bonds",
    description: "Step into the sunlit sanctuary of the Literature Club, where shared stories and whispered dreams forge unbreakable bonds. As you help each member find her voice—whether through poetry, prose, or heartfelt conversation—you'll uncover hidden secrets and shape the destiny of this close-knit circle of friends.",
    rating: "4.8",
    viewCount: 20312,
    likeCount: 6475,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/book2.png",
    tags: ["Romance", "Slice of Life", "School", "Drama", "Friendship"],
    createdAt: "2024-01-01"
  },
  {
    id: 22,
    title: "Autumn Reverie",
    description: "Autumn Reverie follows Kaede Asakura, a quiet transfer student arriving at Maplewood High as the leaves turn. Amid the gentle rustle of amber foliage, she discovers a series of mysterious postcards addressed to her—each hinting at forgotten memories and unspoken promises. As you guide Kaede through branching story paths, you'll form deep bonds with classmates, unravel a hidden past, and decide whether to embrace the warmth of friendship or retreat into the solitude of her autumn thoughts.",
    rating: "4.6",
    viewCount: 18765,
    likeCount: 5234,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/Autumn%20Reverie.png",
    tags: ["Romance", "Drama", "School Life", "Mystery", "Slice of Life"],
    createdAt: "2024-01-01"
  },
  {
    id: 23,
    title: "Crimson Halo: Seraph's Edge",
    description: "Clad in a sleek tactical bodysuit and wielding a radiant blade, the Seraph pilot emerges under a burning red halo amidst a dystopian battlefield. Her unwavering gaze and flowing silver hair signal humanity's final resolve against the encroaching darkness. Every choice will determine whether hope ignites or fades into ash.",
    rating: "4.9",
    viewCount: 27654,
    likeCount: 8901,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/ni.png",
    tags: ["Action", "Sci-Fi", "Mecha", "Drama", "Post-Apocalyptic"],
    createdAt: "2024-01-01"
  },
  {
    id: 29,
    title: "Neon Dreams",
    description: "In a cyberpunk future, a hacker discovers a conspiracy that threatens humanity. Navigate through neon-lit streets and digital networks as you uncover the truth behind the corporate facade.",
    rating: "4.5",
    viewCount: 19845,
    likeCount: 5432,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/Neon.png",
    tags: ["Cyberpunk", "Thriller", "Sci-Fi", "Mystery", "Romance"],
    createdAt: "2024-01-01"
  },
  {
    id: 30,
    title: "Shadow Detective",
    description: "A detective with supernatural abilities solves crimes in the dark underworld. Each case reveals deeper mysteries about the nature of good and evil in this noir-inspired thriller.",
    rating: "4.6",
    viewCount: 16789,
    likeCount: 4123,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/detective.png",
    tags: ["Mystery", "Supernatural", "Noir", "Thriller", "Crime"],
    createdAt: "2024-01-01"
  },
  {
    id: 31,
    title: "Royal Deception",
    description: "Court intrigue and forbidden romance in a medieval fantasy kingdom. Your choices will determine the fate of kingdoms and the hearts of those you encounter.",
    rating: "4.9",
    viewCount: 14523,
    likeCount: 9890,
    featured: false,
    image: "https://storage.cloud.google.com/aivn/royal.png",
    tags: ["Fantasy", "Romance", "Political", "Medieval", "Drama"],
    createdAt: "2024-01-01"
  }
];

const rankingsData = [
  { id: 6, itemId: 1, rank: 2, previousRank: 2, weeklyViews: 3450 },
  { id: 7, itemId: 3, rank: 3, previousRank: 1, weeklyViews: 3200 },
  { id: 8, itemId: 2, rank: 4, previousRank: 4, weeklyViews: 2890 },
  { id: 9, itemId: 5, rank: 5, previousRank: 3, weeklyViews: 2650 },
  { id: 10, itemId: 4, rank: 6, previousRank: 6, weeklyViews: 2340 },
  { id: 12, itemId: 13, rank: 1, previousRank: 2, weeklyViews: 3450 }
];

const usersData = [
  {
    id: 1,
    username: "user123",
    password: "password",
    points: 1250,
    membershipType: "free",
    storiesRead: 23,
    chaptersRead: 156,
    readingTimeHours: "45",
    favoritesCount: 8,
    currentStreak: 7,
    email: null,
    provider: null,
    providerId: null,
    profileImageUrl: null,
    createdAt: "2025-05-31T19:22:25.951Z"
  },
  {
    id: 3,
    username: "HJ Yeo",
    password: null,
    points: 0,
    membershipType: "free",
    storiesRead: 0,
    chaptersRead: 0,
    readingTimeHours: "0",
    favoritesCount: 0,
    currentStreak: 0,
    email: "swhoho@gmail.com",
    provider: "google",
    providerId: "112553315419125163247",
    profileImageUrl: "https://lh3.googleusercontent.com/a/ACg8ocLWwPGc-sLuS7dnqwoePelJ3UH2911gaPkJEvvSCMviZlB0Pw=s96-c",
    createdAt: "2025-06-01T15:00:26.778Z"
  },
  {
    id: 4,
    username: "Test User",
    password: null,
    points: 1250,
    membershipType: "premium",
    storiesRead: 15,
    chaptersRead: 47,
    readingTimeHours: "12.5",
    favoritesCount: 8,
    currentStreak: 5,
    email: "test@example.com",
    provider: "google",
    providerId: "test123",
    profileImageUrl: "https://via.placeholder.com/150",
    createdAt: "2023-12-31T15:00:00.000Z"
  }
];

export async function migrateData() {
  console.log("Starting data migration...");

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(rankings);
    await db.delete(items);
    await db.delete(users);

    // Insert users
    console.log("Inserting users...");
    for (const userData of usersData) {
      await db.insert(users).values({
        ...userData,
        createdAt: new Date(userData.createdAt),
      });
    }

    // Insert items
    console.log("Inserting items...");
    for (const itemData of itemsData) {
      await db.insert(items).values({
        ...itemData,
        createdAt: new Date(itemData.createdAt),
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
    console.log(`Inserted ${usersData.length} users`);
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
