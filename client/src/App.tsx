import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/hooks/use-language";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Ranking from "@/pages/ranking";
import MyPage from "@/pages/my-page";
import NovelDetail from "@/pages/novel-detail";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import ComingSoonModal from "@/components/coming-soon-modal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/my-page" component={MyPage} />
      <Route path="/novel/:id" component={NovelDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
              <Header />
              <main className="pb-20">
                <Router />
              </main>
              <BottomNavigation />
              <ComingSoonModal />
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
