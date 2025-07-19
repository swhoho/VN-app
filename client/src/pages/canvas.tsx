import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation, getItemTranslation } from "@/lib/i18n";
import type { Item } from "@/types";
import SEOHead from "@/components/seo-head";
import { getImageProps } from "@/utils/imageProxy";
import { SupabaseService } from "@/services/supabaseService";

// 상수 정의
const GRID_SKELETON_COUNT = 9; // 3x3 그리드
const ANIMATION_DELAY_INCREMENT = 0.05;
const INITIAL_ANIMATION_DELAY = 0.1;

/**
 * Canvas 페이지 컴포넌트
 * 사용자 업로드 콘텐츠를 3열 그리드로 표시하는 화면
 */
export default function CanvasPage() {
  const { language } = useLanguage();

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: ["canvas-items"],
    queryFn: async () => {
      const response = await fetch("/api/canvas-items");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: GRID_SKELETON_COUNT }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-2 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6 min-h-screen pb-32">
      <SEOHead 
        title="Canvas - User Created Content | Visual Novel Hub"
        description="Explore user-created visual novel content and interactive stories. Discover unique creations from our community."
        url="https://visual-novel-hub.replit.app/canvas"
      />
      
      {/* 페이지 제목 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
      >
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
          {getTranslation("canvas", language)}
        </h1>
      </motion.div>

      {/* Canvas 아이템 그리드 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INITIAL_ANIMATION_DELAY }}
      >
        {!items || items.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                {getTranslation('noCanvasItems', language)}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * ANIMATION_DELAY_INCREMENT }}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => window.location.href = `/novel/${item.id}`}
              >
                <Card className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  {/* 이미지 섹션 - 정사각형 비율 */}
                  <div className="aspect-square relative">
                    <img 
                      {...getImageProps(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* 콘텐츠 섹션 */}
                  <div className="p-2">
                    <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 line-clamp-2 mb-1 leading-tight">
                      {getItemTranslation(item.title, 'title', language)}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-tight">
                      {(() => {
                        const translatedDescription = getItemTranslation(item.title, 'description', language);
                        return translatedDescription !== item.title ? translatedDescription : (item.description || getTranslation('noDescriptionAvailable', language));
                      })()}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Floating Action Button */}
      <Link href="/upload-vn">
        <Button
          className="fixed bottom-20 right-[calc(50%-14rem+1rem)] bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center z-40"
          aria-label="Upload Visual Novel"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </Link>
    </div>
  );
}
