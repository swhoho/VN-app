import 'dotenv/config';
import { db } from './db';
import { items, rankings, profiles } from '../shared/schema';
import itemsData from '../items.json';
import rankingsData from '../rankings.json';
import usersData from '../users.json';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('Seeding database...');

  await db.execute(`ALTER TABLE "profiles" DISABLE TRIGGER USER;`);

  // Seed Items
  console.log('Seeding items...');
  for (const item of itemsData) {
    await db.insert(items).values(item).onConflictDoNothing();
  }

  // Seed Rankings
  console.log('Seeding rankings...');
  const rankingsToInsert = rankingsData.map(r => ({ ...r, itemId: r.item_id }));
  for (const ranking of rankingsToInsert) {
    await db.insert(rankings).values(ranking).onConflictDoNothing();
  }

  // Seed Users and Profiles
  // console.log('Seeding users and profiles...');
  // const validUsersData = usersData.filter(u => u.provider_id);
  // for (const userData of validUsersData) {
  //   // In a real app, you would create users in Supabase Auth here.
  //   // For this seed script, we'll assume they exist and just create profiles.
  //   // We need to handle potential conflicts if a profile already exists.
    
  //   const profile = {
  //     id: crypto.randomUUID(),
  //     username: userData.username,
  //     profileImageUrl: userData.profile_image_url,
  //     points: userData.points,
  //     membershipType: userData.membership_type,
  //     storiesRead: userData.stories_read,
  //     chaptersRead: userData.chapters_read,
  //     readingTimeHours: userData.reading_time_hours,
  //     favoritesCount: userData.favorites_count,
  //     currentStreak: userData.current_streak,
  //   };

  //   // Supabase doesn't have a built-in `onConflictDoUpdate` for drizzle-kit yet.
  //   // So we check for existence first.
  //   const existingProfile = await db.query.profiles.findFirst({
  //     where: eq(profiles.id, profile.id!),
  //   });

  //   if (!existingProfile) {
  //     await db.insert(profiles).values(profile as any);
  //   } else {
  //     await db.update(profiles).set(profile as any).where(eq(profiles.id, profile.id!));
  //   }
  // }

  console.log('Database seeded successfully!');
  await db.execute(`ALTER TABLE "profiles" ENABLE TRIGGER USER;`);
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
