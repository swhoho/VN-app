import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Crown, 
  Coins, 
  Heart, 
  BookOpen, 
  Clock, 
  Target,
  Bookmark,
  History,
  Settings,
  HelpCircle,
  Shield,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import type { User as UserType } from "@shared/schema";

export default function MyPage() {
  const [notifications, setNotifications] = useState(true);
  const { theme, setTheme } = useTheme();

  const { data: user, isLoading } = useQuery<UserType>({
    queryKey: ["/api/user"],
  });

  const handleUpgradeMembership = () => {
    const event = new CustomEvent('show-coming-soon');
    window.dispatchEvent(event);
  };

  const handleBuyPoints = () => {
    const event = new CustomEvent('show-coming-soon');
    window.dispatchEvent(event);
  };

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
      >
        <Card className="mb-6 bg-gradient-to-r from-primary to-secondary text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{user?.username || "User"}</h2>
                <p className="text-white/80 text-sm">Joined March 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Membership Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-primary" />
                <span>Membership</span>
              </CardTitle>
              <Badge variant={user?.membershipType === "premium" ? "default" : "secondary"}>
                {user?.membershipType === "premium" ? "Premium" : "Free Plan"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4">
              {user?.membershipType === "premium" 
                ? "Unlimited access to all premium content"
                : "Access to free novels and limited premium content"
              }
            </p>
            {user?.membershipType !== "premium" && (
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleUpgradeMembership}
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Points & Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        {/* Points Balance */}
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Coins className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{user?.points || 0}</h3>
            <p className="text-sm text-slate-600 mb-3">Points</p>
            <Button 
              size="sm" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={handleBuyPoints}
            >
              Buy Points
            </Button>
          </CardContent>
        </Card>

        {/* Favorites */}
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{user?.favoritesCount || 0}</h3>
            <p className="text-sm text-slate-600 mb-3">Favorites</p>
            <Button size="sm" variant="outline" className="w-full">
              View All
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reading Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Reading Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {user?.storiesRead || 0}
                </div>
                <div className="text-xs text-slate-500">Novels Read</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {user?.chaptersRead || 0}
                </div>
                <div className="text-xs text-slate-500">Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500 mb-1">
                  {user?.readingTimeHours || 0}h
                </div>
                <div className="text-xs text-slate-500">Reading Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-1">
                  {user?.currentStreak || 0}
                </div>
                <div className="text-xs text-slate-500">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>



      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Notifications</span>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-700 dark:text-slate-200">Dark Mode</span>
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
            
            <div className="pt-2 space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start p-0 h-auto"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start p-0 h-auto"
              >
                <Shield className="w-4 h-4 mr-2" />
                Privacy Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
