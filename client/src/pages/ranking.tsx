import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Ranking, Item } from "@shared/schema";

interface RankingWithItem extends Ranking {
  item: Item;
}

export default function Ranking() {
  const { data: rankings, isLoading } = useQuery<RankingWithItem[]>({
    queryKey: ["/api/rankings"],
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

  // 모든 랭킹을 동일한 UI로 표시
  const allRankings = rankings || [];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-400";
      case 3: return "bg-gradient-to-r from-orange-400 to-orange-600";
      default: return "bg-slate-400";
    }
  };

  const getTrendIcon = (rank: number, previousRank?: number | null) => {
    if (!previousRank) return <Minus className="w-3 h-3" />;
    
    if (rank < previousRank) {
      return <TrendingUp className="w-3 h-3 text-green-500" />;
    } else if (rank > previousRank) {
      return <TrendingDown className="w-3 h-3 text-red-500" />;
    } else {
      return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTrendText = (rank: number, previousRank?: number | null) => {
    if (!previousRank) return "-";
    
    const change = previousRank - rank;
    if (change > 0) return `+${change}`;
    if (change < 0) return change.toString();
    return "-";
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Weekly Rankings</h3>
      
      {/* All Rankings with Large Image UI */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {allRankings.map((ranking, index) => (
          <motion.div
            key={ranking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-2xl overflow-hidden h-48 cursor-pointer"
            onClick={() => window.location.href = `/novel/${ranking.item.id}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600" />
            <img 
              src={ranking.item.image} 
              alt={ranking.item.title}
              className="w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            
            {/* Rank Badge */}
            <div className="absolute top-4 left-4">
              <div className={`flex items-center justify-center w-12 h-12 ${getRankColor(ranking.rank)} rounded-full`}>
                <span className="text-xl font-bold text-white">{ranking.rank}</span>
              </div>
            </div>
            
            {/* Trend Indicator */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                {getTrendIcon(ranking.rank, ranking.previousRank)}
                <span className="text-xs text-white font-medium">
                  {getTrendText(ranking.rank, ranking.previousRank)}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className="mb-2 bg-white/20 hover:bg-white/30">
                {ranking.rank === 1 ? "Most Popular" : `Rank #${ranking.rank}`}
              </Badge>
              <h2 className="text-xl font-bold mb-1">{ranking.item.title}</h2>
              <p className="text-sm opacity-90 mb-2">
                {ranking.item.description.slice(0, 80)}...
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                  <span className="text-sm">{(ranking.item.likeCount / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{ranking.item.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs opacity-75">{ranking.item.viewCount.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
