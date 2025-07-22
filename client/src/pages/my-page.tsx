import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Heart, 
  BookOpen, 
  Settings,
  HelpCircle,
  Shield,
  LogOut,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth.tsx";
import { apiGet } from "@/services/apiService";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";
import Login from "./login";

export default function MyPage() {
  const { user, isAuthenticated, isLoading, logout, isLoggingOut } = useAuth();
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState(true);
  const { theme, setTheme } = useTheme();
  const [stats, setStats] = useState({
    totalReadingTime: 0,
    favoritesCount: 0,
    completedCount: 0,
    achievementsCount: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (user) {
        try {
          setStatsLoading(true);
          const data = await apiGet('/my-page/stats');
          setStats(data);
        } catch (error) {
          console.error(getTranslation('statsLoadError', language), error);
        } finally {
          setStatsLoading(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchUserStats();
    }
  }, [isAuthenticated, user]);


  // Show login page if not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Login />;
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <Skeleton className="h-24 w-full rounded-2xl mb-6" />
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="Profile" className="w-16 h-16 rounded-full" />
              ) : (
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold">{user?.username || "User"}</h2>
                <p className="text-white/80 text-sm">
                  {user?.createdAt ? `${getTranslation('joined', language)} ${new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}` : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reading Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>{getTranslation('readingStats', language)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {statsLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.completedCount}
                </div>
                <div className="text-xs text-slate-500">{getTranslation('novelsRead', language)}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {statsLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.achievementsCount}
                </div>
                <div className="text-xs text-slate-500">{getTranslation('chapters', language)}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {statsLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : `${stats.totalReadingTime}h`}
                </div>
                <div className="text-xs text-slate-500">{getTranslation('readingTime', language)}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-1">
                  {statsLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.achievementsCount}
                </div>
                <div className="text-xs text-slate-500">{getTranslation('dayStreak', language)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Favorites */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {statsLoading ? <Skeleton className="h-8 w-12 mx-auto" /> : stats.favoritesCount}
            </h3>
            <p className="text-sm text-slate-600 mb-3">{getTranslation('favorites', language)}</p>
            <Button size="sm" variant="outline" className="w-full">
              {getTranslation('viewAll', language)}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Creator Dashboard Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
              Creator Dashboard
            </h3>
            <p className="text-sm text-slate-600 mb-3">작품 수익 및 통계 확인</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full"
              onClick={() => setLocation('/creator-dashboard')}
            >
              대시보드 보기
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>{getTranslation('settings', language)}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-200">{getTranslation('notifications', language)}</span>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-200">{getTranslation('darkMode', language)}</span>
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
            
            <div className="pt-2 space-y-3">
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <HelpCircle className="w-4 h-4 mr-2" />
                {getTranslation('helpSupport', language)}
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto">
                <Shield className="w-4 h-4 mr-2" />
                {getTranslation('privacyPolicy', language)}
              </Button>
              <Button 
                variant="destructive" 
                className="w-full justify-center"
                onClick={logout}
                disabled={isLoggingOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isLoggingOut ? getTranslation('loggingOut', language) : getTranslation('logout', language)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
