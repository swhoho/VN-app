import { Button } from "@/components/ui/button";
import { Search, Bell, BookOpen } from "lucide-react";
import LanguageSelector from "@/components/language-selector";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useCallback } from "react";

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const handleHomeClick = useCallback(() => {
    setLocation('/');
  }, [setLocation]);

  const handleSearchClick = useCallback(() => {
    setLocation('/search');
  }, [setLocation]);

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleHomeClick}
              className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <BookOpen className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated && user && (
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {user.points?.toLocaleString() || 0} P
              </span>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-500 dark:text-slate-400"
              onClick={handleSearchClick}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500 dark:text-slate-400">
              <Bell className="w-5 h-5" />
            </Button>
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={setLanguage} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
