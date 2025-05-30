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

  const topRanked = rankings?.[0];
  const otherRankings = rankings?.slice(1) || [];

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
      {/* #1 Spotlight */}
      {topRanked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6 rounded-2xl overflow-hidden h-48 cursor-pointer"
          onClick={() => window.location.href = `/novel/${topRanked.item.id}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600" />
          <img 
            src={topRanked.item.image} 
            alt={topRanked.item.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute top-4 left-4">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full">
              <span className="text-xl font-bold text-yellow-900">1</span>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <Badge className="mb-2 bg-white/20 hover:bg-white/30">
              Most Popular
            </Badge>
            <h2 className="text-xl font-bold mb-1">{topRanked.item.title}</h2>
            <p className="text-sm opacity-90 mb-2">
              {topRanked.item.description.slice(0, 80)}...
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span className="text-sm">{(topRanked.item.likeCount / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">{topRanked.item.rating}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Rankings List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Rankings</h3>
        
        {otherRankings.map((ranking, index) => (
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
                    <h4 className="font-semibold text-slate-800 text-sm truncate">
                      {ranking.item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {ranking.item.tags[0]} • {ranking.item.viewCount} Views
                    </p>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-red-400 fill-current" />
                        <span className="text-xs text-slate-500">
                          {(ranking.item.likeCount / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-slate-500">
                          {ranking.item.rating}
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
    </div>
  );
}
