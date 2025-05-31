import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";
import type { Item } from "@shared/schema";

const genres = ["All", "Romance", "Horror", "Sci-Fi", "Fantasy", "Drama", "Mystery"];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: ["/api/items"],
  });

  const { data: featuredItems } = useQuery<Item[]>({
    queryKey: ["/api/items/featured"],
  });

  const filteredItems = items?.filter(item => 
    selectedGenre === "All" || item.tags.includes(selectedGenre)
  ).sort((a, b) => {
    // Autumn Reverie를 항상 맨 앞에 표시
    if (a.title === "Autumn Reverie") return -1;
    if (b.title === "Autumn Reverie") return 1;
    // featured 아이템들을 그 다음에 표시
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    // 나머지는 ID 순서
    return a.id - b.id;
  }) || [];

  const featuredItem = featuredItems?.[0];

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
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <Skeleton className="h-48 w-full rounded-2xl mb-6" />
        <div className="flex space-x-3 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-60 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Featured Banner */}
      {featuredItem && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6 rounded-2xl overflow-hidden h-48 cursor-pointer"
          onClick={() => window.location.href = `/novel/${featuredItem.id}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
          <img 
            src={featuredItem.image} 
            alt={featuredItem.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <Badge className="mb-2 bg-pink-500/80 hover:bg-pink-500/90">
              {getTranslation('featured', language)}
            </Badge>
            <h2 className="text-xl font-bold mb-1">{featuredItem.title}</h2>
            <p className="text-sm opacity-90">
              {featuredItem.description.slice(0, 50)}...
            </p>
          </div>
        </motion.div>
      )}

      {/* Genre Filter */}
      <div 
        ref={scrollRef}
        className={`flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          scrollSnapType: 'x mandatory',
          userSelect: 'none',
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
              setSelectedGenre(genre);
            }}
            onMouseDown={(e) => e.stopPropagation()}
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
                  </div>
                  
                  {/* 콘텐츠 섹션 */}
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 line-clamp-1 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                      {item.description.slice(0, 80)}...
                    </p>
                    
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
                    
                    {/* 통계 */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-red-400 fill-current" />
                          <span>{(item.likeCount / 1000).toFixed(1)}K</span>
                        </div>
                        <span>{item.viewCount.toLocaleString()} views</span>
                      </div>
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
