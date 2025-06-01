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
    callbackURL: process.env.NODE_ENV === 'production' 
      ? "https://vn-app-swhoho.replit.app/api/auth/google/callback"
      : "http://localhost:5000/api/auth/google/callback"
  },
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      // Use upsert method to handle both new and existing users
      const user = await storage.upsertUserByProvider('google', profile.id, {
        email: profile.emails?.[0]?.value || null,
        username: profile.displayName || profile.emails?.[0]?.value?.split('@')[0] || 'User',
        profileImageUrl: profile.photos?.[0]?.value || null,
      });
      
      return done(null, user);
    } catch (error) {
      console.error('Google auth error:', error);
      return done(error, false);
    }
  }));
}

export default passport;