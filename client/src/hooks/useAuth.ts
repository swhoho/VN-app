import { useState, useEffect } from "react";
import type { User } from "@shared/schema";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Temporary test user for preview
    const testUser = {
      id: 4,
      username: "Test User",
      email: "test@example.com",
      provider: "google",
      providerId: "test123",
      profileImageUrl: "https://via.placeholder.com/150",
      points: 1250,
      membershipType: "premium",
      storiesRead: 15,
      chaptersRead: 47,
      readingTimeHours: "12.5",
      favoritesCount: 8,
      currentStreak: 5,
      createdAt: "2024-01-01"
    };
    
    // Simulate loading delay
    setTimeout(() => {
      setUser(testUser as any);
      setIsLoading(false);
    }, 500);
  }, []);

  const loginWithGoogle = () => {
    window.location.href = "/api/auth/google";
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginWithGoogle,
    logout,
    isLoggingOut,
  };
}