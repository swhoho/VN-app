import { useLocation } from "wouter";
import { Home, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/ranking", icon: Trophy, label: "Ranking" },
    { path: "/my-page", icon: User, label: "My Page" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-3">
          {navItems.map(({ path, icon: Icon, label }) => {
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
                <span className="text-xs font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
