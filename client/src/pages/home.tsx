import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation, getItemTranslation } from "@/lib/i18n";
import type { Item } from "@shared/schema";

const genres = ["All", "Romance", "Horror", "Sci-Fi", "Fantasy", "Drama", "Mystery"];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: ["/api/items"],
  });

  const filteredItems = items?.filter(item => 
    selectedGenre === "All" || item.tags.includes(selectedGenre)
  ).sort((a, b) => {
    // featured 아이템들을 맨 앞에 표시
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    // 나머지는 랜덤 순서로 표시
    return Math.random() - 0.5;
  }) || [];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      setHasMoved(false);
    }, 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (Math.abs(walk) > 3) {
      setHasMoved(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    
    if (Math.abs(walk) > 3) {
      setHasMoved(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => {
      setHasMoved(false);
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="flex space-x-3 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[832/1216] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
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
            onMouseDown={(e) => {
              if (!scrollRef.current) return;
              setIsDragging(true);
              setHasMoved(false);
              setStartX(e.pageX - scrollRef.current.offsetLeft);
              setScrollLeft(scrollRef.current.scrollLeft);
            }}
            onMouseMove={(e) => {
              if (!isDragging || !scrollRef.current) return;
              e.preventDefault();
              const x = e.pageX - scrollRef.current.offsetLeft;
              const walk = (x - startX) * 2;
              
              if (Math.abs(walk) > 3) {
                setHasMoved(true);
              }
              
              scrollRef.current.scrollLeft = scrollLeft - walk;
            }}
            onMouseUp={() => {
              setIsDragging(false);
              setTimeout(() => {
                setHasMoved(false);
              }, 100);
            }}
            onTouchStart={(e) => {
              if (!scrollRef.current) return;
              setIsDragging(true);
              setHasMoved(false);
              setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
              setScrollLeft(scrollRef.current.scrollLeft);
            }}
            onTouchMove={(e) => {
              if (!isDragging || !scrollRef.current) return;
              e.preventDefault();
              const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
              const walk = (x - startX) * 1.5;
              
              if (Math.abs(walk) > 3) {
                setHasMoved(true);
              }
              
              scrollRef.current.scrollLeft = scrollLeft - walk;
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              setIsDragging(false);
              if (!hasMoved) {
                setSelectedGenre(genre);
              }
              setTimeout(() => {
                setHasMoved(false);
              }, 100);
            }}
          >
            {genre}
          </Button>
        ))}
      </div>

      {/* Novels Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
          {selectedGenre === "All" ? "Popular Items" : `${selectedGenre} Items`}
        </h3>
        
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">No items found in this genre.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => window.location.href = `/novel/${item.id}`}
              >
                <Card className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  {/* 이미지 섹션 - 832x1216 비율 */}
                  <div className="aspect-[832/1216] relative">
                    <img 
                      src={item.image} 
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
                    <div 
                      className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-[1.3] min-h-[2.6rem] max-h-[2.6rem] overflow-y-auto cursor-pointer select-none"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {item.description || 'No description available'}
                    </div>
                    
                    {/* 태그들 */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex}
                          variant="secondary" 
                          className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-0"
                        >
                          +{item.tags.length - 3}
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