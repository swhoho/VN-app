import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import NovelCard from "@/components/novel-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Novel } from "@shared/schema";

const genres = ["All", "Romance", "Horror", "Sci-Fi", "Fantasy", "Drama", "Mystery"];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");

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
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
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
              Featured
            </Badge>
            <h2 className="text-xl font-bold mb-1">{featuredNovel.title}</h2>
            <p className="text-sm opacity-90">
              {featuredNovel.description.slice(0, 50)}...
            </p>
          </div>
        </motion.div>
      )}

      {/* Genre Filter */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            size="sm"
            className="whitespace-nowrap rounded-full"
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
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          {selectedGenre === "All" ? "Popular Novels" : `${selectedGenre} Novels`}
        </h3>
        
        {filteredNovels.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-slate-600">No novels found in this genre.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredNovels.map((novel, index) => (
              <motion.div
                key={novel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NovelCard novel={novel} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
