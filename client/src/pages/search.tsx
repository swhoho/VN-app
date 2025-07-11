import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Heart, Search as SearchIcon } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation, getItemTranslation, getTagTranslation } from "@/lib/i18n";
import type { Item } from "@/types";
import { useLocation } from "wouter";
import SEOHead from "@/components/seo-head";

export default function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { language } = useLanguage();
  const [, setLocation] = useLocation();

  // 검색어 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // 검색 결과 또는 모든 작품
  const { data: searchResults, isLoading } = useQuery<Item[]>({
    queryKey: debouncedQuery.length > 0 ? ["/api/novels/search", { q: debouncedQuery }] : ["/api/items"],
    enabled: true,
  });

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <SEOHead 
        title={`Search Visual Novels${debouncedQuery ? ` - "${debouncedQuery}"` : ''} | Visual Novel Hub`}
        description={`Search and discover visual novels${debouncedQuery ? ` matching "${debouncedQuery}"` : ''}. Find romance, fantasy, horror, and sci-fi interactive stories on Visual Novel Hub.`}
        url={`https://visual-novel-hub.replit.app/search${debouncedQuery ? `?q=${encodeURIComponent(debouncedQuery)}` : ''}`}
      />
      {/* 검색 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          {getTranslation('search', language) || 'Search'}
        </h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={getTranslation('searchPlaceholder', language) || 'Search for visual novels...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
          />
        </div>
      </div>

      {/* 검색 결과 */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-60 w-full rounded-xl" />
          ))}
        </div>
      ) : searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {searchResults.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setLocation(`/novel/${item.id}`)}
            >
              <Card className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                {/* 이미지 섹션 */}
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
                    {getItemTranslation(item.title, 'title', language)}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                    {(() => {
                      const translatedDescription = getItemTranslation(item.title, 'description', language);
                      const displayDescription = translatedDescription !== item.title ? translatedDescription : item.description;
                      return displayDescription ? displayDescription.slice(0, 80) + '...' : 'No description available';
                    })()}
                  </p>
                  
                  {/* 태그들 */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex}
                        variant="secondary" 
                        className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0"
                      >
                        {getTagTranslation(tag, language)}
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
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            {getTranslation('noSearchResults', language) || `No results found for "${debouncedQuery}"`}
          </p>
        </div>
      )}
    </div>
  );
}