import type { Novel, User, Ranking } from "@shared/schema";

export const mockNovels: Novel[] = [
  {
    id: 1,
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
    id: 2,
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
  // Add more novels as needed...
];

export const mockUser: User = {
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
};
