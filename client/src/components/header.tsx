import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Bell, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">Visual Novel Hub</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">1,250 P</span>
            <Button variant="ghost" size="icon" className="text-slate-500 dark:text-slate-400">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500 dark:text-slate-400">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
