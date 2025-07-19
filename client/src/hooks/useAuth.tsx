import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@/types";
import type { Session, AuthError, PostgrestError } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AuthError | PostgrestError | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<AuthError | PostgrestError | null>(null);

  const fetchUserProfile = useCallback(async (session: Session | null) => {
    setError(null);
    if (session?.user) {
      try {
        console.log("🔎 프로필 조회 시작. 사용자 ID:", session.user.id);
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        
        console.log("📊 프로필 조회 결과:", { profile, error });

        if (error && error.code === 'PGRST116') {
          // 프로필이 없는 경우 자동으로 생성
          console.log("🔍 프로필이 없습니다. 새 프로필을 생성합니다...");
          console.log("👤 사용자 정보:", {
            id: session.user.id,
            email: session.user.email,
            metadata: session.user.user_metadata
          });
          
          const newProfile = {
            id: session.user.id,
            username: session.user.user_metadata?.full_name || 
                     session.user.email || 
                     `User ${session.user.id.substring(0, 8)}`,
            profile_image_url: session.user.user_metadata?.avatar_url || null,
            stories_read: 0,
            chapters_read: 0,
            reading_time_hours: "0",
            favorites_count: 0,
            current_streak: 0,
          };
          
          console.log("📝 생성할 프로필 데이터:", newProfile);
          
          const { data: createdProfile, error: createError } = await supabase
            .from("profiles")
            .insert(newProfile)
            .select()
            .single();
            
          if (createError) {
            console.error("❌ 프로필 생성 오류:", createError);
            console.error("❌ 오류 세부사항:", createError.message, createError.details, createError.hint);
            setError(createError);
            setUser(null);
          } else {
            console.log("✅ 새 프로필이 생성되었습니다:", createdProfile);
            setUser(createdProfile as User);
          }
        } else if (error) {
          console.error("프로필 조회 오류:", error);
          setError(error);
          setUser(null);
        } else {
          setUser(profile as User);
        }
      } catch (err) {
        console.error("예상치 못한 오류:", err);
        const authError = { name: "UnexpectedError", message: (err as Error).message, status: 500 };
        setError(authError as AuthError);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("🔄 Auth effect initializing...");
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("📱 Initial session check:", session);
      fetchUserProfile(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("🔔 Auth state changed:", event, session);
        fetchUserProfile(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  const loginWithGoogle = async () => {
    try {
      console.log("🚀 loginWithGoogle function called");
      console.log("🌐 Current location:", window.location.href);
      console.log("🔄 Setting error to null");
      setError(null);
      
      const redirectUrl = `${window.location.origin}/`;
      console.log("📍 Redirect URL:", redirectUrl);
      
      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      console.log("📊 OAuth response data:", data);
      console.log("❌ OAuth response error:", signInError);

      if (signInError) {
        console.error("🔴 Google OAuth error:", signInError);
        setError(signInError);
      } else {
        console.log("✅ OAuth request initiated successfully");
      }
    } catch (err) {
      console.error("🛑 Login failed with exception:", err);
      const authError = { 
        name: "LoginError", 
        message: err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.", 
        status: 500 
      };
      setError(authError as AuthError);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isAuthenticated = useMemo(() => !!user && !isLoading, [user, isLoading]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      error,
      loginWithGoogle,
      logout,
      isLoggingOut,
    }),
    [user, isLoading, isAuthenticated, error, isLoggingOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
