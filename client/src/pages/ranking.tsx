import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Ranking, Item } from "@shared/schema";
import SEOHead from "@/components/seo-head";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation, getItemTranslation, getTagTranslation } from "@/lib/i18n";

interface RankingWithItem extends Ranking {
  item: any;
}

export default function Ranking() {
  const { language } = useLanguage();
  const { data: rankings, isLoading } = useQuery<RankingWithItem[]>({
    queryKey: ["rankings", language],
    queryFn: async () => {
      const response = await fetch("/api/rankings");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <Skeleton className="h-48 w-full rounded-2xl mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3: return "bg-gradient-to-r from-orange-400 to-orange-600";
      default: return "bg-slate-400";
    }
  };

  const getTrendIcon = (rank: number, previousRank?: number | null) => {
    if (previousRank === null || previousRank === undefined) {
      return <Minus className="w-3 h-3" />;
    }
    
    if (rank < previousRank) {
      return <TrendingUp className="w-3 h-3 text-green-500" />;
    } else if (rank > previousRank) {
      return <TrendingDown className="w-3 h-3 text-red-500" />;
    } else {
      return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTrendText = (rank: number, previousRank?: number | null) => {
    if (previousRank === null || previousRank === undefined) {
      return "-";
    }
    
    const change = previousRank - rank;
    if (change > 0) return `+${change}`;
    if (change < 0) return change.toString();
    return "-";
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <SEOHead 
        title="Visual Novel Rankings - Top Trending Stories | Visual Novel Hub"
        description="Discover the most popular visual novels ranked by weekly views. See trending stories in romance, fantasy, horror, and sci-fi genres on Visual Novel Hub."
        url="https://visual-novel-hub.replit.app/ranking"
        keywords="visual novel rankings, trending stories, popular novels, weekly charts, romance rankings, fantasy rankings"
      />
      {(() => {
        if (!rankings) return null;
        const sortedRankings = [...rankings].sort((a, b) => a.rank - b.rank);

        return (
          <>
            {/* Rankings List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">{getTranslation('weeklyRankings', language)}</h3>
              
              {sortedRankings
                .filter(ranking => ranking.item)
                .map((ranking, index) => (
                <motion.div
                  key={ranking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => window.location.href = `/novel/${ranking.item.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center justify-center w-8 h-8 ${getRankColor(ranking.rank)} text-white rounded-full font-bold text-sm`}>
                          {ranking.rank}
                        </div>
                        <div className="w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <img 
                            src={ranking.item.image} 
                            alt={ranking.item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm truncate">
                            {ranking.item ? getItemTranslation(ranking.item.title, 'title', language) : ''}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {ranking.item.tags ? getTagTranslation(ranking.item.tags[0] || 'Visual Novel', language) : 'Visual Novel'} • {ranking.item ? ranking.item.viewCount.toLocaleString() : 0} {getTranslation('views', language)}
                          </p>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3 text-red-400 fill-current" />
                              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                {ranking.item ? (ranking.item.likeCount / 1000).toFixed(0) : 0}K
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                {ranking.item ? ranking.item.rating : 0}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-center">
                          <div className="flex items-center space-x-1">
                            {getTrendIcon(ranking.rank, ranking.previousRank)}
                            <span className="text-xs font-medium">
                              {getTrendText(ranking.rank, ranking.previousRank)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        );
      })()}
    </div>
  );
}
