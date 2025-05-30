import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/i18n";
import type { Novel } from "@shared/schema";

const genres = ["All", "Romance", "Horror", "Sci-Fi", "Fantasy", "Drama", "Mystery"];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const { language } = useLanguage();

  const { data: novels, isLoading } = useQuery<Novel[]>({
    queryKey: ["/api/novels"],
  });

  const { data: featuredNovels } = useQuery<Novel[]>({
    queryKey: ["/api/novels/featured"],
  });

  const filteredNovels = novels?.filter(novel => 
    selectedGenre === "All" || novel.genre === selectedGenre
  ) || [];

  const featuredNovel = featuredNovels?.[0];

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
      {featuredNovel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6 rounded-2xl overflow-hidden h-48 cursor-pointer"
          onClick={() => window.location.href = `/novel/${featuredNovel.id}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
          <img 
            src={featuredNovel.coverImage} 
            alt={featuredNovel.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <Badge className="mb-2 bg-pink-500/80 hover:bg-pink-500/90">
              {getTranslation('featured', language)}
            </Badge>
            <h2 className="text-xl font-bold mb-1">{featuredNovel.title}</h2>
            <p className="text-sm opacity-90">
              {featuredNovel.description.slice(0, 50)}...
            </p>
          </div>
        </motion.div>
      )}

      {/* Genre Filter */}
      <div 
        className="flex space-x-3 mb-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            size="sm"
            className="whitespace-nowrap rounded-full flex-shrink-0"
            style={{ scrollSnapAlign: 'start' }}
            onClick={() => setSelectedGenre(genre)}
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
          {selectedGenre === "All" ? "Popular Novels" : `${selectedGenre} Novels`}
        </h3>
        
        {filteredNovels.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">No novels found in this genre.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredNovels.map((novel, index) => (
              <motion.div
                key={novel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => window.location.href = `/novel/${novel.id}`}
              >
                <Card className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <div className="aspect-[3/4] relative">
                    <img 
                      src={novel.coverImage} 
                      alt={novel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs bg-black/30 text-white border-0">
                        {novel.genre}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <h4 className="font-semibold text-sm line-clamp-1 mb-1">
                        {novel.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs">{novel.rating}</span>
                        </div>
                        <span className="text-xs opacity-80">
                          Ch.{novel.availableChapters}
                        </span>
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
