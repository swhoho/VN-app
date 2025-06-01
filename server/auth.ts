import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { storage } from './storage';

// Passport configuration
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
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
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // Check if user exists
      let user = await storage.getUserByProviderId('google', profile.id);
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          email: profile.emails?.[0]?.value || '',
          provider: 'google',
          providerId: profile.id,
          username: profile.displayName || profile.emails?.[0]?.value || '',
          profileImageUrl: profile.photos?.[0]?.value || '',
          points: 0,
          membershipType: 'free',
          storiesRead: 0,
          chaptersRead: 0,
          readingTimeHours: '0',
          favoritesCount: 0,
          currentStreak: 0
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));
}

export default passport;