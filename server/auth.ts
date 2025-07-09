import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { db } from './db';
import { profiles } from '@shared/schema';
import { eq } from 'drizzle-orm';

// Passport configuration
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db.query.profiles.findFirst({ where: eq(profiles.id, id) });
    done(null, user || false);
  } catch (error) {
    done(error, false);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
      ? "https://vn-app-swhoho.replit.app/api/auth/google/callback"
      : "http://localhost:5000/api/auth/google/callback"
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // The user is already created in Supabase Auth by the time this callback is called.
      // We just need to ensure a corresponding profile exists in our public.profiles table.
      const userProfile = {
        id: profile.id,
        username: profile.displayName,
        profileImageUrl: profile.photos?.[0]?.value,
        // other fields will have default values from the schema
      };

      await db.insert(profiles).values(userProfile).onConflictDoUpdate({
        target: profiles.id,
        set: {
          username: userProfile.username,
          profileImageUrl: userProfile.profileImageUrl,
          updatedAt: new Date(),
        }
      });

      const user = await db.query.profiles.findFirst({ where: eq(profiles.id, profile.id) });
      
      return done(null, user);
    } catch (error) {
      console.error('Google auth error:', error);
      return done(error, false);
    }
  }));
}

export default passport;
