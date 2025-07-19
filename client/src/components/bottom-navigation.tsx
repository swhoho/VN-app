import { useLocation } from "wouter";
import { Home, Trophy, User, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { language } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, labelKey: "home" },
    { path: "/ranking", icon: Trophy, labelKey: "ranking" },
    { path: "/canvas", icon: Palette, labelKey: "canvas" },
    { path: "/my-page", icon: User, labelKey: "myPage" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-3">
          {navItems.map(({ path, icon: Icon, labelKey }) => {
            const isActive = location === path;
            
            return (
              <button
                key={path}
                onClick={() => setLocation(path)}
                className={cn(
                  "flex flex-col items-center space-y-1 py-2 px-4 transition-colors",
                  isActive 
                    ? "text-primary" 
                    : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{getTranslation(labelKey, language)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
