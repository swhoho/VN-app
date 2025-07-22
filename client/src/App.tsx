import { Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/hooks/use-language";
import { AuthProvider } from "@/hooks/useAuth.tsx";
import Header from "@/components/header";
import BottomNavigation from "@/components/bottom-navigation";
import ComingSoonModal from "@/components/coming-soon-modal";
import { StagewiseToolbar } from "@stagewise/toolbar-react";
import ReactPlugin from "@stagewise-plugins/react";

const Home = lazy(() => import("@/pages/home"));
const Ranking = lazy(() => import("@/pages/ranking"));
const MyPage = lazy(() => import("@/pages/my-page"));
const NovelDetail = lazy(() => import("@/pages/novel-detail"));
const Search = lazy(() => import("@/pages/search"));
const Login = lazy(() => import("@/pages/login"));
const Canvas = lazy(() => import("@/pages/canvas"));
const UploadVisualNovel = lazy(() => import("@/pages/upload-vn"));
const CreatorDashboard = lazy(() => import("@/pages/creator-dashboard"));
const NotFound = lazy(() => import("@/pages/not-found"));

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/ranking" component={Ranking} />
        <Route path="/canvas" component={Canvas} />
        <Route path="/my-page" component={MyPage} />
        <Route path="/search" component={Search} />
        <Route path="/login" component={Login} />
        <Route path="/upload-vn" component={UploadVisualNovel} />
        <Route path="/creator-dashboard" component={CreatorDashboard} />
        <Route path="/novel/:id" component={NovelDetail} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <StagewiseToolbar
        config={{
          plugins: [ReactPlugin],
        }}
      /> */}
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <Header />
                <main className="pb-20">
                  <AppRoutes />
                </main>
                <BottomNavigation />
                {/* <ComingSoonModal /> */}
              </div>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
