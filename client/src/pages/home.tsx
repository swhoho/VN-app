import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { getTranslation, getItemTranslation, getTagTranslation } from "@/lib/i18n";
import type { Item } from "@/types";
import SEOHead from "@/components/seo-head";
import { getImageProps } from "@/utils/imageProxy";

const genres = ["All", "Romance", "Horror", "Sci-Fi", "Fantasy", "Drama", "Mystery"];

// 상수 정의
const SKELETON_LOADING_COUNT = 5;
const GRID_SKELETON_COUNT = 6;
const MAX_VISIBLE_TAGS = 3;
const ANIMATION_DELAY_INCREMENT = 0.1;
const INITIAL_ANIMATION_DELAY = 0.2;


export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { language } = useLanguage();
  const {
    scrollRef,
    isDragging,
    hasMoved,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useDragScroll();

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await fetch("/api/items");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const filteredItems = useMemo(() => {
    if (!items) return [];
    
    return items
      .filter(item => selectedGenre === "All" || item.tags.includes(selectedGenre))
      .sort((a, b) => {
        // featured 아이템들을 맨 앞에 표시
        if (a.featured && !b.featured) return -1;
        if (b.featured && !a.featured) return 1;
        // 안정된 랜덤 정렬을 위해 아이템 ID 기반 해시 사용
        const hashA = a.id.toString().split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        const hashB = b.id.toString().split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        return (hashA % 2) - (hashB % 2);
      });
  }, [items, selectedGenre]);


  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex space-x-3 mb-6">
          {Array.from({ length: SKELETON_LOADING_COUNT }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: GRID_SKELETON_COUNT }).map((_, i) => (
            <Skeleton key={i} className="aspect-[832/1216] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <SEOHead 
        title="Visual Novel Hub - Discover Amazing Interactive Stories | Home"
        description="Browse featured visual novels and discover new stories across romance, fantasy, horror, and sci-fi genres. Start reading premium visual novels today."
        url="https://visual-novel-hub.replit.app/"
      />
      {/* Genre Filter */}
      <div 
        ref={scrollRef}
        className={`flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          scrollSnapType: 'x proximity',
          userSelect: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            size="sm"
            className="whitespace-nowrap rounded-full flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
            onClick={(e) => {
              e.stopPropagation();
              if (!hasMoved) {
                setSelectedGenre(genre);
              }
            }}
          >
            {getTagTranslation(genre, language)}
          </Button>
        ))}
      </div>

      {/* Novels Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INITIAL_ANIMATION_DELAY }}
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          {selectedGenre === "All" ? getTranslation('popularNovels', language) : `${getTagTranslation(selectedGenre, language)} ${getTranslation('popularNovels', language)}`}
        </h3>
        
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">{getTranslation('noItemsInGenre', language)}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * ANIMATION_DELAY_INCREMENT }}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => window.location.href = `/novel/${item.id}`}
              >
                <Card className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  {/* 이미지 섹션 - 832x1216 비율 */}
                  <div className="aspect-[832/1216] relative">
                    <img 
                      {...getImageProps(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-white font-medium">{item.rating}</span>
                      </div>
                    </div>
                    {item.featured && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-pink-500/90 hover:bg-pink-500 text-white text-xs">
                          {getTranslation('featured', language)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  {/* 콘텐츠 섹션 */}
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 line-clamp-1 mb-1">
                      {getItemTranslation(item.title, 'title', language)}
                    </h4>
                    <p 
                      className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-[1.3] min-h-[2.6rem] max-h-[2.6rem] scrollable-description"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                      }}
                      onWheel={(e) => {
                        e.stopPropagation();
                        const element = e.currentTarget;
                        element.scrollTop += e.deltaY;
                      }}
                    >
                      {(() => {
                        const translatedDescription = getItemTranslation(item.title, 'description', language);
                        return translatedDescription !== item.title ? translatedDescription : (item.description || getTranslation('noDescriptionAvailable', language));
                      })()}
                    </p>
                    
                    {/* 태그들 */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.slice(0, MAX_VISIBLE_TAGS).map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex}
                          variant="secondary" 
                          className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0"
                        >
                          {getTagTranslation(tag, language)}
                        </Badge>
                      ))}
                      {item.tags.length > MAX_VISIBLE_TAGS && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-0"
                        >
                          +{item.tags.length - MAX_VISIBLE_TAGS}
                        </Badge>
                      )}
                    </div>

                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
